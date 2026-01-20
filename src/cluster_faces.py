import json
import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import normalize
from collections import defaultdict

# Paths
EMB_PATH = "../data/face_embeddings.npy"
META_PATH = "../data/face_metadata.json"
OUT_PATH = "../data/face_clusters.json"

# Load data
embeddings = np.load(EMB_PATH)
with open(META_PATH, "r") as f:
    metadata = json.load(f)

print("Embeddings shape:", embeddings.shape)
print("Metadata entries:", len(metadata))

# Safety check
assert len(embeddings) == len(metadata), "Embeddings/metadata mismatch"

# Normalize embeddings (required for cosine distance)
embeddings = normalize(embeddings)

# DBSCAN clustering
clusterer = DBSCAN(
    eps=0.49,           # start here
    min_samples=2,
    metric="cosine"
)

labels = clusterer.fit_predict(embeddings)

# Group faces by cluster
clusters = defaultdict(list)
noise = 0

for label, meta in zip(labels, metadata):
    if label == -1:
        noise += 1
        continue
    person_id = f"Person_{label:03d}"
    clusters[person_id].append(meta)

# Save results
with open(OUT_PATH, "w") as f:
    json.dump(clusters, f, indent=2)

# Summary
print("People detected:", len(clusters))
print("Faces assigned:", sum(len(v) for v in clusters.values()))
print("Noise faces:", noise)
