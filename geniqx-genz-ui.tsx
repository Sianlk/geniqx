import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function GenzMusicApp() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const loadTracks = async () => {
    const res = await fetch('/genz/library');
    const data = await res.json();
    setTracks(data.tracks);
  };

  useEffect(() => {
    loadTracks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar userEmail="listener@genz.app" userRole="genz" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold tracking-wide">Genz: Music, AI & Culture</h1>

        <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setSelected(track)}
              className="bg-white/5 p-4 rounded shadow hover:bg-white/10 cursor-pointer transition"
            >
              <img src={track.cover_url} alt={track.title} className="w-full h-32 object-cover rounded" />
              <h2 className="mt-2 font-bold text-lg">{track.title}</h2>
              <p className="text-sm text-gray-300">{track.artist}</p>
              <p className="text-xs text-gray-400 italic">{track.genre} • {track.mood}</p>
            </div>
          ))}
        </section>

        {selected && (
          <section className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold">{selected.title}</h3>
            <p className="text-sm text-gray-400">{selected.artist} • {selected.genre}</p>
            <audio src={selected.stream_url} controls autoPlay className="w-full mt-2" />
          </section>
        )}
      </main>
    </div>
  );
}
