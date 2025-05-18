# backend/app/routes/geniqx_edin_examgen.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import random
import uuid

examgen_bp = Blueprint("edin_examgen", __name__)

exam_db = {
    "11plus_verbal": [
        {"q": "Choose the synonym of 'rapid'", "a": ["slow", "fast", "happy", "tall"], "answer": "fast"},
        {"q": "Complete the analogy: Cat is to feline as dog is to ___", "a": ["canine", "puppy", "bark", "pet"], "answer": "canine"}
    ],
    "13plus_maths": [
        {"q": "What is 12 × 8?", "a": ["96", "84", "88", "108"], "answer": "96"},
        {"q": "Simplify: 3(x + 4) = ?", "a": ["3x + 4", "x + 12", "3x + 12", "7x"], "answer": "3x + 12"}
    ]
}

@examgen_bp.route("/edin/exam/mock", methods=["POST"])
def generate_mock_exam():
    data = request.get_json()
    subject = data.get("subject")
    count = int(data.get("count", 2))
    questions = exam_db.get(subject, [])[:count]
    exam_id = str(uuid.uuid4())[:8]
    return jsonify({
        "exam_id": exam_id,
        "subject": subject,
        "questions": questions,
        "created_at": datetime.utcnow().isoformat()
    })
