import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxAdminMonetisation() {
  const [roi, setRoi] = useState(3.5);
  const [risk, setRisk] = useState('aggressive');
  const [contentBot, setContentBot] = useState(true);
  const [funnelAi, setFunnelAi] = useState(true);
  const [licenseEnforce, setLicenseEnforce] = useState(true);
  const [webhook, setWebhook] = useState('');
  const [stripeKey, setStripeKey] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const saveSettings = () => {
    setStatusMsg('✅ Updated successfully.');
    setTimeout(() => setStatusMsg(''), 2500);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="superadmin@geniqx.ai" userRole="platform-owner" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Monetisation Control Console</h1>

        <div className="bg-gray-100 p-4 rounded shadow space-y-4">
          <div>
            <label>% Platform ROI Target:</label>
            <input
              type="number"
              step="0.1"
              value={roi}
              onChange={(e) => setRoi(parseFloat(e.target.value))}
              className="input ml-3 px-3 py-1 rounded w-20"
            />
          </div>

          <div>
            <label>Grey-Hat Risk Profile:</label>
            <select value={risk} onChange={(e) => setRisk(e.target.value)} className="ml-3 px-3 py-1 rounded border">
              <option value="conservative">Conservative</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
              <option value="autonomous">Autonomous (AI-driven)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <label className="block">
              <input
                type="checkbox"
                checked={contentBot}
                onChange={() => setContentBot(!contentBot)}
              />{" "}
              Enable Content Bot
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={funnelAi}
                onChange={() => setFunnelAi(!funnelAi)}
              />{" "}
              Funnel AI Agent
            </label>
            <label className="block">
              <input
                type="checkbox"
                checked={licenseEnforce}
                onChange={() => setLicenseEnforce(!licenseEnforce)}
              />{" "}
              Enforce License Tier Logic
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <label>Render/Stripe Webhook:</label>
            <input
              type="text"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="https://webhook.site/..."
            />
            <label>Stripe Secret Key:</label>
            <input
              type="password"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="sk_live_..."
            />
          </div>
        </div>

        <button onClick={saveSettings} className="mt-4 bg-black text-white px-6 py-2 rounded">
          Save Settings
        </button>

        {statusMsg && <p className="mt-2 text-green-600 text-sm">{statusMsg}</p>}
      </main>
    </div>
  );
}
