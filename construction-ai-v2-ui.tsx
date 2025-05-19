import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ConstructionAIV2UI() {
  const [floors, setFloors] = useState(1);
  const [useCase, setUseCase] = useState('residential');
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState<any | null>(null);

  const submitProject = async () => {
    const res = await fetch('/construction/v2/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ floors, use_case: useCase, postcode })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="builder@geniqx.ai" userRole="ai-projector" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Construction AI V2 Project Generator</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
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
          onClick={submitProject}
          className="bg-black text-white px-6 py-2 rounded mt-4"
        >
          Generate Full Project
        </button>

        {result && (
          <div className="bg-gray-100 p-6 mt-6 rounded space-y-3">
            <h2 className="text-xl font-bold">Results</h2>
            <p><strong>CAD ID:</strong> {result.cad_id}</p>
            <p><strong>Use Case:</strong> {result.use_case}</p>
            <p><strong>Postcode:</strong> {result.postcode}</p>
            <p><strong>Total Sq Ft:</strong> {result.floor_area}</p>
            <p><strong>Planning:</strong> {result.planning_status}</p>
            <p><strong>Trade Quote:</strong> £{result.trade_quote}</p>
            <p><strong>Retail Quote:</strong> £{result.retail_quote}</p>
            <p><strong>Profit Margin:</strong> £{result.margin_profit}</p>
            <h3 className="text-md font-bold mt-4">BIM Layers</h3>
            {Object.entries(result.bim_layers).map(([key, value], i) => (
              <p key={i}><strong>{key}:</strong> {value}</p>
            ))}
            <h3 className="text-md font-bold mt-4">Structural Summary</h3>
            <p><strong>Compliant:</strong> {result.structural_summary.compliance_check}</p>
            <p><strong>Wind Load:</strong> {result.structural_summary.wind_resistance}</p>
          </div>
        )}
      </main>
    </div>
  );
}
