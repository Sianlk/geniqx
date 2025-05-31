# backend/app/middleware/token_required.py

from functools import wraps
from flask import request, jsonify, g
from app.services.auth import decode_token
import logging

logger = logging.getLogger(__name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # JWT token must be in the header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[-1]

        if not token:
            return jsonify({'error': 'Authorization token is missing'}), 401

        decoded = decode_token(token)

        if "error" in decoded:
            logger.warning("Token validation failed: %s", decoded["error"])
            return jsonify({'error': decoded["error"]}), 403

        # Inject user info into global request context
        g.current_user = {
            "id": decoded.get("user_id"),
            "email": decoded.get("email"),
            "role": decoded.get("role")
        }

        return f(*args, **kwargs)

    return decorated
