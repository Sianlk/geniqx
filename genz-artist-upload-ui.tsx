import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GenzArtistUpload() {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [language, setLanguage] = useState('Instrumental');
  const [response, setResponse] = useState<any>(null);

  const handleUpload = async () => {
    const res = await fetch('/genz/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist, title, genre, mood, language })
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="artist@genz.ai" userRole="creator" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENZ Artist Upload</h1>

        <input className="w-full p-2 border rounded" placeholder="Artist Name" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Track Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Mood" value={mood} onChange={(e) => setMood(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />

        <button onClick={handleUpload} className="bg-black text-white px-6 py-2 rounded mt-4" disabled={!artist || !title || !genre || !mood}>
          Upload Track
        </button>

        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded space-y-2">
            <p className="font-bold text-lg">Track Uploaded!</p>
            <p><strong>ID:</strong> {response.track_id}</p>
            <p><strong>Title:</strong> {response.title}</p>
            <p><strong>BPM:</strong> {response.bpm}</p>
            <p><strong>Key:</strong> {response.key}</p>
            <p><strong>Waveform ID:</strong> {response.waveform_id}</p>
            <p><strong>Uploaded at:</strong> {new Date(response.uploaded_at).toLocaleString()}</p>
          </div>
        )}
      </main>
    </div>
  );
}
