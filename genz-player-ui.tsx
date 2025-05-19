import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function GenzMusicPlayer() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/genz/library')
      .then(res => res.json())
      .then(data => setTracks(data));
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="listener@genz.ai" userRole="streamer" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENZ Music Library</h1>

        {tracks.map((track, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{track.title}</p>
                <p className="text-sm text-gray-600">By: {track.artist}</p>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded">Play</button>
            </div>
            <div className="text-sm text-gray-700">
              <p>Genre: {track.genre} | Mood: {track.mood}</p>
              <p>BPM: {track.bpm} | Key: {track.key} | Language: {track.language}</p>
              <p className="text-xs text-gray-500">Added: {new Date(track.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
