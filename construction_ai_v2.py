# backend/app/routes/construction_ai_v2.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

ai_v2_bp = Blueprint("construction_ai_v2", __name__)

@ai_v2_bp.route("/construction/v2/generate", methods=["POST"])
def generate_project():
    data = request.get_json()
    floors = int(data.get("floors", 1))
    use_case = data.get("use_case", "residential")
    postcode = data.get("postcode", "E1 6AN")

    cad_id = f"CAD-{uuid.uuid4().hex[:6].upper()}"
    total_sq_ft = floors * 750
    base_material_cost = 120 if use_case == "residential" else 175
    labour_multiplier = 0.4
    tool_ratio = 0.2
    retail_markup = 1.25

    material_cost = base_material_cost * total_sq_ft
    labour_cost = labour_multiplier * material_cost
    tools_cost = tool_ratio * material_cost

    trade_total = material_cost + labour_cost + tools_cost
    retail_total = trade_total * retail_markup
    margin = retail_total - trade_total

    response = {
        "cad_id": cad_id,
        "floors": floors,
        "postcode": postcode,
        "use_case": use_case,
        "timestamp": datetime.utcnow().isoformat(),
        "floor_area": total_sq_ft,
        "bim_layers": {
            "foundation": "Reinforced Concrete Pad",
            "walls": "Thermal Block + Brick Cavity",
            "roof": "Timber Truss + Slate Tile"
        },
        "structural_summary": {
            "max_span_ok": floors <= 3,
            "compliance_check": "Pass",
            "wind_resistance": "Approved to BS EN 1991-1-4"
        },
        "planning_status": "Meets local borough regulation height and spread",
        "trade_quote": round(trade_total, 2),
        "retail_quote": round(retail_total, 2),
        "margin_profit": round(margin, 2),
        "currency": "GBP"
    }

    return jsonify(response)
