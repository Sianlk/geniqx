# backend/app/routes/nuvexa_surgery_sim_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

surgery_sim_bp = Blueprint("nuvexa_surgery_sim", __name__)

sim_sessions = []

@surgery_sim_bp.route("/nuvexa/simulate", methods=["POST"])
def simulate_surgery():
    data = request.get_json()
    student_id = data.get("student_id")
    procedure = data.get("procedure")
    sim_mode = data.get("mode", "guided")
    difficulty = data.get("difficulty", "standard")

    sim_id = f"SIM-{uuid.uuid4().hex[:6].upper()}"
    outcome = "success" if difficulty == "standard" else "partial"

    session = {
        "sim_id": sim_id,
        "student_id": student_id,
        "procedure": procedure,
        "mode": sim_mode,
        "difficulty": difficulty,
        "result": outcome,
        "guidance": "robotic_assist_overlay" if sim_mode == "guided" else "manual_evaluation",
        "score": 92 if sim_mode == "guided" else 78,
        "timestamp": datetime.utcnow().isoformat()
    }

    sim_sessions.append(session)
    return jsonify(session)

@surgery_sim_bp.route("/nuvexa/simulations/<student_id>", methods=["GET"])
def get_simulations(student_id):
    student_sessions = [s for s in sim_sessions if s["student_id"] == student_id]
    return jsonify({"student_id": student_id, "simulations": student_sessions})
