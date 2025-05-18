import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxWealthExport() {
  const [logId, setLogId] = useState('');
  const [format, setFormat] = useState('json');
  const [status, setStatus] = useState('');

  const handleExport = () => {
    if (!logId) {
      setStatus('Please enter a log ID');
      return;
    }

    // Simulate export action
    const fileName = `${logId}.${format}`;
    setStatus(`✅ Export ready: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="compliance@geniqx.ai" userRole="export" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Wealth Intelligence Export</h1>

        <div className="bg-gray-100 p-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-medium">Enter Wealth Log ID</label>
            <input
              type="text"
              value={logId}
              onChange={(e) => setLogId(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
              placeholder="e.g. 2f3c7b2d..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Export Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="bg-black text-white px-6 py-2 rounded mt-3"
          >
            Generate Export
          </button>

          {status && (
            <div className="mt-4 text-green-600 font-semibold text-sm">
              {status}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
