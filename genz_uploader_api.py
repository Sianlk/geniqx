# backend/app/routes/genz_uploader_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

upload_bp = Blueprint("genz_uploader", __name__)

uploaded_tracks = []

@upload_bp.route("/genz/upload", methods=["POST"])
def upload_track():
    data = request.get_json()
    artist = data.get("artist")
    title = data.get("title")
    genre = data.get("genre")
    mood = data.get("mood")
    language = data.get("language", "Instrumental")

    track_id = f"GENZ-UP-{uuid.uuid4().hex[:6].upper()}"
    waveform_id = uuid.uuid4().hex[:12]
    bpm = 85 + hash(title) % 40
    key = ["C", "D", "E", "F", "G", "A", "B"][hash(title) % 7]
    scale = "minor" if hash(title) % 2 else "major"

    track = {
        "track_id": track_id,
        "artist": artist,
        "title": title,
        "genre": genre,
        "mood": mood,
        "language": language,
        "waveform_id": waveform_id,
        "bpm": bpm,
        "key": f"{key} {scale}",
        "rights": {
            "owner": artist,
            "license": "GENZ Creator Upload License",
            "copyright_year": datetime.utcnow().year
        },
        "uploaded_at": datetime.utcnow().isoformat()
    }

    uploaded_tracks.append(track)
    return jsonify(track)
