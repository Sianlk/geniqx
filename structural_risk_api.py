# backend/app/routes/structural_risk_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

risk_bp = Blueprint("construction_risk", __name__)

@risk_bp.route("/construction/structure", methods=["POST"])
def evaluate_structure():
    data = request.get_json()
    design = data.get("design", "standard")
    material = data.get("material", "concrete")
    floors = int(data.get("floors", 1))

    score = 90 if material == "concrete" else 70
    if design == "unsupported" or floors > 4:
        score -= 25

    response = {
        "eval_id": f"STR-{uuid.uuid4().hex[:6].upper()}",
        "design": design,
        "material": material,
        "floors": floors,
        "risk_score": score,
        "integrity_status": "pass" if score > 70 else "review",
        "timestamp": datetime.utcnow().isoformat()
    }

    return jsonify(response)
