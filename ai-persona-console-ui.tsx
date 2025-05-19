import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function AIPersonaConsole() {
  const [personas, setPersonas] = useState<any[]>([]);
  const [activePersona, setActivePersona] = useState<string>('');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<any[]>([]);

  useEffect(() => {
    fetch('/personas/list')
      .then(res => res.json())
      .then(data => setPersonas(data));
  }, []);

  const sendMessage = async () => {
    const res = await fetch(`/personas/chat/${activePersona}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setChatLog((prev) => [...prev, { user: message, bot: data.reply }]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@geniqx.ai" userRole="controller" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">AI Persona Console</h1>

        <select
          className="w-full p-2 border rounded"
          value={activePersona}
          onChange={(e) => setActivePersona(e.target.value)}
        >
          <option value="">Select a Persona</option>
          {personas.map((p, i) => (
            <option key={i} value={p.persona_id}>
              {p.name} ({p.role})
            </option>
          ))}
        </select>

        {activePersona && (
          <>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              rows={3}
              placeholder="Ask your AI persona something..."
            />

            <button
              onClick={sendMessage}
              className="bg-black text-white px-6 py-2 rounded mt-2"
              disabled={!message}
            >
              Send
            </button>

            <div className="mt-4 space-y-2">
              {chatLog.map((log, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded">
                  <p className="text-sm"><strong>You:</strong> {log.user}</p>
                  <p className="text-sm text-blue-700"><strong>AI:</strong> {log.bot}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
