# backend/app/routes/nuvexa_cpd_log_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

cpd_log_bp = Blueprint("nuvexa_cpd_log", __name__)

cpd_logs = []

@cpd_log_bp.route("/nuvexa/cpd/log", methods=["POST"])
def log_cpd():
    data = request.get_json()
    student_id = data.get("student_id")
    activity = data.get("activity")
    credits = float(data.get("credits"))
    outcome = data.get("outcome", "completed")

    log = {
        "log_id": f"CPD-{uuid.uuid4().hex[:6].upper()}",
        "student_id": student_id,
        "activity": activity,
        "credits": credits,
        "outcome": outcome,
        "timestamp": datetime.utcnow().isoformat()
    }
    cpd_logs.append(log)
    return jsonify(log)

@cpd_log_bp.route("/nuvexa/cpd/history/<student_id>", methods=["GET"])
def get_cpd_log(student_id):
    history = [l for l in cpd_logs if l["student_id"] == student_id]
    total_credits = sum(l["credits"] for l in history)
    return jsonify({
        "student_id": student_id,
        "total_credits": total_credits,
        "records": history
    })
