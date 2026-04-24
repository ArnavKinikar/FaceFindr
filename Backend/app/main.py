from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.matcher import FaceMatcher
from app.core.models import Admin, Album, Media, Comment
from app.core.tenant import get_tenant_db, get_admin_db
from app.core.database import get_db, init_db, create_tenant_schema
from app.core.auth import verify_password, create_access_token, get_password_hash
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, Header, Cookie
from pydantic import BaseModel
import os
import uuid
import secrets
from typing import List, Optional

app = FastAPI()
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Allow override of images and data directories via environment variables
images_dir = os.environ.get(
    "IMAGES_DIR",
    os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "images"
    )
)
data_dir = os.environ.get(
    "DATA_DIR",
    os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "data"
    )
)
pending_dir = os.path.join(images_dir, "pending")

# Initialize Matcher
matcher = FaceMatcher(data_dir=data_dir, images_dir=images_dir)

# Mount Static Files
# Serve core images directory
if not os.path.exists(images_dir):
    print(f"Warning: 'images' directory not found at {images_dir}")
else:
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

# Serve pending images directory
if os.path.exists(pending_dir):
    app.mount("/pending-images", StaticFiles(directory=pending_dir), name="pending-images")

@app.on_event("startup")
def startup_event():
    # Initialize public schema (admins table)
    init_db()

@app.get("/")
async def read_root():
    return {"message": "FaceFindr Backend API"}

import shutil
import subprocess
import sys
from pydantic import BaseModel

class ApprovalRequest(BaseModel):
    filename: str

def process_approved_photo(filename: str, dst_path: str):
    handler_script = os.path.join(project_root, "src", "approval_handler.py")
    result = subprocess.run(
        [sys.executable, handler_script, filename, dst_path],
        capture_output=True,
        text=True,
        cwd=project_root
    )
    if result.returncode != 0:
        print(f"Error in approval_handler: {result.stderr}")
    else:
        print(f"Approval handler output: {result.stdout}")
    matcher._load_resources()

def process_uploaded_photos(saved_files: list):
    handler_script = os.path.join(project_root, "src", "approval_handler.py")
    for saved_file in saved_files:
        unique_name = saved_file["saved_as"]
        file_path = os.path.join(images_dir, unique_name)
        result = subprocess.run(
            [sys.executable, handler_script, unique_name, file_path],
            capture_output=True,
            text=True,
            cwd=project_root
        )
        if result.returncode != 0:
            print(f"Error in approval_handler: {result.stderr}")
        else:
            print(f"Approval handler output: {result.stdout}")
    matcher._load_resources()

@app.post("/approve")
async def approve_image(request: ApprovalRequest, background_tasks: BackgroundTasks):
    filename = request.filename
    print(f"Approving image: {filename}")
    
    src_path = os.path.join(pending_dir, filename)
    dst_path = os.path.join(images_dir, filename)
    
    if not os.path.exists(src_path):
        return {"error": f"Photo {filename} not found in pending directory"}
        
    try:
        # 1. Move file to main images directory
        shutil.move(src_path, dst_path)
        
        # 2. Trigger embedding and re-clustering in background
        background_tasks.add_task(process_approved_photo, filename, dst_path)
        
        return {"success": True, "message": f"Photo {filename} approved and processing in background"}
        
    except Exception as e:
        print(f"Exception during approval: {str(e)}")
        return {"error": str(e)}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    contents = await file.read()
    results = matcher.match(contents)
    
    # Transform results to full URLs if needed, or keep relative
    # For now, returning filenames. Frontend should construct URL:
    # `http://localhost:8000/images/{filename}`
    
    return results

# Auth Schemas
class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/signup")
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    # Check if admin already exists
    db_admin = db.query(Admin).filter(Admin.email == request.email).first()
    if db_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # 1. Generate unique schema name and access code
    schema_name = f"tenant_{uuid.uuid4().hex[:10]}"
    access_code = secrets.token_urlsafe(8)
    
    # 2. Create Admin record in 'public' schema
    hashed_password = get_password_hash(request.password)
    new_admin = Admin(
        email=request.email, 
        hashed_password=hashed_password,
        schema_name=schema_name,
        access_code=access_code
    )
    
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    
    # 3. Dynamically create the new schema and tenant tables
    create_tenant_schema(schema_name)
    
    return {
        "message": "Admin and Event Schema created successfully", 
        "email": new_admin.email,
        "access_code": new_admin.access_code
    }

