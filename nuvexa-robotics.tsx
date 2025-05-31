import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaRoboticsPage() {
  const [status, setStatus] = useState("Idle");
  const [log, setLog] = useState<string[]>([]);
  const [overrideActive, setOverrideActive] = useState(false);

  const runRoboticTask = (task: string) => {
    const message = `[AI] Executing task: ${task}`;
    setLog((prev) => [...prev, message]);
    setStatus("Running: " + task);
    setTimeout(() => {
      setStatus("Idle");
      setLog((prev) => [...prev, `[AI] Task '${task}' completed.`]);
    }, 2000);
  };

  const handleOverride = () => {
    setOverrideActive(true);
    setStatus("Manual Override Engaged");
    setLog((prev) => [...prev, "[System] Emergency override triggered!"]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar userEmail="surgeon@nuvexa.ai" userRole="robotics" />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Nuvexa Robotic Surgery Console</h1>

        <section className="bg-white rounded p-4 shadow space-y-4">
          <p><strong>Status:</strong> {status}</p>

          <div className="space-x-4">
            <button className="btn" onClick={() => runRoboticTask("Inject 2ml Midface")}>
              Inject Filler
            </button>
            <button className="btn" onClick={() => runRoboticTask("Laser Incision - Jawline")}>
              Surgical Laser
            </button>
            <button className="btn bg-red-600 text-white" onClick={handleOverride}>
              Emergency Override
            </button>
          </div>
        </section>

        <section className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Robotics Log</h2>
          <div className="text-xs space-y-1 h-40 overflow-y-auto font-mono">
            {log.map((entry, i) => (
              <div key={i}>▶ {entry}</div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
