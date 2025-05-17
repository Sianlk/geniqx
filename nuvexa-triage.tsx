import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaTriagePage() {
  const [symptoms, setSymptoms] = useState({
    chestPain: false,
    facialDroop: false,
    bleeding: false,
    burns: false,
    breathing: true,
  });

  const [urgency, setUrgency] = useState<string | null>(null);

  const handleSubmit = () => {
    let score = 0;
    if (symptoms.chestPain) score += 3;
    if (symptoms.facialDroop) score += 2;
    if (!symptoms.breathing) score += 4;
    if (symptoms.bleeding) score += 2;
    if (symptoms.burns) score += 2;

    if (score >= 7) setUrgency("CRITICAL");
    else if (score >= 4) setUrgency("URGENT");
    else setUrgency("OBSERVE");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="triage@nuvexa.ai" userRole="emergency" />
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Emergency AI Triage</h1>

        <form className="space-y-4">
          <label className="block">
            <input
              type="checkbox"
              checked={symptoms.chestPain}
              onChange={() => setSymptoms({ ...symptoms, chestPain: !symptoms.chestPain })}
            />{" "}
            Chest Pain / Tightness
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={symptoms.facialDroop}
              onChange={() => setSymptoms({ ...symptoms, facialDroop: !symptoms.facialDroop })}
            />{" "}
            Facial Droop / Stroke Indicators
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={symptoms.bleeding}
              onChange={() => setSymptoms({ ...symptoms, bleeding: !symptoms.bleeding })}
            />{" "}
            Major Bleeding
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={symptoms.burns}
              onChange={() => setSymptoms({ ...symptoms, burns: !symptoms.burns })}
            />{" "}
            Visible Burns / Trauma
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={!symptoms.breathing}
              onChange={() => setSymptoms({ ...symptoms, breathing: !symptoms.breathing })}
            />{" "}
            Not Breathing Normally
          </label>
        </form>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-black text-white rounded"
        >
          Assess Urgency
        </button>

        {urgency && (
          <div className="mt-6 text-xl font-bold">
            ⚠️ AI Triage Status:{" "}
            <span
              className={
                urgency === "CRITICAL"
                  ? "text-red-600"
                  : urgency === "URGENT"
                  ? "text-yellow-500"
                  : "text-green-600"
              }
            >
              {urgency}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
