# backend/app/routes/api.py

from flask import Blueprint, request, jsonify
import logging
import os

api_bp = Blueprint("api", __name__)
logger = logging.getLogger(__name__)

@api_bp.route("/gpt-assistant", methods=["POST"])
def gpt_assistant():
    try:
        data = request.get_json()
        prompt = data.get("prompt")

        if not prompt:
            return jsonify({"error": "Missing 'prompt' in request body"}), 400

        # Simulated response; replace with actual OpenAI logic later
        response = f"GENIQX GPT Assistant responding to: {prompt}"

        logger.info("Prompt received: %s", prompt)
        return jsonify({"response": response}), 200

    except Exception as e:
        logger.exception("Error in GPT Assistant route: %s", str(e))
        return jsonify({"error": "Internal server error"}), 500
