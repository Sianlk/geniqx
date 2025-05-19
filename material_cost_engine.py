# backend/app/routes/material_cost_engine.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

material_bp = Blueprint("material_cost", __name__)

@material_bp.route("/construction/materials", methods=["POST"])
def estimate_materials():
    data = request.get_json()
    sq_ft = int(data.get("sq_ft", 1000))
    region = data.get("region", "UK")
    use_case = data.get("use_case", "residential")

    base_cost = 125 if use_case == "residential" else 180
    labour_factor = 0.35
    tools_factor = 0.15

    total_material_cost = base_cost * sq_ft
    labour_cost = labour_factor * total_material_cost
    tool_cost = tools_factor * total_material_cost
    grand_total = total_material_cost + labour_cost + tool_cost

    response = {
        "estimate_id": f"MAT-{uuid.uuid4().hex[:6].upper()}",
        "sq_ft": sq_ft,
        "region": region,
        "use_case": use_case,
        "materials_cost": round(total_material_cost, 2),
        "labour_cost": round(labour_cost, 2),
        "tool_cost": round(tool_cost, 2),
        "total_estimate": round(grand_total, 2),
        "timestamp": datetime.utcnow().isoformat()
    }

    return jsonify(response)
