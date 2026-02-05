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

# Initialize Matcher
# Using relative path assuming run context is project root or setting explicit paths
matcher = FaceMatcher(data_dir="data", images_dir="images")

# Mount Static Files
# Serve core images directory
# Ensure 'images' directory exists
if not os.path.exists("images"):
    print("Warning: 'images' directory not found.")
else:
    app.mount("/images", StaticFiles(directory="images"), name="images")

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
