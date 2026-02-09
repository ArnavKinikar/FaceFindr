import os
import json
import numpy as np
import cv2
from insightface.app import FaceAnalysis
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import normalize
from collections import defaultdict

# Paths
DATA_DIR = "data"
EMB_PATH = os.path.join(DATA_DIR, "face_embeddings.npy")
META_PATH = os.path.join(DATA_DIR, "face_metadata.json")
CLUSTER_PATH = os.path.join(DATA_DIR, "face_clusters.json")

def update_face_data(image_name, image_path):
    """
    Extracts embeddings from an approved photo, updates the database, and re-clusters.
    """
    print(f"Processing approved photo: {image_name}")

    # 1. Initialize InsightFace
    app = FaceAnalysis(name="buffalo_l")
    app.prepare(ctx_id=-1)  # Use CPU

    # 2. Extract Embeddings
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not read image at {image_path}")
        return False

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faces = app.get(img_rgb)
    
    if not faces:
        print("No faces detected in the photo.")
        return False

    new_embeddings = [face.embedding for face in faces]
    new_metadata = [
        {
            "image": image_name,
            "bbox": [float(x) for x in face.bbox],
            "confidence": float(face.det_score)
        }
        for face in faces
    ]

    # 3. Update saved files
    # Load existing
    if os.path.exists(EMB_PATH):
        embeddings = np.load(EMB_PATH)
        embeddings = np.vstack([embeddings, np.array(new_embeddings)])
    else:
        embeddings = np.array(new_embeddings)

    if os.path.exists(META_PATH):
        with open(META_PATH, "r") as f:
            metadata = json.load(f)
        metadata.extend(new_metadata)
    else:
        metadata = new_metadata

    # Save updated
    np.save(EMB_PATH, embeddings)
    with open(META_PATH, "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"Added {len(faces)} faces to database.")

    # 4. Re-cluster
    print("Re-clustering faces...")
    # Normalize for cosine distance
    norm_embeddings = normalize(embeddings)

    clusterer = DBSCAN(
        eps=0.49,
        min_samples=2,
        metric="cosine"
    )
    labels = clusterer.fit_predict(norm_embeddings)

    clusters = defaultdict(list)
    noise = 0
    for label, meta in zip(labels, metadata):
        if label == -1:
            noise += 1
            continue
        person_id = f"Person_{label:03d}"
        clusters[person_id].append(meta)

    with open(CLUSTER_PATH, "w") as f:
        json.dump(clusters, f, indent=2)

    print(f"Update complete. People detected: {len(clusters)}, Noise faces: {noise}")
    return True

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2:
        update_face_data(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python approval_handler.py <image_name> <image_path>")
