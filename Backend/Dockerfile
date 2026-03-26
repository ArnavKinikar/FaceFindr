FROM python:3.12-slim

WORKDIR /app

# System deps (needed for opencv, insightface, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy locked requirements
COPY ../requirements.lock.txt .

RUN pip install --no-cache-dir -r requirements.lock.txt

# Copy backend
COPY . .

EXPOSE 8000

CMD ["python", "run.py"]