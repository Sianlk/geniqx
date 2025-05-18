# backend/app/routes/edin_cpd_generator.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

cpd_bp = Blueprint("edin_cpd", __name__)

@cpd_bp.route("/edin/cpd/create", methods=["POST"])
def generate_cpd_course():
    data = request.get_json()
    subject = data.get("subject")
    level = data.get("level")

    # Simulated course scaffold
    units = [
        {"unit": "Introduction", "outcomes": ["Understand key concepts", "Define objectives"]},
        {"unit": "Core Skills", "outcomes": ["Apply methods", "Evaluate results"]},
        {"unit": "Practical Application", "outcomes": ["Simulate real use", "Complete task-based scenarios"]},
        {"unit": "Assessment & Review", "outcomes": ["Complete final test", "Reflect on learning"]}
    ]

    course = {
        "course_id": f"CPD-{uuid.uuid4().hex[:6].upper()}",
        "subject": subject,
        "level": level,
        "credit_hours": 6,
        "units": units,
        "created_at": datetime.utcnow().isoformat()
    }

    return jsonify(course)
