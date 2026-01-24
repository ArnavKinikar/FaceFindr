import json
import cv2
import numpy as np
from insightface.app import FaceAnalysis
from sklearn.preprocessing import normalize

# -----------------------------
# Paths (match your pipeline)
# -----------------------------

EMB_PATH = "../data/face_embeddings.npy"
META_PATH = "../data/face_metadata.json"
CLUSTER_PATH = "../data/face_clusters.json"
QUERY_IMAGE = "../images/testing/test3.png"

# -----------------------------
# Thresholds
# -----------------------------

T_ACCEPT = 0.60
T_STRONG = 0.60
T_WEAK = 0.40
DELTA_MARGIN = 0.05

# -----------------------------
# Utils
# -----------------------------

def cosine_similarity(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

def compute_medoid(embeddings):
    sims = np.zeros((len(embeddings), len(embeddings)))
    for i in range(len(embeddings)):
        for j in range(len(embeddings)):
            sims[i, j] = cosine_similarity(embeddings[i], embeddings[j])
    return embeddings[np.argmax(sims.mean(axis=1))]

# -----------------------------
# Load embeddings + metadata
# -----------------------------

embeddings = np.load(EMB_PATH)
embeddings = normalize(embeddings)

with open(META_PATH, "r") as f:
    metadata = json.load(f)

with open(CLUSTER_PATH, "r") as f:
    clusters = json.load(f)

assert len(embeddings) == len(metadata), "Embedding/metadata mismatch"

# Build lookup for metadata → embedding
meta_to_index = {}
for i, meta in enumerate(metadata):
    key = (meta["image"], tuple(meta["bbox"]))
    meta_to_index[key] = i

# -----------------------------
# Build cluster representatives
# -----------------------------

cluster_reps = {}

for person_id, faces in clusters.items():
    embs = []
    for face in faces:
        key = (face["image"], tuple(face["bbox"]))
        idx = meta_to_index.get(key)
        if idx is not None:
            embs.append(embeddings[idx])

    if len(embs) >= 2:
        cluster_reps[person_id] = compute_medoid(embs)

print(f"Loaded {len(cluster_reps)} clusters")

# -----------------------------
# Init InsightFace
# -----------------------------

app = FaceAnalysis(name="buffalo_l")
app.prepare(ctx_id=-1)

# -----------------------------
# Process query image
# -----------------------------

img = cv2.imread(QUERY_IMAGE)
if img is None:
    raise RuntimeError("Could not read query image")

img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
faces = app.get(img)

print(f"Detected {len(faces)} faces")

# -----------------------------
# Assignment
# -----------------------------

for i, face in enumerate(faces):
    query_emb = normalize(face.embedding.reshape(1, -1))[0]

    scores = []
    for pid, rep in cluster_reps.items():
        sim = cosine_similarity(query_emb, rep)
        scores.append((pid, sim))

    scores.sort(key=lambda x: x[1], reverse=True)

    best_pid, best_score = scores[0]
    second_score = scores[1][1] if len(scores) > 1 else 0.0
    margin = best_score - second_score

    if best_score < T_WEAK:
        decision = "unknown"
        assigned = None

    elif best_score >= T_STRONG:
        decision = "assigned_strong"
        assigned = best_pid

    elif margin >= DELTA_MARGIN:
        decision = "assigned_weak"
        assigned = best_pid

    else:
        decision = "ambiguous"
        assigned = None

    print("\n----------------------")
    print(f"Face {i + 1}")
    print("BBox:", [float(x) for x in face.bbox])
    print("Detection confidence:", float(face.det_score))
    print("Decision:", decision)
    print("Assigned person:", assigned)
    print("Best similarity:", round(best_score, 3))
    print("Margin:", round(margin, 3))

    print("Top matches:")
    for pid, score in scores[:3]:
        print(f"  {pid}: {round(score, 3)}")
