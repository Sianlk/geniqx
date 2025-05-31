import React, { useState } from 'react';
export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  async function submitPrompt() {
    const res = await fetch('/api/gpt-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>GENIQX GPT Assistant</h1>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button onClick={submitPrompt}>Ask</button>
      <p>{response}</p>
    </div>
  );
}