# backend/app/routes/geniqx_persona_router.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

router_bp = Blueprint("persona_router", __name__)

# Simulated route logic
personas = [
    {"id": "p001", "name": "Amina", "languages": ["en", "ar"], "region": "MENA"},
    {"id": "p002", "name": "Léo", "languages": ["en", "fr"], "region": "EU"},
    {"id": "p003", "name": "Ayaka", "languages": ["jp", "en"], "region": "Asia"},
]

@router_bp.route("/personas/route", methods=["POST"])
def route_request():
    data = request.get_json()
    lang = data.get("language")
    region = data.get("region")

    match = next(
        (p for p in personas if lang in p["languages"] and region.lower() in p["region"].lower()),
        None
    )
    if not match:
        return jsonify({"error": "No matching persona found"}), 404

    return jsonify({
        "persona_id": match["id"],
        "name": match["name"],
        "assigned_at": datetime.utcnow().isoformat()
    }), 200
