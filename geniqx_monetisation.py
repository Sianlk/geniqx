# backend/app/routes/geniqx_monetisation.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

monetise_bp = Blueprint("monetise", __name__)

# Simulated in-memory database (replace with real DB later)
db = {
    "payments": [],
    "affiliates": [],
    "licenses": [],
    "funnels": []
}

@monetise_bp.route("/geniqx/pay", methods=["POST"])
def handle_payment():
    data = request.get_json()
    payment_id = str(uuid.uuid4())
    record = {
        "id": payment_id,
        "user": data.get("user"),
        "amount": data.get("amount"),
        "currency": data.get("currency", "USD"),
        "tier": data.get("tier"),
        "affiliate_id": data.get("affiliate_id"),
        "timestamp": datetime.utcnow().isoformat()
    }
    db["payments"].append(record)
    return jsonify({"status": "success", "payment_id": payment_id}), 201

@monetise_bp.route("/geniqx/license/verify", methods=["POST"])
def verify_license():
    key = request.get_json().get("license_key")
    valid = key in db["licenses"]
    return jsonify({"valid": valid})

@monetise_bp.route("/geniqx/affiliate/register", methods=["POST"])
def register_affiliate():
    data = request.get_json()
    affiliate_id = "AFF-" + str(uuid.uuid4())[:8]
    record = {
        "id": affiliate_id,
        "owner": data.get("owner"),
        "created": datetime.utcnow().isoformat()
    }
    db["affiliates"].append(record)
    return jsonify({"affiliate_id": affiliate_id}), 201

@monetise_bp.route("/geniqx/funnel/generate", methods=["POST"])
def generate_funnel():
    data = request.get_json()
    target = data.get("niche")
    funnel = {
        "id": "FNL-" + str(uuid.uuid4())[:6],
        "niche": target,
        "headline": f"Unlock {target.title()} Results Instantly",
        "cta": f"Start your {target.title()} journey with 1 click!",
        "created_at": datetime.utcnow().isoformat()
    }
    db["funnels"].append(funnel)
    return jsonify({"funnel": funnel}), 200
