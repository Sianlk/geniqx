# backend/app/routes/ecom_product_ai_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

ecom_bp = Blueprint("ecommerce_ai", __name__)

product_list = []

@ecom_bp.route("/ecom/generate", methods=["POST"])
def generate_product():
    data = request.get_json()
    sector = data.get("sector", "beauty")
    trend = data.get("trend", "viral skin serum")
    type = data.get("type", "physical")

    product_id = f"POD-{uuid.uuid4().hex[:6].upper()}"
    price = 49.99 if type == "physical" else 19.99
    cost = 12.00 if type == "physical" else 0.00
    margin = price - cost

    affiliate = f"https://geniqx.ai/aff/{uuid.uuid4().hex[:8]}"
    download = f"https://geniqx.ai/pdf/{trend.replace(' ', '_')}_pack.pdf" if type == "digital" else ""

    product = {
        "product_id": product_id,
        "sector": sector,
        "trend": trend,
        "type": type,
        "price": price,
        "cost": cost,
        "profit_margin": round(margin, 2),
        "supplier": "anonymised-scraped-supplier.com",
        "shipping_days": 5,
        "customs_included": True,
        "return_risk": "Supplier only",
        "affiliate_link": affiliate,
        "download_url": download,
        "timestamp": datetime.utcnow().isoformat()
    }

    product_list.append(product)
    return jsonify(product)

@ecom_bp.route("/ecom/list", methods=["GET"])
def list_products():
    return jsonify(product_list)
