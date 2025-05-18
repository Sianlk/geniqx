# backend/app/routes/geniqx_genz.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

genz_bp = Blueprint("genz", __name__)

# Simulated music library
library = [
    {
        "id": "trk01",
        "title": "Starlight Echo",
        "artist": "Zyrah",
        "genre": "Pop",
        "mood": "Uplifting",
        "duration": "3:42",
        "stream_url": "/audio/starlight_echo.mp3",
        "cover_url": "/images/starlight_echo.jpg"
    },
    {
        "id": "trk02",
        "title": "Crypto Drift",
        "artist": "DJ Nova",
        "genre": "EDM",
        "mood": "Energetic",
        "duration": "4:18",
        "stream_url": "/audio/crypto_drift.mp3",
        "cover_url": "/images/crypto_drift.jpg"
    }
]

@genz_bp.route("/genz/library", methods=["GET"])
def get_library():
    return jsonify({"tracks": library})

@genz_bp.route("/genz/track/<track_id>", methods=["GET"])
def get_track(track_id):
    track = next((t for t in library if t["id"] == track_id), None)
    return jsonify({"track": track}) if track else (jsonify({"error": "Not found"}), 404)

@genz_bp.route("/genz/submit", methods=["POST"])
def submit_track():
    data = request.get_json()
    new_id = f"trk{str(uuid.uuid4())[:4]}"
    new_track = {
        "id": new_id,
        "title": data["title"],
        "artist": data["artist"],
        "genre": data["genre"],
        "mood": data["mood"],
        "duration": data.get("duration", "0:00"),
        "stream_url": data.get("stream_url", ""),
        "cover_url": data.get("cover_url", "")
    }
    library.append(new_track)
    return jsonify({"status": "added", "track": new_track, "timestamp": datetime.utcnow().isoformat()}), 201
