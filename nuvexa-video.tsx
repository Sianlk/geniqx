import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaVideoPage() {
  const [consultActive, setConsultActive] = useState(false);
  const [videoURL, setVideoURL] = useState('https://test-stream.com/nuvexa-session');

  const handleStartConsult = () => {
    setConsultActive(true);
    // In production: Initialize WebRTC or secure session here
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@nuvexa.ai" userRole="prescriber" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa Video Consultation</h1>

        {!consultActive ? (
          <button
            className="bg-black text-white px-6 py-2 rounded"
            onClick={handleStartConsult}
          >
            Start Secure Video Session
          </button>
        ) : (
          <div className="space-y-4">
            <iframe
              src={videoURL}
              title="Nuvexa Video Consult"
              className="w-full h-[500px] rounded border"
              allow="camera; microphone; fullscreen"
            />
            <p className="text-sm text-gray-500">
              This consultation is securely recorded and encrypted. All diagnostics, overlays, and chat will be archived.
            </p>
            <div className="p-4 bg-gray-100 rounded">
              <p><strong>Injectables Discussed:</strong> Jawline & Midface</p>
              <p><strong>Risk Assessment:</strong> No occlusion flagged. Proceed with 2ml dermal filler.</p>
              <p><strong>Overlay Ref:</strong> Grid ID #VGX-2044-B</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
