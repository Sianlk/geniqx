from flask import Flask
from app.routes.api import api_bp
app = Flask(__name__)
app.register_blueprint(api_bp, url_prefix='/api')
@app.route('/')
def home(): return 'GENIQX Backend is Live!'