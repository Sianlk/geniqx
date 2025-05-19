import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function LandtechConsoleUI() {
  const [postcode, setPostcode] = useState('');
  const [history, setHistory] = useState([
    { postcode: "E1 6AN", owner: "GENIQX Estates Ltd", status: "Approved 2023", score: 86 },
    { postcode: "W1A 1AA", owner: "Crown Holdings", status: "Pending", score: 62 }
  ]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="survey@geniqx.ai" userRole="developer" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Land Console</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Enter Postcode or Plot ID"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button className="bg-black text-white px-6 py-2 rounded mt-2">Search</button>

        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-bold">Recent Planning Checks</h2>
          {history.map((h, i) => (
            <div key={i} className="p-3 bg-gray-100 rounded text-sm">
              <p><strong>Postcode:</strong> {h.postcode}</p>
              <p><strong>Owner:</strong> {h.owner}</p>
              <p><strong>Status:</strong> {h.status}</p>
              <p><strong>Development Score:</strong> {h.score}%</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
