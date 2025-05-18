from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

edin_bp = Blueprint("edin", __name__)

edin_curriculum = {
    "maths_primary": ["place value", "addition", "ST-maths visual logic"],
    "english_secondary": ["sentence builder", "creative writing", "GCSE model answer"],
    "science_gcse": ["biology recall map", "physics scaffold", "chemistry mnemonics"],
    "11plus_verbal": ["analogies", "cloze", "synonyms", "stories"],
    "diagnostic_cat": ["quantitative reasoning", "spatial", "non-verbal", "verbal"]
}

edin_diagnostics = []

@edin_bp.route("/edin/curriculum/<path:subject>", methods=["GET"])
def get_curriculum(subject):
    content = edin_curriculum.get(subject, [])
    return jsonify({"subject": subject, "topics": content})

@edin_bp.route("/edin/diagnostic", methods=["POST"])
def run_diagnostic():
    data = request.get_json()
    student = data.get("student")
    subject = data.get("subject")
    report_id = str(uuid.uuid4())[:8]
    score = int(uuid.uuid4().int % 100)

    result = {
        "report_id": report_id,
        "student": student,
        "subject": subject,
        "score": score,
        "status": "complete",
        "recommended_path": f"remedial-{subject}" if score < 75 else f"mastery-{subject}",
        "timestamp": datetime.utcnow().isoformat()
    }

    edin_diagnostics.append(result)
    return jsonify(result)
