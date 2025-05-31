import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaAiPanel() {
  const [scanType, setScanType] = useState('Aesthetic');
  const [confidence, setConfidence] = useState('');
  const [prediction, setPrediction] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const runInference = () => {
    const result = {
      Aesthetic: {
        prediction: 'Lip volume asymmetry, 1.2ml filler suggested',
        confidence: '96.4%',
      },
      Emergency: {
        prediction: 'Possible stroke event (left droop)',
        confidence: '89.2%',
      },
      Surgical: {
        prediction: 'Occlusion zone detected. Route injection around artery',
        confidence: '93.1%',
      },
    }[scanType];

    setPrediction(result.prediction);
    setConfidence(result.confidence);
    setLogs((prev) => [...prev, `[${new Date().toISOString()}] AI scan (${scanType}) completed`]);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="ai@nuvexa.ai" userRole="ai-core" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa AI Intelligence Console</h1>

        <div className="space-y-4 bg-gray-100 p-4 rounded shadow">
          <div>
            <label>Select Scan Type:</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="ml-2 border px-3 py-1 rounded"
            >
              <option>Aesthetic</option>
              <option>Emergency</option>
              <option>Surgical</option>
            </select>
          </div>

          <button onClick={runInference} className="px-6 py-2 bg-black text-white rounded">
            Run AI Inference
          </button>

          {prediction && (
            <div className="mt-4 space-y-2 text-sm bg-white border p-4 rounded">
              <p><strong>Prediction:</strong> {prediction}</p>
              <p><strong>Confidence:</strong> {confidence}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">AI Inference Log</h2>
          <div className="bg-gray-50 p-3 text-xs font-mono h-40 overflow-y-auto rounded border">
            {logs.map((line, i) => (
              <div key={i}>🧠 {line}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
