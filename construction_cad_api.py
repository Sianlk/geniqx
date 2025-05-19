# backend/app/routes/construction_cad_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

cad_bp = Blueprint("construction_cad", __name__)

cad_drawings = []

@cad_bp.route("/construction/cad", methods=["POST"])
def generate_cad():
    data = request.get_json()
    project_name = data.get("project_name")
    floors = int(data.get("floors", 1))
    use_case = data.get("use_case", "residential")
    regs = "UK Building Regs 2025" if use_case == "residential" else "Mixed-use 2025 Compliance"

    cad_id = f"CAD-{uuid.uuid4().hex[:6].upper()}"
    drawing = {
        "cad_id": cad_id,
        "project_name": project_name,
        "floors": floors,
        "use_case": use_case,
        "auto_dimensions": {
            "total_sq_ft": 800 * floors,
            "room_count": 5 + (floors * 2)
        },
        "estimated_compliance": regs,
        "safety_score": 92 if use_case == "residential" else 88,
        "timestamp": datetime.utcnow().isoformat()
    }

    cad_drawings.append(drawing)
    return jsonify(drawing)

@cad_bp.route("/construction/cad/<cad_id>", methods=["GET"])
def get_cad(cad_id):
    match = next((d for d in cad_drawings if d["cad_id"] == cad_id), None)
    return jsonify(match if match else {"error": "Not found"})
