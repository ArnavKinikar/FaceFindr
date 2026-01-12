# FaceFindr

FaceFindr is a service-style, event-scoped face recognition system that allows guests to discover photos they appear in from large event photo collections (such as weddings) using a single selfie.

The project is designed as a **production-grade experiment**, focusing on clean architecture, scalability, and privacy-aware handling of biometric data, while remaining practical for personal and small-scale use.

---

## Key Features

* Event-scoped face recognition (no cross-event matching)
* Fast face embedding search using vector similarity
* Supports large photo collections with multiple faces per image
* Guest-based photo discovery using a single selfie
* Background preprocessing and indexing
* Privacy-first design with explicit data lifecycle

---

## High-Level Architecture

```
Frontend (Web / App)
        |
        v
API Layer (FastAPI)
        |
        |---- Metadata DB (PostgreSQL)
        |---- Object Storage (Photos)
        |---- Vector Index (FAISS, per event)
        |
        v
Face Processing Pipeline
  - Face detection
  - Face embedding generation
  - Index building
```

Each event maintains its own isolated face index to ensure privacy, easy cleanup, and clean scaling.

---

## Core Workflow

### 1. Event Ingestion (Organizer)

* Upload event photos
* Photos are stored in object storage
* Background job detects faces and generates embeddings
* Embeddings are indexed into a per-event vector database
* Event becomes searchable once processing completes

### 2. Guest Photo Discovery

* Guest accesses the event via a time-limited link
* Guest uploads a selfie
* Face is detected and embedded temporarily
* Similar faces are retrieved from the event index
* Matching photos are returned
* Guest selfie and embedding are immediately discarded

---

## Technology Stack

### Backend

* Python
* FastAPI
* InsightFace (ArcFace embeddings)
* FAISS (vector similarity search)
* PostgreSQL (metadata)

### Storage

* S3-compatible object storage (photos & thumbnails)

### Optional / Future

* Redis (background job queue)
* Docker (deployment)
* GPU acceleration for large-scale events

---

## Repository Structure (Planned)

```
facefindr/
├─ app/            # API layer
├─ workers/        # Background face processing
├─ indexing/       # FAISS index management
├─ storage/        # Object storage helpers
├─ models/         # Data models
├─ scripts/        # One-off utilities
└─ README.md
```

---

## Design Principles

* **Event Isolation**: Face data is never shared across events
* **Privacy by Design**: No long-term storage of guest biometric data
* **Service-Oriented**: Clear separation of API, processing, and search
* **Scalable Foundations**: Architecture supports future horizontal scaling
* **Accuracy over Assertion**: Results are presented as probable matches, not identity claims

---

## Privacy & Ethical Considerations

FaceFindr is designed for **explicitly consented, private events** only.

* Guests must opt in before using face-based search
* All face data is scoped strictly to a single event
* Guest selfies and embeddings are deleted immediately after search
* Event data can be fully deleted by the organizer
* No face data is reused, shared, or trained on

This project is **not intended for surveillance, identification, or law enforcement use**.

---

## Current Status

FaceFindr is under active development as a personal experiment. APIs, data models, and processing pipelines are evolving and may change.

---

## Disclaimer

This project is for educational and experimental purposes. If deployed beyond personal or private use, additional legal, security, and compliance reviews are required.

---

## License

MIT License (subject to change)
