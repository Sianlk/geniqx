# backend/app/routes/geniqx_genz_monetisation.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

monetise_bp = Blueprint("genz_monetise", __name__)

# In-memory play/payout tracker
streams = []
payouts = []

@monetise_bp.route("/genz/stream", methods=["POST"])
def log_stream():
    data = request.get_json()
    stream_id = str(uuid.uuid4())
    record = {
        "id": stream_id,
        "track_id": data["track_id"],
        "listener": data.get("user", "anon"),
        "affiliate": data.get("affiliate", None),
        "timestamp": datetime.utcnow().isoformat()
    }
    streams.append(record)
    return jsonify({"status": "logged", "id": stream_id})

@monetise_bp.route("/genz/royalty", methods=["POST"])
def calculate_royalty():
    data = request.get_json()
    artist_id = data.get("artist")
    total = sum(1 for s in streams if s.get("affiliate") == artist_id)
    payment = round(total * 0.0042, 2)
    payout_record = {
        "artist": artist_id,
        "streams": total,
        "amount": payment,
        "timestamp": datetime.utcnow().isoformat()
    }
    payouts.append(payout_record)
    return jsonify({"payout": payout_record})
