# backend/app/routes/edin_mastery_tracker.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

mastery_bp = Blueprint("edin_mastery", __name__)

mastery_log = []

@mastery_bp.route("/edin/mastery/log", methods=["POST"])
def log_mastery():
    data = request.get_json()
    record = {
        "log_id": str(uuid.uuid4())[:8],
        "student": data.get("student"),
        "subject": data.get("subject"),
        "score": data.get("score"),
        "timestamp": datetime.utcnow().isoformat()
    }
    mastery_log.append(record)
    return jsonify({"status": "logged", "log_id": record["log_id"]})

@mastery_bp.route("/edin/mastery/history/<student>", methods=["GET"])
def get_mastery(student):
    history = [r for r in mastery_log if r["student"] == student]
    return jsonify({"student": student, "history": history})
