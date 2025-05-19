import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function HostingConsole() {
  const [module, setModule] = useState('geniqx');
  const [theme, setTheme] = useState('luxury gold');
  const [result, setResult] = useState<any | null>(null);
  const [sites, setSites] = useState<any[]>([]);

  const launchSite = async () => {
    const res = await fetch('/hosting/launch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, theme })
    });
    const data = await res.json();
    setResult(data);
    fetchSites();
  };

  const fetchSites = async () => {
    const res = await fetch('/hosting/list');
    const data = await res.json();
    setSites(data);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="domains@geniqx.ai" userRole="brand_deployer" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX Hosting & Branding Console</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Module Name (e.g., nuvexa)"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Theme (e.g., luxury gold)"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />

        <button onClick={launchSite} className="bg-black text-white px-6 py-2 rounded mt-4">
          Launch Site
        </button>

        {result && (
          <div className="bg-gray-100 p-4 rounded mt-6">
            <h2 className="text-lg font-bold">New Site Launched</h2>
            <p><strong>Domain:</strong> {result.base_url}</p>
            <p><strong>Theme:</strong> {result.theme}</p>
            <p><strong>Primary Color:</strong> {result.primary_color}</p>
            <p><strong>SEO Cloaking:</strong> {result.seo_cloaking ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Chatbot:</strong> {result.chatbot ? 'Active' : 'Inactive'}</p>
            <p><strong>Linktree:</strong> <a href={result.linktree_url}>{result.linktree_url}</a></p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-bold">Launched Domains</h3>
          {sites.map((s, i) => (
            <div key={i} className="border-b border-gray-300 py-2 text-sm">
              <p><strong>{s.module}</strong> — {s.base_url}</p>
              <p className="text-xs text-gray-500">Launched {new Date(s.launch_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
