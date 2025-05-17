from flask import Blueprint, request, jsonify
api_bp = Blueprint('api', __name__)

@api_bp.route('/gpt-assistant', methods=['POST'])
def gpt_response():
    data = request.get_json()
    prompt = data.get('prompt')
    return jsonify({'reply': f'GENIQX Assistant: Answering {prompt}'})