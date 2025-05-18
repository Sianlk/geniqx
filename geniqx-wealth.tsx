import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxWealthPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('company');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch('/geniqx/wealth/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: query, type })
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="analyst@geniqx.ai" userRole="forensics" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX Wealth Intelligence</h1>

        <div className="bg-gray-100 p-4 rounded shadow space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter name, wallet, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="company">Company</option>
              <option value="director">Director</option>
              <option value="wallet">Crypto Wallet</option>
            </select>
            <button
              onClick={search}
              className="bg-black text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {result && (
            <div className="bg-white mt-4 p-4 rounded border text-sm">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
