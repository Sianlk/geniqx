import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CreatePersona() {
  const [form, setForm] = useState({
    name: '',
    role: '',
    tone: '',
    skills: '',
    languages: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/personas/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        skills: form.skills.split(','),
        languages: form.languages.split(',')
      }),
    });
    const data = await res.json();
    setStatus(`✅ Persona "${data.name}" created.`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="builder@geniqx.ai" userRole="architect" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Create New AI Persona</h1>

        <div className="space-y-2 bg-gray-100 p-4 rounded">
          <input name="name" className="input w-full" value={form.name} onChange={handleChange} placeholder="Persona Name" />
          <input name="role" className="input w-full" value={form.role} onChange={handleChange} placeholder="Role (e.g. Coach, Editor)" />
          <input name="tone" className="input w-full" value={form.tone} onChange={handleChange} placeholder="Tone (e.g. Friendly, Assertive)" />
          <input name="skills" className="input w-full" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
          <input name="languages" className="input w-full" value={form.languages} onChange={handleChange} placeholder="Languages (comma-separated)" />
          <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 rounded">Create Persona</button>
          {status && <p className="mt-2 text-green-600">{status}</p>}
        </div>
      </main>
    </div>
  );
}
