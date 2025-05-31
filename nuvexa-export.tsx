import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaExportPage() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('All');
  const [exporting, setExporting] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      const fileName = \`\${email || 'session'}_\${type}_records.zip\`;
      setDownloadLink('/exports/' + fileName);
      setExporting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@nuvexa.ai" userRole="compliance" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa Export & Compliance Records</h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm">Patient Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Session Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Record Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option>All</option>
              <option>Scans</option>
              <option>Consents</option>
              <option>Videos</option>
              <option>CPD</option>
              <option>Sessions</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {exporting ? 'Exporting...' : 'Export Records'}
          </button>
        </form>

        {downloadLink && (
          <div className="mt-6 text-green-600 text-sm">
            ✅ Export ready:{" "}
            <a href={downloadLink} className="underline">
              Download {downloadLink.split('/').pop()}
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
