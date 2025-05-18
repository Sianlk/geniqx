import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GenzArtistUpload() {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    genre: '',
    mood: '',
    stream_url: '',
    cover_url: '',
    duration: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/genz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(`✅ Track uploaded: ${data.track.title}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="artist@genz.ai" userRole="uploader" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Upload Your Track to Genz</h1>

        <div className="bg-gray-100 p-4 rounded space-y-3">
          <input className="input w-full" name="title" value={form.title} onChange={handleChange} placeholder="Track Title" />
          <input className="input w-full" name="artist" value={form.artist} onChange={handleChange} placeholder="Artist Name" />
          <input className="input w-full" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
          <input className="input w-full" name="mood" value={form.mood} onChange={handleChange} placeholder="Mood" />
          <input className="input w-full" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g. 3:40)" />
          <input className="input w-full" name="stream_url" value={form.stream_url} onChange={handleChange} placeholder="Stream URL (MP3)" />
          <input className="input w-full" name="cover_url" value={form.cover_url} onChange={handleChange} placeholder="Cover Art URL" />
          <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 rounded">
            Submit Track
          </button>
          {status && <p className="text-green-600 mt-2">{status}</p>}
        </div>
      </main>
    </div>
  );
}
