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
data_dir = os.path.join(project_root, "data")

# Initialize Matcher
matcher = FaceMatcher(data_dir=data_dir, images_dir=images_dir)

# Mount Static Files
# Serve core images directory
if not os.path.exists(images_dir):
    print(f"Warning: 'images' directory not found at {images_dir}")
else:
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

@app.get("/")
def read_root():
    return {"message": "FaceFindr Backend API"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    contents = await file.read()
    results = matcher.match(contents)
    
    # Transform results to full URLs if needed, or keep relative
    # For now, returning filenames. Frontend should construct URL:
    # `http://localhost:8000/images/{filename}`
    
    return results
