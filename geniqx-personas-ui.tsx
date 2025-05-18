import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxPersonas() {
  const [personas, setPersonas] = useState<any[]>([]);
  const [selected, setSelected] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadPersonas = async () => {
      const res = await fetch('/personas');
      const data = await res.json();
      setPersonas(data.available);
    };
    loadPersonas();
  }, []);

  const assignTask = async () => {
    const res = await fetch('/personas/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona_id: selected, task })
    });
    const data = await res.json();
    setStatus(`✅ Job assigned to ${data.persona}. Job ID: ${data.job_id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="user@geniqx.ai" userRole="agent" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">AI Personas Console</h1>

        <div className="space-y-2 bg-gray-100 p-4 rounded">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full p-2 rounded border"
          >
            <option value="">Select Persona</option>
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.role})
              </option>
            ))}
          </select>

          <textarea
            placeholder="Describe the task to assign..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />

          <button
            onClick={assignTask}
            className="bg-black text-white px-6 py-2 rounded"
            disabled={!selected || !task}
          >
            Assign Task
          </button>

          {status && <p className="mt-3 text-green-600 text-sm">{status}</p>}
        </div>
      </main>
    </div>
  );
}
