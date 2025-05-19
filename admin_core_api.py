# backend/app/routes/admin_core_api.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

admin_bp = Blueprint("admin_core", __name__)

users = {}
alerts = []

# Initialize system users
users["SianLK"] = {
    "role": "founder",
    "modules": {
        "edin": True,
        "genz": True,
        "nuvexa": True,
        "personas": True,
        "wealth": True,
        "digifree": True
    },
    "monetisation": 100,
    "status": "active"
}

@admin_bp.route("/admin/status/<username>", methods=["GET"])
def get_user_status(username):
    user = users.get(username)
    return jsonify(user if user else {"error": "User not found"})

@admin_bp.route("/admin/monetise/<username>", methods=["POST"])
def update_monetisation(username):
    value = request.get_json().get("value")
    if username in users:
        users[username]["monetisation"] = value
        return jsonify({"username": username, "monetisation": value})
    return jsonify({"error": "User not found"}), 404

@admin_bp.route("/admin/toggle_module", methods=["POST"])
def toggle_module():
    data = request.get_json()
    user = data["user"]
    module = data["module"]
    if user in users:
        users[user]["modules"][module] = not users[user]["modules"].get(module, False)
        return jsonify({"user": user, "module": module, "enabled": users[user]["modules"][module]})
    return jsonify({"error": "Invalid user"}), 404

@admin_bp.route("/admin/alert", methods=["POST"])
def trigger_alert():
    data = request.get_json()
    alert = {
        "alert_id": f"A-{uuid.uuid4().hex[:6]}",
        "type": data["type"],
        "message": data["message"],
        "timestamp": datetime.utcnow().isoformat()
    }
    alerts.append(alert)
    return jsonify(alert)

@admin_bp.route("/admin/alerts", methods=["GET"])
def list_alerts():
    return jsonify(alerts)

@admin_bp.route("/admin/command", methods=["POST"])
def ai_command():
    command = request.get_json().get("command", "").lower()
    # Simulated AI interpreter (expandable)
    if "restart" in command:
        return jsonify({"response": "System modules restarted."})
    if "report" in command:
        return jsonify({"response": f"Total active alerts: {len(alerts)}"})
    return jsonify({"response": f"Unknown command: {command}"})
