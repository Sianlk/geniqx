import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function PersonaFreelancerDashboard() {
  const [personaId, setPersonaId] = useState('');
  const [earnings, setEarnings] = useState<any | null>(null);
  const [status, setStatus] = useState('');

  const fetchHistory = async () => {
    setStatus('Loading...');
    const res = await fetch(`/persona/freelancer/history/${personaId}`);
    const data = await res.json();
    setEarnings(data);
    setStatus('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="freelancer@geniqx.ai" userRole="ai-persona" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Persona Freelancer Dashboard</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Enter Persona ID"
          value={personaId}
          onChange={(e) => setPersonaId(e.target.value)}
        />

        <button
          onClick={fetchHistory}
          className="bg-black text-white px-6 py-2 rounded mt-2"
          disabled={!personaId}
        >
          View Earnings
        </button>

        {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}

        {earnings && (
          <div className="bg-gray-100 mt-4 p-4 rounded">
            <p className="font-bold">Total Earned: £{earnings.total_earned.toFixed(2)}</p>
            <div className="mt-3 space-y-2">
              {earnings.jobs.map((job: any, i: number) => (
                <div key={i} className="p-2 bg-white border rounded text-sm">
                  <p><strong>Task ID:</strong> {job.task_id}</p>
                  <p><strong>Earned:</strong> £{job.amount}</p>
                  <p><strong>Rating:</strong> {job.rating} / 5</p>
                  <p className="text-xs text-gray-500">Time: {new Date(job.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
