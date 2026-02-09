from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.matcher import FaceMatcher
import os

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
def read_root():
    return {"message": "FaceFindr Backend API"}

import shutil
import subprocess
import sys
from pydantic import BaseModel

class ApprovalRequest(BaseModel):
    filename: str

@app.post("/approve")
async def approve_image(request: ApprovalRequest):
    filename = request.filename
    print(f"Approving image: {filename}")
    
    src_path = os.path.join(pending_dir, filename)
    dst_path = os.path.join(images_dir, filename)
    
    if not os.path.exists(src_path):
        return {"error": f"Photo {filename} not found in pending directory"}
        
    try:
        # 1. Move file to main images directory
        shutil.move(src_path, dst_path)
        
        # 2. Trigger embedding and re-clustering
        # We call the script living in the project root /src
        handler_script = os.path.join(project_root, "src", "approval_handler.py")
        
        # Use the same python executable
        result = subprocess.run(
            [sys.executable, handler_script, filename, dst_path],
            capture_output=True,
            text=True,
            cwd=project_root # Run from project root so paths in script work
        )
        
        if result.returncode != 0:
            print(f"Error in approval_handler: {result.stderr}")
            return {"error": "Processing failed", "details": result.stderr}
            
        print(f"Approval handler output: {result.stdout}")
        
        # 3. Reload matcher resources to reflect changes
        matcher._load_resources()
        
        return {"success": True, "message": f"Photo {filename} approved and processed"}
        
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

@app.get("/photos/all")
def list_all_photos():
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
def list_pending_photos():
    """Returns a list of all photos in the pending directory."""
    if not os.path.exists(pending_dir):
        return []
    
    extensions = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'}
    photos = [
        f for f in os.listdir(pending_dir) 
        if os.path.isfile(os.path.join(pending_dir, f)) and os.path.splitext(f)[1] in extensions
    ]
    return photos
