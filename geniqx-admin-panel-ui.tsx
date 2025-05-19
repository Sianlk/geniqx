import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxAdminPanel() {
  const [userStatus, setUserStatus] = useState<any | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [command, setCommand] = useState('');
  const [commandResult, setCommandResult] = useState('');

  const username = 'SianLK';

  const fetchStatus = async () => {
    const res = await fetch(`/admin/status/${username}`);
    const data = await res.json();
    setUserStatus(data);
  };

  const toggleModule = async (module: string) => {
    await fetch('/admin/toggle_module', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, module })
    });
    fetchStatus();
  };

  const sendCommand = async () => {
    const res = await fetch('/admin/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    });
    const data = await res.json();
    setCommandResult(data.response);
  };

  const loadAlerts = async () => {
    const res = await fetch('/admin/alerts');
    const data = await res.json();
    setAlerts(data);
  };

  useEffect(() => {
    fetchStatus();
    loadAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@geniqx.ai" userRole="founder" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX Admin Panel</h1>

        {userStatus && (
          <div className="space-y-2">
            <p><strong>User:</strong> {username}</p>
            <p><strong>Status:</strong> {userStatus.status}</p>
            <p><strong>Monetisation:</strong> {userStatus.monetisation}</p>
            <div className="space-y-1">
              {Object.entries(userStatus.modules).map(([mod, enabled]: any, i) => (
                <div key={i} className="flex items-center justify-between border p-2 rounded bg-gray-100">
                  <span>{mod.toUpperCase()}</span>
                  <button onClick={() => toggleModule(mod)} className="px-4 py-1 bg-black text-white rounded">
                    {enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">System Command Console</h2>
          <input
            className="w-full p-2 border rounded"
            placeholder="Type a command (e.g. 'restart', 'report')"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button onClick={sendCommand} className="mt-2 bg-black text-white px-4 py-2 rounded">
            Execute
          </button>
          {commandResult && <p className="mt-2 text-green-600">{commandResult}</p>}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">System Alerts</h2>
          {alerts.map((alert, i) => (
            <div key={i} className="bg-red-100 p-3 rounded mb-2">
              <p><strong>{alert.type}</strong>: {alert.message}</p>
              <p className="text-xs text-gray-600">{new Date(alert.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
