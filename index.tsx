export default function NuvexaOverlay() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-pink-600">Nuvexa™: Patient Consent & Overlay System</h1>
      <p className="mt-2 text-white">Facial scan overlays, injectables planner, treatment logs, and patient video recall UI.</p>
      <div className="mt-6">
        <button className="bg-pink-500 px-4 py-2 rounded text-black font-semibold hover:bg-pink-400">Start Scan</button>
        <button className="bg-white px-4 py-2 ml-4 rounded text-pink-600 font-semibold border border-pink-600">Consent Form</button>
      </div>
    </main>
  );
}
