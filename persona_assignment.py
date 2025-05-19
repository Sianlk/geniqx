# backend/app/routes/persona_assignment.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

assignment_bp = Blueprint("persona_assignment", __name__)

assignments = []
persona_skills = {
    "assistant": ["organising", "scheduling", "typing"],
    "designer": ["branding", "UI", "color theory"],
    "ghostwriter": ["storytelling", "tone-matching", "SEO"],
    "legal": ["contracts", "compliance", "claims"],
    "therapist": ["empathy", "guidance", "cbt"]
}

@assignment_bp.route("/persona/assign", methods=["POST"])
def assign_task():
    data = request.get_json()
    task = data.get("task")
    required_skill = data.get("skill")

    # Route based on skill match
    matched_persona = None
    for pid, role_skills in persona_skills.items():
        if required_skill in role_skills:
            matched_persona = pid
            break

    assignment = {
        "assignment_id": f"A-{uuid.uuid4().hex[:6].upper()}",
        "task": task,
        "skill": required_skill,
        "assigned_to": matched_persona,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "queued"
    }
    assignments.append(assignment)
    return jsonify(assignment)
