# backend/app/main.py

import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

# Import Blueprints
from app.routes.api import api_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s"
)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)

    # Security & config setup
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB upload limit

    # Enable CORS
    CORS(app)

    # Register routes
    app.register_blueprint(api_bp, url_prefix="/api")

    # Health check route
    @app.route("/health", methods=["GET"])
    def health():
        return jsonify(status="GENIQX backend is live"), 200

    # Global error handler
    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.exception("Unhandled Exception: %s", str(e))
        return jsonify(error=str(e)), 500

    return app

# Entry point
if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
