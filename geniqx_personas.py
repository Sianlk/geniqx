# backend/app/routes/geniqx_personas.py

from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime

personas_bp = Blueprint("personas", __name__)

# Simulated AI persona registry
personas = [
    {
        "id": "ai001",
        "name": "Sera",
        "role": "Influencer Coach",
        "tone": "Empowering",
        "languages": ["en", "fr"],
        "skills": ["video captions", "audience targeting", "trend mimicry"]
    },
    {
        "id": "ai002",
        "name": "Lex",
        "role": "AI Legal Advisor",
        "tone": "Formal",
        "languages": ["en"],
        "skills": ["contract redline", "GDPR check", "case doc export"]
    }
]

@personas_bp.route("/personas", methods=["GET"])
def list_personas():
    return jsonify({"available": personas})

@personas_bp.route("/personas/assign", methods=["POST"])
def assign_persona():
    data = request.get_json()
    persona_id = data.get("persona_id")
    task = data.get("task")
    user = data.get("user", "anon")

    match = next((p for p in personas if p["id"] == persona_id), None)
    if not match:
        return jsonify({"error": "Persona not found"}), 404

    job_id = str(uuid.uuid4())[:8]
    result = {
        "job_id": job_id,
        "persona": match["name"],
        "task": task,
        "status": "queued",
        "started_at": datetime.utcnow().isoformat()
    }
    return jsonify(result), 202
