# backend/app/routes/personas_api.py

from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime

personas_bp = Blueprint("ai_personas", __name__)

persona_registry = []

@personas_bp.route("/personas/create", methods=["POST"])
def create_persona():
    data = request.get_json()
    persona = {
        "persona_id": f"P-{uuid.uuid4().hex[:6].upper()}",
        "name": data.get("name"),
        "role": data.get("role"),
        "skills": data.get("skills", []),
        "personality": data.get("personality", "balanced"),
        "voice": data.get("voice", "neutral"),
        "created_at": datetime.utcnow().isoformat(),
        "status": "idle",
        "memory": []
    }
    persona_registry.append(persona)
    return jsonify(persona)

@personas_bp.route("/personas/list", methods=["GET"])
def list_personas():
    return jsonify(persona_registry)

@personas_bp.route("/personas/chat/<persona_id>", methods=["POST"])
def chat_with_persona(persona_id):
    message = request.get_json().get("message")
    persona = next((p for p in persona_registry if p["persona_id"] == persona_id), None)
    if not persona:
        return jsonify({"error": "Persona not found"}), 404
    reply = f"[{persona['name']} ({persona['role']})]: I received your message: '{message}'. Let's work on it together."
    persona["memory"].append({"timestamp": datetime.utcnow().isoformat(), "input": message, "response": reply})
    return jsonify({"reply": reply, "memory": persona["memory"][-3:]})
