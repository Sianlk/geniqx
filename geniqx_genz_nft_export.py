# backend/app/routes/geniqx_genz_nft_export.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid
import json

nft_bp = Blueprint("genz_nft", __name__)

@nft_bp.route("/genz/nft/mintpack", methods=["POST"])
def mint_pack():
    data = request.get_json()
    pack_id = str(uuid.uuid4())[:8]
    metadata = {
        "name": data.get("title"),
        "description": f"Track by {data.get('artist')}, minted via Genz",
        "audio_url": data.get("stream_url"),
        "cover_url": data.get("cover_url"),
        "attributes": [
            {"trait_type": "Genre", "value": data.get("genre")},
            {"trait_type": "Mood", "value": data.get("mood")},
            {"trait_type": "Duration", "value": data.get("duration")}
        ],
        "timestamp": datetime.utcnow().isoformat(),
        "pack_id": pack_id
    }

    nft_path = f"/mnt/data/nft_{pack_id}.json"
    with open(nft_path, "w") as f:
        json.dump(metadata, f, indent=2)

    return jsonify({
        "status": "mintpack_ready",
        "file": nft_path,
        "metadata": metadata
    })
