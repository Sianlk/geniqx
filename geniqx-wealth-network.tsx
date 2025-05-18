import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import cytoscape from 'cytoscape';

export default function GeniqxWealthNetwork() {
  const cyRef = useRef(null);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: [
          { data: { id: 'john', label: 'J. Smith (Director)', group: 'director' } },
          { data: { id: 'panamaHoldings', label: 'Panama Holdings Ltd', group: 'company' } },
          { data: { id: 'dubaiProp', label: 'Dubai Villa £4.1M', group: 'asset' } },
          { data: { id: 'wallet1', label: 'Wallet Ξ 112', group: 'wallet' } },
          { data: { id: 'ukTrust', label: 'UK Private Trust', group: 'company' } },
          { data: { id: 'flag', label: '🚩 Risk Flag: Layered Shells', group: 'flag' } },
          { data: { source: 'john', target: 'panamaHoldings' } },
          { data: { source: 'john', target: 'ukTrust' } },
          { data: { source: 'ukTrust', target: 'dubaiProp' } },
          { data: { source: 'panamaHoldings', target: 'wallet1' } },
          { data: { source: 'wallet1', target: 'flag' } },
        ],
        layout: {
          name: 'cose',
          animate: true,
          fit: true
        },
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              'text-valign': 'center',
              'color': '#000',
              'background-color': 'data(bg)',
              'border-width': 1,
              'border-color': '#666'
            }
          },
          {
            selector: 'node[group="company"]',
            style: { 'background-color': '#FFD700' }
          },
          {
            selector: 'node[group="asset"]',
            style: { 'background-color': '#32CD32' }
          },
          {
            selector: 'node[group="director"]',
            style: { 'background-color': '#6495ED' }
          },
          {
            selector: 'node[group="wallet"]',
            style: { 'background-color': '#FF69B4' }
          },
          {
            selector: 'node[group="flag"]',
            style: { 'background-color': '#FF0000', 'shape': 'diamond' }
          },
          {
            selector: 'edge',
            style: {
              width: 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle'
            }
          }
        ]
      });

      return () => {
        cy.destroy();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="analyst@geniqx.ai" userRole="forensics" />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Wealth Network Visualizer</h1>
        <div ref={cyRef} className="w-full h-[700px] border rounded" />
      </main>
    </div>
  );
}
