# backend/app/routes/genz_trackgen_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

trackgen_bp = Blueprint("genz_trackgen", __name__)

@trackgen_bp.route("/genz/trackgen", methods=["POST"])
def generate_track():
    data = request.get_json()
    genre = data.get("genre", "global fusion")
    mood = data.get("mood", "uplifting")
    language = data.get("language", "instrumental")
    duration = data.get("duration", 180)

    track_id = f"GENZ-{uuid.uuid4().hex[:6].upper()}"
    bpm = 80 + hash(track_id) % 60
    key = ["C", "D", "E", "F", "G", "A", "B"][hash(track_id) % 7]
    scale = "minor" if hash(track_id) % 2 else "major"

    response = {
        "track_id": track_id,
        "title": f"{genre.title()} {mood.title()} Vibe",
        "genre": genre,
        "mood": mood,
        "language": language,
        "bpm": bpm,
        "key": f"{key} {scale}",
        "duration_seconds": duration,
        "waveform_id": uuid.uuid4().hex[:12],
        "created_at": datetime.utcnow().isoformat(),
        "status": "generated",
        "rights": {
            "owner": "GENZ AI",
            "license": "GENZ Universal Music License",
            "copyright_year": datetime.utcnow().year
        }
    }

    return jsonify(response)
