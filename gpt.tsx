import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function GptAssistantPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/gpt-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error('GPT error:', err);
      setResponse('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@geniqx.com" userRole="admin" />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">GENIQX GPT Assistant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-3 border rounded"
            placeholder="Ask a question..."
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? 'Asking...' : 'Submit'}
          </button>
        </form>
        {response && (
          <div className="mt-6 bg-white p-4 border rounded shadow">
            <h2 className="font-semibold">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
