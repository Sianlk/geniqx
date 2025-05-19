import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaSimUI() {
  const [studentId, setStudentId] = useState('');
  const [procedure, setProcedure] = useState('');
  const [mode, setMode] = useState('guided');
  const [difficulty, setDifficulty] = useState('standard');
  const [result, setResult] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const runSimulation = async () => {
    const res = await fetch('/nuvexa/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, procedure, mode, difficulty })
    });
    const data = await res.json();
    setResult(data);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const res = await fetch(`/nuvexa/simulations/${studentId}`);
    const data = await res.json();
    setHistory(data.simulations);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="trainer@nuvexa.ai" userRole="medic" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Surgical Simulation Console</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Procedure Name"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mt-2"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="guided">Guided (AI Assist)</option>
          <option value="manual">Manual Mode</option>
        </select>
        <select
          className="w-full p-2 border rounded mt-2"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="advanced">Advanced</option>
        </select>

        <button
          onClick={runSimulation}
          className="bg-black text-white px-6 py-2 rounded mt-4"
        >
          Start Simulation
        </button>

        {result && (
          <div className="bg-gray-100 p-4 rounded mt-6 space-y-2">
            <p><strong>Score:</strong> {result.score}</p>
            <p><strong>Guidance:</strong> {result.guidance}</p>
            <p><strong>Outcome:</strong> {result.result}</p>
            <p className="text-sm text-gray-500">Sim ID: {result.sim_id}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 space-y-3">
            <h2 className="text-xl font-bold">Simulation History</h2>
            {history.map((sim, i) => (
              <div key={i} className="p-2 bg-white border rounded text-sm">
                <p><strong>{sim.procedure}</strong> | Score: {sim.score} | {sim.mode}</p>
                <p className="text-xs text-gray-500">Time: {new Date(sim.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