@app.post("/auth/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == request.email).first()
    if not admin or not verify_password(request.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": admin.email})
    return {"access_token": access_token, "token_type": "bearer", "access_code": admin.access_code}

# Guest Endpoints (Using Multi-Tenant Dependency)

class PhotoDeleteRequest(BaseModel):
    media_id: int

@app.post("/guest/upload")
async def guest_upload(
    file: UploadFile = File(...), 
    guest_name: str = Header("Anonymous"),
    guest_session_id: uuid.UUID = Cookie(None),
    db: Session = Depends(get_tenant_db)
):
    if not guest_session_id:
        raise HTTPException(status_code=400, detail="Missing guest session ID")
        
    # Process file and save to media table in the tenant's schema
    # (Simplified for this refactor, reusable from existing logic)
    ext = os.path.splitext(file.filename)[1]
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(images_dir, unique_name)
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
        
    new_media = Media(
        filename=unique_name,
        guest_name=guest_name,
        guest_session_id=guest_session_id
    )
    db.add(new_media)
    db.commit()
    return {"message": "Uploaded successfully", "media_id": new_media.id}

@app.delete("/guest/photo/{media_id}")
async def guest_delete_photo(
    media_id: int,
    guest_session_id: uuid.UUID = Cookie(...),
    db: Session = Depends(get_tenant_db)
):
    # Lookup media in the tenant schema
    media = db.query(Media).filter(Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Photo not found")
        
    # Logic indicating a guest can only delete a photo if their session matches
    if media.guest_session_id != guest_session_id:
        raise HTTPException(status_code=403, detail="You do not have permission to delete this photo")
        
    db.delete(media)
    db.commit()
    return {"message": "Photo deleted successfully"}

@app.post("/guest/comment")
async def guest_comment(
    media_id: int,
    content: str,
    guest_name: str = Header("Anonymous"),
    guest_session_id: uuid.UUID = Cookie(None),
    db: Session = Depends(get_tenant_db)
):
    if not guest_session_id:
        raise HTTPException(status_code=400, detail="Missing guest session ID")

    new_comment = Comment(
        media_id=media_id,
        content=content,
        guest_name=guest_name,
        guest_session_id=guest_session_id
    )
    db.add(new_comment)
    db.commit()
    return {"message": "Comment added successfully"}

@app.get("/db-test")
async def test_db_connection(db: Session = Depends(get_db)):
    from sqlalchemy import text
    result = db.execute(text("SELECT current_schema()")).fetchone()
    return {"current_schema": result[0]}

# Admin Album Endpoints

class AlbumCreate(BaseModel):
    title: str
    event_name: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None

@app.get("/admin/albums")
async def list_albums(db: Session = Depends(get_admin_db)):
    albums = db.query(Album).all()
    return albums

@app.get("/admin/albums/{album_id}")
async def get_album(album_id: int, db: Session = Depends(get_admin_db)):
    album = db.query(Album).filter(Album.id == album_id).first()
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
    return album

@app.post("/admin/albums")
async def create_album(album: AlbumCreate, db: Session = Depends(get_admin_db)):
    new_album = Album(
        title=album.title, 
        event_name=album.event_name,
        location=album.location,
        description=album.description
    )
    db.add(new_album)
    db.commit()
    db.refresh(new_album)
    return new_album

@app.delete("/admin/albums/{album_id}")
async def delete_album(album_id: int, db: Session = Depends(get_admin_db)):
    album = db.query(Album).filter(Album.id == album_id).first()
    if not album:
        raise HTTPException(status_code=404, detail="Album not found")
        
    db.delete(album)
    db.commit()
    return {"message": "Album deleted successfully"}

@app.post("/admin/upload")
async def admin_upload(
    background_tasks: BackgroundTasks, 
    files: List[UploadFile] = File(...),
    album_id: Optional[int] = None,
    db: Session = Depends(get_admin_db)
):
    if not files:
        return {"error": "No files provided"}
    
    if not os.path.exists(images_dir):
        os.makedirs(images_dir, exist_ok=True)
        
    saved_files = []
    
    for file in files:
        if not file.filename:
            continue
            
        ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4().hex}{ext}"
        
        file_path = os.path.join(images_dir, unique_name)
        
        with open(file_path, "wb") as buffer:
            while content := await file.read(1024 * 1024):
                buffer.write(content)
                
        # Record in media table
        new_media = Media(
            filename=unique_name,
            album_id=album_id,
            guest_name="Admin",
            guest_session_id=uuid.UUID(int=0) # Reserved for admin
        )
        db.add(new_media)
        
        saved_files.append({
            "original_filename": file.filename,
            "saved_as": unique_name
        })
    
    db.commit()
        
    # Trigger embedding and re-clustering in background
    background_tasks.add_task(process_uploaded_photos, saved_files)
        
    return {"message": "Successfully uploaded files, processing in background", "files": saved_files}

@app.get("/photos/all")
async def list_all_photos():
    """Returns a list of all approved photos in the images directory."""
    if not os.path.exists(images_dir):
        return []
    
    extensions = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'}
    photos = [
        f for f in os.listdir(images_dir) 
        if os.path.isfile(os.path.join(images_dir, f)) and os.path.splitext(f)[1] in extensions
    ]
    return photos

@app.get("/photos/pending")
async def list_pending_photos():
    """Returns a list of all photos in the pending directory."""
    if not os.path.exists(pending_dir):
        return []
    
    extensions = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'}
    photos = [
        f for f in os.listdir(pending_dir) 
        if os.path.isfile(os.path.join(pending_dir, f)) and os.path.splitext(f)[1] in extensions
    ]
    return photos
