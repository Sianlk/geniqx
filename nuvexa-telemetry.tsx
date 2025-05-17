import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

type Vitals = {
  heartRate: number;
  spo2: number;
  temperature: number;
  riskLevel: string;
};

export default function NuvexaTelemetryPage() {
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 78,
    spo2: 98,
    temperature: 36.8,
    riskLevel: "Normal",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate wearable telemetry updates
      const hr = 60 + Math.floor(Math.random() * 40);
      const spo2 = 94 + Math.floor(Math.random() * 5);
      const temp = 36.5 + Math.random() * 1.5;
      let risk = "Normal";
      if (hr > 100 || spo2 < 94 || temp > 38.0) risk = "Alert";

      setVitals({ heartRate: hr, spo2, temperature: parseFloat(temp.toFixed(1)), riskLevel: risk });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="admin@nuvexa.ai" userRole="monitoring" />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Live Patient Telemetry</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-lg">
          <div className="p-4 border rounded shadow bg-gray-50">
            ❤️ <strong>Heart Rate:</strong> {vitals.heartRate} bpm
          </div>
          <div className="p-4 border rounded shadow bg-gray-50">
            🫁 <strong>SpO₂:</strong> {vitals.spo2} %
          </div>
          <div className="p-4 border rounded shadow bg-gray-50">
            🌡️ <strong>Temp:</strong> {vitals.temperature} °C
          </div>
        </div>

        <div className="mt-4 text-xl">
          <span className={vitals.riskLevel === "Alert" ? "text-red-600 font-bold" : "text-green-600"}>
            Status: {vitals.riskLevel}
          </span>
        </div>
      </main>
    </div>
  );
}
