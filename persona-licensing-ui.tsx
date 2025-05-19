import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function PersonaExportLicenseUI() {
  const [personaId, setPersonaId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [format, setFormat] = useState('json');
  const [license, setLicense] = useState('non-commercial');
  const [result, setResult] = useState<any | null>(null);

  const exportPersona = async () => {
    const res = await fetch('/persona/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona_id: personaId, recipient, format, license })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="exporter@geniqx.ai" userRole="admin" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Export & License AI Persona</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Persona ID"
          value={personaId}
          onChange={(e) => setPersonaId(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Recipient (email or system ID)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mt-2"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="json">JSON</option>
          <option value="widget">Widget</option>
          <option value="api">API</option>
        </select>

        <select
          className="w-full p-2 border rounded mt-2"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        >
          <option value="non-commercial">Non-commercial</option>
          <option value="commercial">Commercial</option>
          <option value="subscription">Subscription Use</option>
        </select>

        <button
          onClick={exportPersona}
          className="bg-black text-white px-6 py-2 rounded mt-4"
          disabled={!personaId || !recipient}
        >
          Export
        </button>

        {result && (
          <div className="bg-gray-100 p-4 mt-6 rounded space-y-2">
            <p className="font-semibold">Export ID: {result.export_id}</p>
            <p><strong>Persona:</strong> {result.persona_id}</p>
            <p><strong>Recipient:</strong> {result.recipient}</p>
            <p><strong>Format:</strong> {result.format}</p>
            <p><strong>License:</strong> {result.license}</p>
            <a href={result.link} className="text-blue-700 underline text-sm" target="_blank" rel="noreferrer">
              Download Exported Persona
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
