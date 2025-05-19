import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function VoipPanel() {
  const [user, setUser] = useState('');
  const [mode, setMode] = useState('video');
  const [intent, setIntent] = useState('consult');
  const [monetisation, setMonetisation] = useState(true);
  const [result, setResult] = useState<any | null>(null);
  const [calls, setCalls] = useState<any[]>([]);

  const createCall = async () => {
    const res = await fetch('/voip/create-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, mode, intent, monetisation })
    });
    const data = await res.json();
    setResult(data);
    fetchCalls();
  };

  const fetchCalls = async () => {
    const res = await fetch('/voip/list');
    const data = await res.json();
    setCalls(data);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="stream@geniqx.ai" userRole="broadcaster" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX VOIP + Video Panel</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Your Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mt-2"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="webinar">Webinar</option>
        </select>

        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Session Intent (e.g. pitch, consult)"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        />

        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={monetisation}
            onChange={(e) => setMonetisation(e.target.checked)}
            className="mr-2"
          />
          Enable Monetisation
        </label>

        <button onClick={createCall} className="bg-black text-white px-6 py-2 rounded mt-4">
          Launch Session
        </button>

        {result && (
          <div className="bg-gray-100 p-4 rounded mt-6">
            <p><strong>Join Link:</strong> <a href={result.join_url}>{result.join_url}</a></p>
            <p><strong>AI Bot:</strong> {result.ai_bot}</p>
            <p><strong>Affiliate Links:</strong></p>
            {result.affiliate_link && result.affiliate_links.map((link: string, i: number) => (
              <p key={i} className="text-sm text-blue-700 underline">{link}</p>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-bold">Active Sessions</h2>
          {calls.map((call, i) => (
            <div key={i} className="border-b border-gray-300 py-2 text-sm">
              <p><strong>{call.user}</strong> - {call.mode} | AI Bot: {call.ai_bot}</p>
              <p className="text-xs text-gray-500">{new Date(call.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
