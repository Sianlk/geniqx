import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function DigifreeRequestPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', reason: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitRequest = async () => {
    const res = await fetch('/digifree/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(`✅ Submitted successfully. Request ID: ${data.request_id}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="user@geniqx.ai" userRole="individual" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Digital Footprint Removal Request</h1>

        <div className="bg-gray-100 p-4 rounded space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input w-full"
            placeholder="Email Address"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="input w-full"
            placeholder="Phone Number"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="input w-full"
            placeholder="Address or Domain Source"
          />
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="input w-full"
            rows={4}
            placeholder="Reason for removal or data concern..."
          />
          <button onClick={submitRequest} className="btn bg-black text-white px-6 py-2 rounded">
            Submit Removal Request
          </button>
          {status && <p className="mt-2 text-green-600 text-sm">{status}</p>}
        </div>
      </main>
    </div>
  );
}
