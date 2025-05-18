# backend/app/routes/geniqx_wealth_risk.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

risk_bp = Blueprint("wealth_risk", __name__)

@risk_bp.route("/geniqx/wealth/risk", methods=["POST"])
def calculate_risk():
    data = request.get_json()
    risk_flags = []
    score = 0

    if "Panama" in data.get("jurisdictions", []):
        risk_flags.append("Offshore holding (Panama)")
        score += 25

    if len(data.get("linked_companies", [])) > 5:
        risk_flags.append("Shell-layered entities detected")
        score += 20

    if any("0x" in wallet for wallet in data.get("wallets", [])):
        risk_flags.append("Unregistered crypto asset path")
        score += 15

    if "Dubai" in " ".join(data.get("assets", [])):
        risk_flags.append("High-risk real estate acquisition")
        score += 20

    if score > 70:
        level = "Critical"
    elif score > 40:
        level = "High"
    elif score > 20:
        level = "Moderate"
    else:
        level = "Low"

    return jsonify({
        "score": score,
        "risk_level": level,
        "flags": risk_flags,
        "timestamp": datetime.utcnow().isoformat()
    }), 200
