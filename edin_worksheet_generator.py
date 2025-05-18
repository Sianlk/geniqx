# backend/app/routes/edin_worksheet_generator.py

from flask import Blueprint, request, jsonify
from fpdf import FPDF
import uuid
from datetime import datetime

worksheet_bp = Blueprint("edin_worksheet", __name__)

@worksheet_bp.route("/edin/worksheet", methods=["POST"])
def generate_worksheet():
    data = request.get_json()
    subject = data.get("subject")
    topic = data.get("topic")
    difficulty = data.get("difficulty", "standard")

    filename = f"/mnt/data/worksheet_{uuid.uuid4().hex[:6]}.pdf"
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)
    pdf.cell(200, 10, txt=f"EDIN Worksheet", ln=1, align='C')
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Subject: {subject} | Topic: {topic} | Level: {difficulty}", ln=2)

    pdf.set_font("Arial", size=11)
    pdf.ln(10)
    pdf.multi_cell(0, 8, f"Instructions:
Complete the following activities related to '{topic}'.")
    pdf.ln(5)

    for i in range(1, 6):
        pdf.multi_cell(0, 8, f"{i}. Describe or solve a part of '{topic}' using {difficulty} logic.
")

    pdf.output(filename)

    return jsonify({
        "status": "generated",
        "file": filename,
        "created": datetime.utcnow().isoformat()
    })
