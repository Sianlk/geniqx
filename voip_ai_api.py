# backend/app/routes/voip_ai_api.py

from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime

voip_bp = Blueprint("voip_ai", __name__)

calls_db = []

@voip_bp.route("/voip/create-call", methods=["POST"])
def create_call():
    data = request.get_json()
    user = data.get("user", "anonymous")
    mode = data.get("mode", "video")  # audio, video, webinar
    intent = data.get("intent", "consult")
    monetisation = data.get("monetisation", True)

    call_id = f"GVOIP-{uuid.uuid4().hex[:6].upper()}"
    join_url = f"https://geniqx.ai/room/{call_id}"

    call = {
        "call_id": call_id,
        "user": user,
        "mode": mode,
        "intent": intent,
        "join_url": join_url,
        "affiliate_links": [
            f"https://geniqx.ai/aff/{uuid.uuid4().hex[:8]}",
            f"https://geniqx.ai/bundle/{uuid.uuid4().hex[:6]}"
        ] if monetisation else [],
        "ai_bot": "activated" if monetisation else "muted",
        "timestamp": datetime.utcnow().isoformat()
    }

    calls_db.append(call)
    return jsonify(call)

@voip_bp.route("/voip/list", methods=["GET"])
def list_calls():
    return jsonify(calls_db)
