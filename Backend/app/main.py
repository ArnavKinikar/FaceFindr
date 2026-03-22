from fastapi import FastAPI, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.matcher import FaceMatcher
import os
import uuid
from typing import List

app = FastAPI()

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

# Resolve paths relative to the project root
# current: .../Backend/app/main.py
# project_root: .../
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
project_root = os.path.dirname(backend_dir)

images_dir = os.path.join(project_root, "images")
pending_dir = os.path.join(images_dir, "pending")
data_dir = os.path.join(project_root, "data")

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
