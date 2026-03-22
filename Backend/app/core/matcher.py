import json
import cv2
import numpy as np
import os
from insightface.app import FaceAnalysis
from sklearn.preprocessing import normalize
from typing import List, Dict, Any, Tuple

class FaceMatcher:
    def __init__(self, data_dir: str = "data", images_dir: str = "images"):
        self.data_dir = data_dir
        self.images_dir = images_dir
        
        # Paths
        self.emb_path = os.path.join(data_dir, "face_embeddings.npy")
        self.meta_path = os.path.join(data_dir, "face_metadata.json")
        self.cluster_path = os.path.join(data_dir, "face_clusters.json")
        
        # Thresholds (from check_Face.py)
        self.T_ACCEPT = 0.60
        self.T_STRONG = 0.60
        self.T_WEAK = 0.40
        self.DELTA_MARGIN = 0.05
        
        self.embeddings = None
        self.metadata = None
        self.clusters = None
        self.cluster_reps = {}
        self.app = None
        
        self._load_resources()
        self._init_model()

    def _load_resources(self):
        print("Loading embeddings and metadata...")
        if not os.path.exists(self.emb_path):
            print(f"Warning: Embeddings file not found at {self.emb_path}")
            return
            
        self.embeddings = np.load(self.emb_path)
        self.embeddings = normalize(self.embeddings)
        
        with open(self.meta_path, "r") as f:
            self.metadata = json.load(f)
            
        with open(self.cluster_path, "r") as f:
            self.clusters = json.load(f)
            
        # Build lookup for metadata → embedding
        meta_to_index = {}
        for i, meta in enumerate(self.metadata):
            key = (meta["image"], tuple(meta["bbox"]))
            meta_to_index[key] = i
            
        # Build cluster representatives
        for person_id, faces in self.clusters.items():
            embs = []
            for face in faces:
                key = (face["image"], tuple(face["bbox"]))
                idx = meta_to_index.get(key)
                if idx is not None:
                    embs.append(self.embeddings[idx])
            
            if len(embs) >= 2:
                self.cluster_reps[person_id] = self._compute_medoid(embs)
        
        print(f"Loaded {len(self.cluster_reps)} clusters")

    def _init_model(self):
        print("Initializing InsightFace model...")
        self.app = FaceAnalysis(name="buffalo_l")
        self.app.prepare(ctx_id=-1, det_size=(640, 640)) 

    def _cosine_similarity(self, a, b):
        return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

    def _compute_medoid(self, embeddings):
        if not embeddings:
            return None
        sims = np.zeros((len(embeddings), len(embeddings)))
        for i in range(len(embeddings)):
            for j in range(len(embeddings)):
                sims[i, j] = self._cosine_similarity(embeddings[i], embeddings[j])
        return embeddings[np.argmax(sims.mean(axis=1))]

    def match(self, img_bytes: bytes) -> Dict[str, Any]:
        # Convert bytes to cv2 image
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            return {"error": "Could not decode image"}
            
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces = self.app.get(img_rgb)
        
        print(f"Detected {len(faces)} faces in query image")
        
        matched_photos = set()
        
        for face in faces:
            query_emb = normalize(face.embedding.reshape(1, -1))[0]
            
            scores = []
            for pid, rep in self.cluster_reps.items():
                sim = self._cosine_similarity(query_emb, rep)
                scores.append((pid, sim))
            
            if not scores:
                continue
                
            scores.sort(key=lambda x: x[1], reverse=True)
            best_pid, best_score = scores[0]
            
            # Simple threshold check for now, can be elaborated based on check_Face.py logic
            if best_score >= self.T_WEAK:
                # Get photos associated with this person
                if best_pid in self.clusters:
                    for face_data in self.clusters[best_pid]:
                        matched_photos.add(face_data["image"])
                        
        # Get all photos
        all_photos = []
        if self.metadata:
            # Using metadata to get all unique images, or iterate directory
            # Taking from metadata ensures we only send processed ones? 
            # Or simpler: list all in images dir
            seen = set()
            for meta in self.metadata:
                if meta["image"] not in seen:
                    all_photos.append(meta["image"])
                    seen.add(meta["image"])
        
        # Format as URLs (relative paths for now, frontend will prepend base URL)
        # Assuming images are served static
        
        return {
            "matches": list(matched_photos),
            "all": all_photos
        }

