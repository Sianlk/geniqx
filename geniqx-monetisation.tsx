import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GeniqxMonetisationPage() {
  const [affiliateId, setAffiliateId] = useState('');
  const [niche, setNiche] = useState('');
  const [funnel, setFunnel] = useState<any>(null);
  const [license, setLicense] = useState('');
  const [licenseStatus, setLicenseStatus] = useState('');

  const registerAffiliate = async () => {
    const res = await fetch('/geniqx/affiliate/register', {
      method: 'POST',
      headers: { 'Content-Type': ' 'application/json' },
      body: JSON.stringify({ owner: 'admin@geniqx.ai' }),
    });
    const data = await res.json();
    setAffiliateId(data.affiliate_id);
  };

  const generateFunnel = async () => {
    const res = await fetch('/geniqx/funnel/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ niche }),
    });
    const data = await res.json();
    setFunnel(data.funnel);
  };

  const verifyLicense = async () => {
    const res = await fetch('/geniqx/license/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license_key: license }),
    });
    const data = await res.json();
    setLicenseStatus(data.valid ? '✅ Valid' : '❌ Invalid');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@geniqx.ai" userRole="growth" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX Monetisation Console</h1>

        <section className="bg-gray-100 p-4 rounded space-y-2">
          <h2 className="font-semibold text-lg">Affiliate System</h2>
          <button onClick={registerAffiliate} className="btn">Register Affiliate</button>
          {affiliateId && <p className="text-sm mt-2">Your ID: <code>{affiliateId}</code></p>}
        </section>

        <section className="bg-gray-100 p-4 rounded space-y-2">
          <h2 className="font-semibold text-lg">Generate Funnel</h2>
          <input
            type="text"
            placeholder="Enter niche (e.g. crypto, aesthetics)"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="input w-full"
          />
          <button onClick={generateFunnel} className="btn mt-2">Generate Funnel</button>
          {funnel && (
            <div className="text-sm mt-2">
              <p><strong>Headline:</strong> {funnel.headline}</p>
              <p><strong>CTA:</strong> {funnel.cta}</p>
            </div>
          )}
        </section>

        <section className="bg-gray-100 p-4 rounded space-y-2">
          <h2 className="font-semibold text-lg">License Checker</h2>
          <input
            type="text"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder="Enter license key"
            className="input w-full"
          />
          <button onClick={verifyLicense} className="btn mt-2">Check License</button>
          {licenseStatus && <p className="text-sm mt-2">{licenseStatus}</p>}
        </section>
      </main>
    </div>
  );
}
