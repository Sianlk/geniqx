import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function EdinAITutor() {
  const [subject, setSubject] = useState("maths");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [senMode, setSenMode] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const res = await fetch('/edin/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, question }),
    });
    const data = await res.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="learner@edin.ai" userRole="student" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">AI Tutor</h1>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="maths">Maths</option>
          <option value="english">English</option>
          <option value="science">Science</option>
          <option value="11plus">11+</option>
          <option value="gcse">GCSE</option>
        </select>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          className="w-full p-2 border rounded mt-2"
          rows={4}
        />

        <label className="flex items-center space-x-2 mt-2">
          <input type="checkbox" checked={senMode} onChange={() => setSenMode(!senMode)} />
          <span>Enable SEN Mode (simplified explanations)</span>
        </label>

        <button
          onClick={handleAsk}
          className="bg-black text-white px-6 py-2 rounded mt-2"
          disabled={loading || !question}
        >
          {loading ? "Thinking..." : "Ask Tutor"}
        </button>

        {response && (
          <div className="mt-6 bg-gray-100 p-4 rounded space-y-2">
            <p className="font-semibold text-lg">Explanation:</p>
            <p>{senMode ? response.explanation.split('.')[0] + '.' : response.explanation}</p>

            <ul className="list-disc ml-6 text-sm">
              {response.steps.map((step: string, i: number) => (
                <li key={i}>{senMode ? step.split(':')[0] + ':' : step}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500">Confidence: {Math.round(response.confidence * 100)}%</p>
          </div>
        )}
      </main>
    </div>
  );
}
