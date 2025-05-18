# backend/app/routes/geniqx_genz_sheet_music.py

from flask import Blueprint, request, jsonify
from fpdf import FPDF
from datetime import datetime
import uuid

sheet_bp = Blueprint("sheet_music", __name__)

@sheet_bp.route("/genz/sheetmusic", methods=["POST"])
def generate_sheet():
    data = request.get_json()
    title = data.get("title", "Untitled")
    notation = data.get("notes", "C D E F G A B")
    export_id = str(uuid.uuid4())[:8]
    filename = f"/mnt/data/{title.replace(' ', '_')}_{export_id}.pdf"

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Courier", size=16)
    pdf.cell(0, 10, f"GENZ Sheet Music: {title}", ln=True)
    pdf.set_font("Courier", size=12)
    pdf.multi_cell(0, 10, notation)

    pdf.output(filename)
    return jsonify({
        "status": "generated",
        "file": filename,
        "generated_at": datetime.utcnow().isoformat()
    })
