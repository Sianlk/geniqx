# backend/app/routes/marketing_ai_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

marketing_bp = Blueprint("marketing_ai", __name__)

generated_campaigns = []

@marketing_bp.route("/marketing/generate", methods=["POST"])
def generate_campaign():
    data = request.get_json()
    topic = data.get("topic", "wealth strategy")
    platform = data.get("platform", "tiktok")
    persona = data.get("persona", "ai_creator")

    campaign_id = f"AD-{uuid.uuid4().hex[:6].upper()}"
    title = f"How to {topic.title()} in 30 Seconds"
    hook = f"Watch this if you're tired of being broke — {topic.title()} secrets revealed!"
    affiliate_link = f"https://geniqx.ai/aff/{uuid.uuid4().hex[:8]}"
    redirect_funnel = f"https://geniqx.ai/lp/{uuid.uuid4().hex[:6]}"
    pdf_leadmagnet = f"https://geniqx.ai/pdf/{topic.replace(' ', '_')}_bundle.pdf"

    result = {
        "campaign_id": campaign_id,
        "topic": topic,
        "platform": platform,
        "persona": persona,
        "title": title,
        "hook": hook,
        "affiliate_link": affiliate_link,
        "linktree_path": redirect_funnel,
        "leadmagnet_pdf": pdf_leadmagnet,
        "cta": "Download this free resource — link in bio!",
        "status": "ready",
        "timestamp": datetime.utcnow().isoformat()
    }

    generated_campaigns.append(result)
    return jsonify(result)

@marketing_bp.route("/marketing/list", methods=["GET"])
def list_campaigns():
    return jsonify(generated_campaigns)
