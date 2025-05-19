export default function NeuroXDashboard() {
  const games = ["Times Table Blitz", "Focus Rush", "Memory Grid", "Logic Circuits", "Speed Puzzle", "Escape Room Math"];

  return (
    <main className="p-8 bg-gradient-to-br from-indigo-900 to-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-yellow-400">NeuroX™ Brain Gym</h1>
      <p className="text-sm text-gray-300 mt-2">Choose your challenge. Each trains different cognitive functions (focus, memory, speed, reasoning).</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {games.map(g => (
          <div key={g} className="border border-yellow-500 p-4 bg-black rounded shadow">
            <h3 className="text-xl font-semibold">{g}</h3>
            <p className="text-xs text-gray-400">AI difficulty scaling enabled</p>
            <button className="mt-2 bg-yellow-500 text-black px-3 py-1 rounded">Start</button>
          </div>
        ))}
      </div>
    </main>
  );
}
