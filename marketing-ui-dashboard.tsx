import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function MarketingDashboard() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [persona, setPersona] = useState('ai_creator');
  const [campaign, setCampaign] = useState<any | null>(null);
  const [allCampaigns, setAllCampaigns] = useState<any[]>([]);

  const generate = async () => {
    const res = await fetch('/marketing/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, platform, persona })
    });
    const data = await res.json();
    setCampaign(data);
    fetchList();
  };

  const fetchList = async () => {
    const res = await fetch('/marketing/list');
    const data = await res.json();
    setAllCampaigns(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="marketer@geniqx.ai" userRole="ai-campaigner" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX Marketing Campaign Generator</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Campaign Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mt-2"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube Shorts</option>
          <option value="threads">Threads</option>
          <option value="instagram">Instagram Reels</option>
          <option value="twitter">X / Twitter</option>
        </select>
        <input
          className="w-full p-2 border rounded mt-2"
          placeholder="Persona (optional)"
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
        />
        <button onClick={generate} className="bg-black text-white px-6 py-2 rounded mt-4">
          Generate Campaign
        </button>

        {campaign && (
          <div className="bg-gray-100 p-4 mt-6 rounded">
            <h2 className="font-bold text-lg">New Campaign</h2>
            <p><strong>Title:</strong> {campaign.title}</p>
            <p><strong>Hook:</strong> {campaign.hook}</p>
            <p><strong>CTA:</strong> {campaign.cta}</p>
            <p><strong>Affiliate:</strong> {campaign.affiliate_link}</p>
            <p><strong>Linktree Funnel:</strong> {campaign.linktree_path}</p>
            <p><strong>Lead Magnet PDF:</strong> {campaign.leadmagnet_pdf}</p>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-bold">All Campaigns</h3>
          {allCampaigns.map((ad, i) => (
            <div key={i} className="border-b border-gray-300 py-2 text-sm">
              <p><strong>{ad.title}</strong> ({ad.platform})</p>
              <p className="text-gray-500">{new Date(ad.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
