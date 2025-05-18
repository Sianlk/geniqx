import React, { useState } from 'react';
import Navbar from '../components/Navbar';

type CpdRecord = {
  course: string;
  status: string;
  progress: number;
  certificate?: string;
};

export default function NuvexaCpdPage() {
  const [courses] = useState<CpdRecord[]>([
    { course: 'Aesthetic Injectables & Risk', status: 'Completed', progress: 100, certificate: 'cert-injectables.pdf' },
    { course: 'CPR & Emergency Protocols', status: 'In Progress', progress: 75 },
    { course: 'Ethical Prescribing Law', status: 'Not Started', progress: 0 },
    { course: 'Anatomy: Midface & Jawline', status: 'Completed', progress: 100, certificate: 'cert-anatomy.pdf' },
  ]);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="cpd@nuvexa.ai" userRole="licensed" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Nuvexa CPD & License Dashboard</h1>

        <div className="space-y-4">
          {courses.map((c, i) => (
            <div key={i} className="border rounded shadow p-4 bg-gray-100">
              <h2 className="text-lg font-semibold">{c.course}</h2>
              <p>Status: {c.status}</p>
              <div className="w-full bg-gray-300 h-2 rounded mt-2 mb-2">
                <div
                  className="bg-black h-full rounded"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              {c.certificate ? (
                <a
                  href={`/certificates/${c.certificate}`}
                  className="text-blue-600 text-sm underline"
                >
                  Download Certificate
                </a>
              ) : (
                <p className="text-xs text-gray-500">No certificate available</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
