# backend/app/routes/genz_library_api.py

from flask import Blueprint, jsonify
from datetime import datetime
import uuid

library_bp = Blueprint("genz_library", __name__)

# Simulated GENZ track library
track_library = [
    {
        "track_id": "GENZ-AI-0001",
        "title": "Uplifted Harmony",
        "artist": "GENZ Composer",
        "genre": "Ambient",
        "mood": "Relaxing",
        "language": "Instrumental",
        "bpm": 92,
        "key": "F major",
        "waveform_id": uuid.uuid4().hex[:12],
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "track_id": "GENZ-UP-2033",
        "title": "Digital Pulse",
        "artist": "Nova",
        "genre": "Electro Pop",
        "mood": "Energetic",
        "language": "English",
        "bpm": 128,
        "key": "C minor",
        "waveform_id": uuid.uuid4().hex[:12],
        "created_at": datetime.utcnow().isoformat()
    }
]

@library_bp.route("/genz/library", methods=["GET"])
def get_library():
    return jsonify(track_library)
