import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ConstructionEstimatorUI() {
  const [projectName, setProjectName] = useState('');
  const [floors, setFloors] = useState(1);
  const [useCase, setUseCase] = useState('residential');
  const [result, setResult] = useState<any | null>(null);

  const generateCAD = async () => {
    const res = await fetch('/construction/cad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_name: projectName, floors, use_case: useCase })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="site@geniqx.ai" userRole="engineer" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Construction CAD Estimator</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          type="number"
          className="w-full p-2 border rounded mt-2"
          placeholder="Floors"
          value={floors}
          onChange={(e) => setFloors(parseInt(e.target.value))}
        />
        <select
          className="w-full p-2 border rounded mt-2"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="mixed-use">Mixed Use</option>
        </select>

        <button
          onClick={generateCAD}
          className="bg-black text-white px-6 py-2 rounded mt-4"
        >
          Generate CAD
        </button>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <p className="font-bold text-lg">Project: {result.project_name}</p>
            <p><strong>CAD ID:</strong> {result.cad_id}</p>
            <p><strong>Use Case:</strong> {result.use_case}</p>
            <p><strong>Floors:</strong> {result.floors}</p>
            <p><strong>Room Count:</strong> {result.auto_dimensions.room_count}</p>
            <p><strong>Total Sq Ft:</strong> {result.auto_dimensions.total_sq_ft}</p>
            <p><strong>Compliance:</strong> {result.estimated_compliance}</p>
            <p><strong>Safety Score:</strong> {result.safety_score}</p>
          </div>
        )}
      </main>
    </div>
  );
}
