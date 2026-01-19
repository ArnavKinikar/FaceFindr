import os
import json
import cv2
import numpy as np
from insightface.app import FaceAnalysis
from tqdm import tqdm

IMAGE_DIR = "images"
OUTPUT_DIR = "data"

os.makedirs(OUTPUT_DIR, exist_ok=True)

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=-1)

embeddings = []
metadata = []

for img_name in tqdm(os.listdir(IMAGE_DIR)):
    if not img_name.lower().endswith((".jpg", ".jpeg", ".png")):
        continue

    img_path = os.path.join(IMAGE_DIR, img_name)
    img = cv2.imread(img_path)
    if img is None:
        continue

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faces = app.get(img)

    for face in faces:
        embeddings.append(face.embedding)
        metadata.append({
            "image": img_name,
            "bbox": [float(x) for x in face.bbox],
            "confidence": float(face.det_score)
        })

# Save outputs
np.save(os.path.join(OUTPUT_DIR, "face_embeddings.npy"), np.array(embeddings))

with open(os.path.join(OUTPUT_DIR, "face_metadata.json"), "w") as f:
    json.dump(metadata, f, indent=2)

print(f"Saved {len(embeddings)} faces")
