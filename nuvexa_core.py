# backend/app/routes/nuvexa_core.py

from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid

nuvexa_bp = Blueprint("nuvexa_core", __name__)

diagnostics_log = []

@nuvexa_bp.route("/nuvexa/scan", methods=["POST"])
def process_scan():
    data = request.get_json()
    patient_id = data.get("patient_id")
    scan_type = data.get("scan_type", "facial")
    notes = data.get("notes", "")
    overlay = "symmetry_grid" if scan_type == "facial" else "surgical_guidance"

    result = {
        "scan_id": f"S-{uuid.uuid4().hex[:6].upper()}",
        "patient_id": patient_id,
        "scan_type": scan_type,
        "overlay": overlay,
        "suggested_treatment": "Botox, 2ml filler mid-face, PDO threads" if scan_type == "facial" else "Laparoscopic entry port mapping",
        "diagnosis": "Mild asymmetry, volume loss" if scan_type == "facial" else "Confirmed appendix inflammation",
        "timestamp": datetime.utcnow().isoformat(),
        "notes": notes
    }

    diagnostics_log.append(result)
    return jsonify(result)

@nuvexa_bp.route("/nuvexa/records/<patient_id>", methods=["GET"])
def get_patient_scans(patient_id):
    records = [d for d in diagnostics_log if d["patient_id"] == patient_id]
    return jsonify({"patient_id": patient_id, "records": records})
