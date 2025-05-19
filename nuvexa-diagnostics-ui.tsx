import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaDiagnosticsUI() {
  const [patientId, setPatientId] = useState('');
  const [scanType, setScanType] = useState('facial');
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const submitScan = async () => {
    const res = await fetch('/nuvexa/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: patientId, scan_type: scanType, notes })
    });
    const data = await res.json();
    setResult(data);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const res = await fetch(`/nuvexa/records/${patientId}`);
    const data = await res.json();
    setHistory(data.records);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="clinician@nuvexa.ai" userRole="consultant" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa Diagnostics Console</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mt-2"
          value={scanType}
          onChange={(e) => setScanType(e.target.value)}
        >
          <option value="facial">Facial (Aesthetics)</option>
          <option value="surgical">Surgical</option>
          <option value="trauma">Emergency</option>
        </select>
        <textarea
          className="w-full p-2 border rounded mt-2"
          placeholder="Consult notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
        <button
          onClick={submitScan}
          className="bg-black text-white px-6 py-2 rounded mt-4"
        >
          Submit Diagnostic Scan
        </button>

        {result && (
          <div className="bg-gray-100 p-4 rounded mt-6 space-y-2">
            <p><strong>Diagnosis:</strong> {result.diagnosis}</p>
            <p><strong>Treatment Plan:</strong> {result.suggested_treatment}</p>
            <p><strong>Overlay:</strong> {result.overlay}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">Previous Records</h2>
            {history.map((rec, i) => (
              <div key={i} className="bg-white p-3 border rounded text-sm">
                <p><strong>{rec.scan_type.toUpperCase()}</strong></p>
                <p>Diagnosis: {rec.diagnosis}</p>
                <p>Plan: {rec.suggested_treatment}</p>
                <p className="text-xs text-gray-500">Time: {new Date(rec.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
