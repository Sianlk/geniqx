import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function EdinExamUI() {
  const [subject, setSubject] = useState('11plus_verbal');
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);

  const startExam = async () => {
    const res = await fetch('/edin/exam/mock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, count: 2 }),
    });
    const data = await res.json();
    setExam(data);
    setAnswers({});
    setScore(null);
  };

  const submitExam = () => {
    const correct = exam.questions.filter((q: any, i: number) => answers[i] === q.answer);
    setScore(correct.length);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar userEmail="student@edin.ai" userRole="learner" />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">EDIN: Exam Practice</h1>

        <select
          className="w-full p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="11plus_verbal">11+ Verbal Reasoning</option>
          <option value="13plus_maths">13+ Maths</option>
        </select>

        <button onClick={startExam} className="bg-black text-white px-6 py-2 rounded">
          Start Exam
        </button>

        {exam && (
          <div className="space-y-6">
            {exam.questions.map((q: any, i: number) => (
              <div key={i} className="p-4 bg-gray-100 rounded space-y-2">
                <p className="font-semibold">{q.q}</p>
                {q.a.map((opt: string, j: number) => (
                  <div key={j}>
                    <label>
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => setAnswers({ ...answers, [i]: opt })}
                      />
                      <span className="ml-2">{opt}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}

            <button onClick={submitExam} className="bg-green-600 text-white px-6 py-2 rounded">
              Submit Answers
            </button>
            {score !== null && (
              <p className="text-lg mt-2 text-green-700 font-bold">
                Score: {score} / {exam.questions.length}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
