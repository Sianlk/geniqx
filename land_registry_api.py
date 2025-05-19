# backend/app/routes/land_registry_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

land_bp = Blueprint("land_registry", __name__)

mock_properties = [
    {
        "property_id": "GQX-001",
        "postcode": "NW1 5DB",
        "owner": "GENIQX Developments Ltd",
        "last_sale_price": 865000,
        "market_estimate": 920000,
        "bedrooms": 3,
        "bathrooms": 2,
        "planning_status": "Approved",
        "development_potential": "High",
        "planning_notes": "Loft extension permitted 2022",
        "compliance_score": 92
    },
    {
        "property_id": "GQX-002",
        "postcode": "SE10 8XJ",
        "owner": "Hamilton Property Group",
        "last_sale_price": 420000,
        "market_estimate": 495000,
        "bedrooms": 2,
        "bathrooms": 1,
        "planning_status": "Pending",
        "development_potential": "Medium",
        "planning_notes": "Under review for side extension",
        "compliance_score": 78
    }
]

@land_bp.route("/land/lookup", methods=["POST"])
def lookup_property():
    data = request.get_json()
    postcode = data.get("postcode", "").upper()
    results = [p for p in mock_properties if p["postcode"] == postcode]
    return jsonify(results if results else [{"message": "No data found for that postcode"}])
