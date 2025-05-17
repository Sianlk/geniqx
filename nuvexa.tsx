import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaDashboard() {
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState('');
  const [scanUrl, setScanUrl] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleBook = async () => {
    const res = await fetch('/nuvexa/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email, treatment, datetime: new Date().toISOString() }),
    });
    const data = await res.json();
    alert('Appointment booked: ' + data.appointment_id);
  };

  const handleUploadScan = async () => {
    const res = await fetch('/nuvexa/upload-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, image_url: scanUrl, type: 'face' }),
    });
    const data = await res.json();
    alert('Scan uploaded: ' + data.scan_id);
  };

  const handleDiagnose = async () => {
    const res = await fetch('/nuvexa/ai-diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setDiagnosis(data.diagnosis + ' | ' + data.recommended_action);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userEmail={email || 'admin@nuvexa.ai'} userRole="admin" />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Nuvexa Clinical AI Console</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Book Appointment</h2>
            <input type="email" placeholder="Patient Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-2 mb-2" />
            <input type="text" placeholder="Treatment Type" value={treatment} onChange={(e) => setTreatment(e.target.value)} className="input mb-2" />
            <button onClick={handleBook} className="btn">Book</button>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Upload Scan</h2>
            <input type="text" placeholder="Image URL" value={scanUrl} onChange={(e) => setScanUrl(e.target.value)} className="input mb-2" />
            <button onClick={handleUploadScan} className="btn">Upload</button>
          </section>

          <section className="bg-white p-4 rounded shadow col-span-2">
            <h2 className="text-xl font-semibold">AI Diagnosis</h2>
            <button onClick={handleDiagnose} className="btn mb-2">Run Diagnosis</button>
            <p className="mt-2 text-sm text-gray-700">{diagnosis}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
