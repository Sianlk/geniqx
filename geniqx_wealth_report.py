# backend/app/routes/geniqx_wealth_report.py

from flask import Blueprint, request, jsonify
from fpdf import FPDF
import uuid
from datetime import datetime

report_bp = Blueprint("wealth_report", __name__)

@report_bp.route("/geniqx/wealth/report", methods=["POST"])
def generate_report():
    data = request.get_json()
    case_id = str(uuid.uuid4())[:8]
    filename = f"/mnt/data/wealth_report_{case_id}.pdf"

    report_data = data.get("data", {})
    summary = data.get("summary", "AI-generated wealth and risk report")
    risk = data.get("risk", "Unscored")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, f"GENIQX Wealth Intelligence Report", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 10, f"Generated: {datetime.utcnow().isoformat()}", ln=True)
    pdf.cell(0, 10, f"Case ID: {case_id}", ln=True)
    pdf.ln(10)
    pdf.multi_cell(0, 10, f"Summary: {summary}")
    pdf.ln(5)
    pdf.cell(0, 10, f"Risk Level: {risk}", ln=True)
    pdf.ln(5)
    pdf.set_font("Arial", "", 10)

    for key, val in report_data.items():
        pdf.multi_cell(0, 8, f"{key.title()}: {val}")
        pdf.ln(1)

    pdf.output(filename)
    return jsonify({
        "report_id": case_id,
        "file_path": filename,
        "timestamp": datetime.utcnow().isoformat()
    }), 200
