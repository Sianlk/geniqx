import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function EcomDashboard() {
  const [sector, setSector] = useState('beauty');
  const [trend, setTrend] = useState('');
  const [type, setType] = useState('physical');
  const [product, setProduct] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const generateProduct = async () => {
    const res = await fetch('/ecom/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector, trend, type })
    });
    const data = await res.json();
    setProduct(data);
    fetchList();
  };

  const fetchList = async () => {
    const res = await fetch('/ecom/list');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="store@geniqx.ai" userRole="merchant" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">GENIQX E-Commerce Product Generator</h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Trending Keyword"
          value={trend}
          onChange={(e) => setTrend(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mt-2"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="beauty">Beauty</option>
          <option value="fitness">Fitness</option>
          <option value="health">Health</option>
          <option value="equestrian">Equestrian</option>
          <option value="digital">Digital</option>
        </select>
        <select
          className="w-full p-2 border rounded mt-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        <button onClick={generateProduct} className="bg-black text-white px-6 py-2 rounded mt-4">
          Launch Product
        </button>

        {product && (
          <div className="bg-gray-100 p-4 rounded mt-6">
            <h2 className="font-bold text-lg">New Product</h2>
            <p><strong>Trend:</strong> {product.trend}</p>
            <p><strong>Sector:</strong> {product.sector}</p>
            <p><strong>Price:</strong> £{product.price}</p>
            <p><strong>Cost:</strong> £{product.cost}</p>
            <p><strong>Profit Margin:</strong> £{product.profit_margin}</p>
            <p><strong>Shipping (days):</strong> {product.shipping_days}</p>
            <p><strong>Supplier:</strong> {product.supplier}</p>
            <p><strong>Affiliate:</strong> {product.affiliate_link}</p>
            {product.download_url && (
              <p><strong>Lead Magnet:</strong> {product.download_url}</p>
            )}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-bold">Active Products</h3>
          {products.map((p, i) => (
            <div key={i} className="border-b border-gray-300 py-2 text-sm">
              <p><strong>{p.trend}</strong> ({p.sector}) - £{p.price}</p>
              <p className="text-gray-500 text-xs">Created {new Date(p.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
