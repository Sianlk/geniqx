# backend/app/routes/persona_freelance_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

freelance_bp = Blueprint("persona_freelance", __name__)

freelancer_logs = []

@freelance_bp.route("/persona/freelancer/log", methods=["POST"])
def log_freelance_task():
    data = request.get_json()
    task_id = data.get("task_id")
    persona_id = data.get("persona_id")
    amount = data.get("amount")
    rating = data.get("rating", 5)

    log = {
        "freelance_id": f"F-{uuid.uuid4().hex[:6].upper()}",
        "task_id": task_id,
        "persona_id": persona_id,
        "amount": float(amount),
        "rating": int(rating),
        "timestamp": datetime.utcnow().isoformat()
    }
    freelancer_logs.append(log)
    return jsonify(log)

@freelance_bp.route("/persona/freelancer/history/<persona_id>", methods=["GET"])
def get_freelance_history(persona_id):
    history = [t for t in freelancer_logs if t["persona_id"] == persona_id]
    total_earned = sum(t["amount"] for t in history)
    return jsonify({"persona_id": persona_id, "total_earned": total_earned, "jobs": history})
