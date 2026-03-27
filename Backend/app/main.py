from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.matcher import FaceMatcher
from app.core.database import get_db
from app.core.auth import verify_password, create_access_token, get_password_hash
from app.core.models import User
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from pydantic import BaseModel
import os
import uuid
from typing import List

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
    # Check if user already exists
    db_user = db.query(User).filter(User.email == request.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(request.password)
    new_user = User(email=request.email, hashed_password=hashed_password)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully", "email": new_user.email}

@app.post("/auth/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/db-test")
async def test_db_connection(db: Session = Depends(get_db)):
    from sqlalchemy import text
    result = db.execute(text("SELECT current_schema()")).fetchone()
    return {"current_schema": result[0]}

@app.post("/admin/upload")
async def admin_upload(background_tasks: BackgroundTasks, files: List[UploadFile] = File(...)):
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
                
        saved_files.append({
            "original_filename": file.filename,
            "saved_as": unique_name
        })
        
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
