import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GenzAIComposer() {
  const [prompt, setPrompt] = useState('');
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateTrack = async () => {
    setLoading(true);
    const res = await fetch('/genz/ai/compose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setTrack(data.track);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="creator@genz.ai" userRole="ai-composer" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">AI Music Composer</h1>
        <textarea
          className="w-full p-3 border rounded"
          rows={4}
          placeholder="Describe your track: 'Epic cinematic synthwave for workouts...'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={generateTrack}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? 'Composing...' : 'Generate Music'}
        </button>

        {track && (
          <div className="mt-6 p-4 bg-gray-100 rounded space-y-2">
            <h2 className="text-lg font-semibold">{track.title}</h2>
            <p>{track.description}</p>
            <audio src={track.audio_url} controls className="w-full" />
          </div>
        )}
      </main>
    </div>
  );
}
