import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaAdminPage() {
  const [modules, setModules] = useState({
    scan: true,
    video: true,
    export: true,
    ai: true,
    training: true,
  });

  const [monetizationRate, setMonetizationRate] = useState(2.5);
  const [statusMsg, setStatusMsg] = useState('');

  const toggleModule = (key: string) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    setStatusMsg('✅ Settings updated successfully.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="root@nuvexa.ai" userRole="superadmin" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa Admin Control Center</h1>

        <div className="bg-gray-100 rounded p-4 shadow space-y-4">
          <h2 className="text-lg font-semibold">Toggle Modules</h2>
          <ul className="space-y-2">
            {Object.entries(modules).map(([key, value]) => (
              <li key={key} className="flex justify-between items-center">
                <span className="capitalize">{key}</span>
                <input type="checkbox" checked={value} onChange={() => toggleModule(key)} />
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 rounded p-4 shadow space-y-4">
          <h2 className="text-lg font-semibold">Monetization Settings</h2>
          <label>
            % Revenue per Module Activation:
            <input
              type="number"
              value={monetizationRate}
              onChange={(e) => setMonetizationRate(parseFloat(e.target.value))}
              step="0.1"
              className="ml-3 px-3 py-1 border rounded w-24"
            />
          </label>
        </div>

        <div>
          <button onClick={saveSettings} className="px-6 py-2 bg-black text-white rounded">
            Save Settings
          </button>
          {statusMsg && <p className="text-green-600 mt-2 text-sm">{statusMsg}</p>}
        </div>
      </main>
    </div>
  );
}
