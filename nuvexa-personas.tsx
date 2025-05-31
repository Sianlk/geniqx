import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function NuvexaPersonasPage() {
  const [role, setRole] = useState("surgeon");
  const [language, setLanguage] = useState("en");
  const [tone, setTone] = useState("calm");
  const [preview, setPreview] = useState("");

  const generatePreview = () => {
    const lines: Record<string, string> = {
      surgeon: "Let's begin the robotic procedure with symmetrical overlay calibration.",
      patient: "Welcome! I’ll guide you through your scan and treatment today.",
      educator: "Let’s revise the facial arterial map before simulation begins.",
      influencer: "Hey doc! Here's the trending injectable zone of the week!",
    };

    const greetings: Record<string, Record<string, string>> = {
      en: { calm: "Hello", assertive: "Let’s go", educational: "Reviewing", influencer: "Hey!" },
      fr: { calm: "Bonjour", assertive: "Allons-y", educational: "Révision", influencer: "Coucou!" },
      ar: { calm: "مرحباً", assertive: "لنبدأ", educational: "مراجعة", influencer: "أهلاً!" },
      es: { calm: "Hola", assertive: "Vamos", educational: "Revisando", influencer: "¡Hola!" },
    };

    const prefix = greetings[language]?.[tone] || "Hello";
    const body = lines[role] || "Ready to assist.";
    setPreview(`${prefix}. ${body}`);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="ai@nuvexa.ai" userRole="personas" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">AI Persona Console</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <label>User Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
              <option value="surgeon">Surgeon</option>
              <option value="patient">Patient Assistant</option>
              <option value="educator">Trainer</option>
              <option value="influencer">Influencer</option>
            </select>
          </div>

          <div>
            <label>Language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border p-2 rounded">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label>Personality:</label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full border p-2 rounded">
              <option value="calm">Calm</option>
              <option value="assertive">Assertive</option>
              <option value="educational">Educational</option>
              <option value="influencer">Influencer Style</option>
            </select>
          </div>
        </div>

        <button onClick={generatePreview} className="mt-4 px-6 py-2 bg-black text-white rounded">
          Preview Persona
        </button>

        {preview && (
          <div className="mt-4 bg-gray-100 p-4 rounded border">
            <strong>Persona Response:</strong> <p className="mt-2">{preview}</p>
          </div>
        )}
      </main>
    </div>
  );
}
