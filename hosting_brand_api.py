# backend/app/routes/hosting_brand_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

hosting_bp = Blueprint("hosting_brand", __name__)

sites = []

@hosting_bp.route("/hosting/launch", methods=["POST"])
def launch_site():
    data = request.get_json()
    module = data.get("module", "geniqx")
    theme = data.get("theme", "luxury gold")
    base_url = f"{module}.elysianease.com"
    domain_id = f"DM-{uuid.uuid4().hex[:6].upper()}"
    brand_color = "#D4AF37" if "gold" in theme.lower() else "#1F2937"
    chatbot_enabled = True
    seo_cloaking = True
    linktree_path = f"https://elysianease.com/{module}/links"

    site = {
        "domain_id": domain_id,
        "module": module,
        "base_url": base_url,
        "theme": theme,
        "primary_color": brand_color,
        "chatbot": chatbot_enabled,
        "seo_cloaking": seo_cloaking,
        "linktree_url": linktree_path,
        "launch_time": datetime.utcnow().isoformat()
    }

    sites.append(site)
    return jsonify(site)

@hosting_bp.route("/hosting/list", methods=["GET"])
def list_sites():
    return jsonify(sites)
