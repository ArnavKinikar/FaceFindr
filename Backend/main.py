import os
import uuid
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="FaceFindr Backend")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/images")
async def list_images():
    try:
        files = os.listdir(UPLOAD_DIR)
        # Filter purely for image extensions if preferred, or return all
        images = []
        for idx, filename in enumerate(files):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                images.append({
                    "id": idx + 1,
                    "title": filename,
                    "alt": filename,
                    "src": f"http://localhost:8000/uploads/{filename}",
                    "pending": False
                })
        # Sort by most recent based on file creation time (optional but good idea)
        images.sort(key=lambda x: os.path.getmtime(os.path.join(UPLOAD_DIR, x["title"])), reverse=True)
        return {"images": images}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")
    
    saved_files = []
    
    for file in files:
        if not file.filename:
            continue
            
        # Optional: Generate a unique filename to prevent collisions while preserving extension
        ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4().hex}{ext}"
        
        file_path = os.path.join(UPLOAD_DIR, unique_name)
        
        with open(file_path, "wb") as buffer:
            # Read and write in chunks (useful for large files)
            while content := await file.read(1024 * 1024):  # 1MB chunks
                buffer.write(content)
                
        saved_files.append({
            "original_filename": file.filename,
            "saved_as": unique_name
        })
        
    return {"message": "Successfully uploaded files", "files": saved_files}
