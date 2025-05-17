# backend/app/routes/auth.py

from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from app.services.auth import hash_password, verify_password, generate_token
from app.models.user import User
from config.database import get_db
import logging

auth_bp = Blueprint("auth", __name__)
logger = logging.getLogger(__name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    db: Session = next(get_db())
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password_hash):
        logger.warning("Failed login attempt for email: %s", email)
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(user)
    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    }), 200

@auth_bp.route("/register", methods=["POST"])
def register():
    db: Session = next(get_db())
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    user = User(
        email=email,
        password_hash=hash_password(password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = generate_token(user)
    logger.info("New user registered: %s", user.email)
    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    }), 201
