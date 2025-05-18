# backend/app/routes/edin_ai_tutor.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

tutor_bp = Blueprint("edin_tutor", __name__)

@tutor_bp.route("/edin/tutor", methods=["POST"])
def ai_tutor_response():
    data = request.get_json()
    subject = data.get("subject")
    question = data.get("question")

    # Simulated AI response logic
    response = {
        "subject": subject,
        "question": question,
        "explanation": f"This question relates to '{subject}'. Here's how to think about it...",
        "steps": [
            "Step 1: Identify key terms in the question.",
            "Step 2: Recall related method or rule.",
            "Step 3: Apply it using a scaffolded structure.",
            "Step 4: Check alignment with mark scheme keywords."
        ],
        "confidence": 0.92,
        "timestamp": datetime.utcnow().isoformat()
    }
    return jsonify(response)
