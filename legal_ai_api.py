# backend/app/routes/legal_ai_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

legal_bp = Blueprint("legal_ai", __name__)

documents = []

@legal_bp.route("/legal/generate", methods=["POST"])
def generate_legal():
    data = request.get_json()
    case_type = data.get("case_type", "small_claim")
    jurisdiction = data.get("jurisdiction", "UK")
    user = data.get("user", "anonymous")

    doc_id = f"LEGAL-{uuid.uuid4().hex[:6].upper()}"
    filename = f"{case_type}_{jurisdiction}_{doc_id}.pdf"
    waiver = "This tool is not a substitute for legal advice. You should consult a professional."

    form_url = f"https://geniqx.ai/legal/forms/{case_type}.pdf"
    directions = f"https://geniqx.ai/legal/instructions/{case_type}_guide.pdf"

    result = {
        "doc_id": doc_id,
        "user": user,
        "case_type": case_type,
        "jurisdiction": jurisdiction,
        "generated_at": datetime.utcnow().isoformat(),
        "legal_form": form_url,
        "instruction_pdf": directions,
        "waiver_notice": waiver,
        "status": "prepared"
    }

    documents.append(result)
    return jsonify(result)

@legal_bp.route("/legal/list", methods=["GET"])
def list_legal():
    return jsonify(documents)
