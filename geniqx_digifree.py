# backend/app/routes/geniqx_digifree.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

digifree_bp = Blueprint("digifree", __name__)

# Simulated takedown registry
removal_requests = []

@digifree_bp.route("/digifree/request", methods=["POST"])
def request_removal():
    data = request.get_json()
    request_id = str(uuid.uuid4())[:8]
    timestamp = datetime.utcnow().isoformat()
    record = {
        "id": request_id,
        "fields": data,
        "status": "submitted",
        "reviewed": False,
        "timestamp": timestamp
    }
    removal_requests.append(record)
    return jsonify({"status": "queued", "request_id": request_id, "timestamp": timestamp}), 202

@digifree_bp.route("/digifree/admin/review", methods=["GET"])
def list_pending():
    pending = [r for r in removal_requests if not r["reviewed"]]
    return jsonify({"pending_reviews": pending}), 200

@digifree_bp.route("/digifree/admin/execute", methods=["POST"])
def execute_removal():
    data = request.get_json()
    req_id = data.get("request_id")
    match = next((r for r in removal_requests if r["id"] == req_id), None)
    if not match:
        return jsonify({"error": "not found"}), 404

    match["status"] = "removed"
    match["reviewed"] = True
    match["removed_at"] = datetime.utcnow().isoformat()
    return jsonify({"status": "executed", "id": req_id}), 200
