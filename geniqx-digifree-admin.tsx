import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function DigifreeAdminPanel() {
  const [requests, setRequests] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchPending = async () => {
    const res = await fetch('/digifree/admin/review');
    const data = await res.json();
    setRequests(data.pending_reviews || []);
  };

  const executeRemoval = async (id: string) => {
    const res = await fetch('/digifree/admin/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request_id: id }),
    });
    const data = await res.json();
    setStatusMsg(`✅ Request ${data.id} executed.`);
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@digifree.ai" userRole="admin" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Digifree Admin Takedown Console</h1>

        {statusMsg && <p className="text-green-600 text-sm">{statusMsg}</p>}

        <div className="bg-gray-100 p-4 rounded space-y-4">
          {requests.length === 0 ? (
            <p>No pending takedown requests.</p>
          ) : (
            requests.map((r, index) => (
              <div key={index} className="p-4 bg-white border rounded space-y-1 text-sm">
                <p><strong>ID:</strong> {r.id}</p>
                <p><strong>Name:</strong> {r.fields.name}</p>
                <p><strong>Email:</strong> {r.fields.email}</p>
                <p><strong>Phone:</strong> {r.fields.phone}</p>
                <p><strong>Address:</strong> {r.fields.address}</p>
                <p><strong>Reason:</strong> {r.fields.reason}</p>
                <button
                  onClick={() => executeRemoval(r.id)}
                  className="mt-2 bg-black text-white px-4 py-1 rounded"
                >
                  Execute Takedown
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
