import React, { useState } from 'react';
import Navbar from '../components/Navbar';

type SimulationResult = {
  procedure: string;
  score: number;
  feedback: string;
};

export default function NuvexaTrainingPage() {
  const [simResults, setSimResults] = useState<SimulationResult[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState('Injection - Lip Filler');

  const procedures = [
    'Injection - Lip Filler',
    'Botox - Forehead Wrinkles',
    'Robotic Surgery - Midface',
    'Emergency CPR',
    'Burn Triage Assessment',
  ];

  const runSimulation = () => {
    const score = Math.floor(Math.random() * 40) + 60; // Score range 60–100
    const feedback =
      score >= 90
        ? 'Excellent. Ready for clinical use.'
        : score >= 75
        ? 'Good. Minor technique refinements recommended.'
        : 'Needs review. Repeat simulation required.';

    setSimResults([
      ...simResults,
      {
        procedure: selectedProcedure,
        score,
        feedback,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@nuvexa.ai" userRole="education" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa Surgical Simulation</h1>

        <div className="space-y-4">
          <label className="block">
            <span>Select Procedure:</span>
            <select
              value={selectedProcedure}
              onChange={(e) => setSelectedProcedure(e.target.value)}
              className="block w-full mt-1 border rounded px-3 py-2"
            >
              {procedures.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={runSimulation}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Run Simulation
          </button>
        </div>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Simulation History</h2>
          <div className="space-y-2 mt-2">
            {simResults.map((result, idx) => (
              <div
                key={idx}
                className="bg-gray-100 border p-3 rounded shadow-sm text-sm"
              >
                <strong>{result.procedure}</strong> — Score: {result.score}/100
                <br />
                <span className="text-gray-700">{result.feedback}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
