export default function FlowBoardDashboard() {
  const tracks = ["NeuroX Math CPD", "Aesthetics Injection CPD", "Legal Practice Test Bundle", "Branding + Funnel Mastery"];

  return (
    <main className="p-8 bg-gradient-to-br from-indigo-950 to-black text-white min-h-screen">
      <h1 className="text-3xl text-blue-400 font-bold">FlowBoard™ Course Console</h1>
      <p className="text-sm text-gray-300 mt-2">Choose a prebuilt or custom curriculum path. AI-enhanced with templates, drag modules, and quiz integration.</p>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
        {tracks.map(track => (
          <div key={track} className="bg-gray-800 border border-blue-400 p-4 rounded">
            <h3 className="text-xl font-semibold">{track}</h3>
            <button className="mt-2 bg-blue-500 text-black px-3 py-1 rounded">Edit / Assign</button>
          </div>
        ))}
      </div>
    </main>
  );
}
