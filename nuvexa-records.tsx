import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

type RecordEntry = {
  id: string;
  type: string;
  timestamp: string;
  metadata: string;
};

export default function NuvexaRecordsPage() {
  const [records, setRecords] = useState<RecordEntry[]>([]);

  useEffect(() => {
    // Placeholder fetch — replace with real API
    const mock = [
      { id: 'A1', type: 'Scan', timestamp: '2024-05-01', metadata: 'Jawline, Midface' },
      { id: 'A2', type: 'Consent', timestamp: '2024-05-01', metadata: 'Signed Video' },
      { id: 'A3', type: 'Diagnosis', timestamp: '2024-05-01', metadata: '2ml filler suggested' },
    ];
    setRecords(mock);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userEmail="admin@nuvexa.ai" userRole="admin" />
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Patient Record Archive</h1>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Details</th>
                <th className="px-4 py-2 text-left">Export</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-2">{r.id}</td>
                  <td className="px-4 py-2">{r.type}</td>
                  <td className="px-4 py-2">{r.timestamp}</td>
                  <td className="px-4 py-2">{r.metadata}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => alert('Exporting PDF for ' + r.id)}
                      className="text-blue-600 underline text-xs"
                    >
                      Export PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
