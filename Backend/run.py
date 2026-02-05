import uvicorn
import os

if __name__ == "__main__":
    # Ensure usage of the correct directory context
    # We want to run from e:\Projects\FaceFindr usually
    
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True, app_dir="Backend")
