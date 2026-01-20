import os
import json
import shutil
from collections import defaultdict

IMAGE_DIR = "images"
CLUSTER_PATH = "data/face_clusters.json"
OUTPUT_DIR = "output"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load clusters
with open(CLUSTER_PATH, "r") as f:
    clusters = json.load(f)

# Build person -> set(images) mapping
person_images = defaultdict(set)

for person_id, faces in clusters.items():
    for face in faces:
        person_images[person_id].add(face["image"])

# Create folders and copy images
for person_id, images in person_images.items():
    person_dir = os.path.join(OUTPUT_DIR, person_id)
    os.makedirs(person_dir, exist_ok=True)

    for img_name in images:
        src = os.path.join(IMAGE_DIR, img_name)
        dst = os.path.join(person_dir, img_name)

        if os.path.exists(src) and not os.path.exists(dst):
            shutil.copy2(src, dst)

print(f"Created folders for {len(person_images)} people")
