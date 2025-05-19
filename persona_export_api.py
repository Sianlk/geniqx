# backend/app/routes/persona_export_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

export_bp = Blueprint("persona_export", __name__)

exports = []

@export_bp.route("/persona/export", methods=["POST"])
def export_persona():
    data = request.get_json()
    persona_id = data.get("persona_id")
    recipient = data.get("recipient")
    format = data.get("format", "json")
    license_type = data.get("license", "non-commercial")

    export_log = {
        "export_id": f"X-{uuid.uuid4().hex[:6].upper()}",
        "persona_id": persona_id,
        "recipient": recipient,
        "format": format,
        "license": license_type,
        "exported_at": datetime.utcnow().isoformat()
    }

    exports.append(export_log)

    download_stub = {
        "status": "ready",
        "link": f"https://geniqx.ai/download/{persona_id}.{format}",
        "license": license_type
    }

    return jsonify({**export_log, **download_stub})
