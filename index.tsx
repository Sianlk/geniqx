export default function OverlayMedixScan() {
  const zones = ["Forehead", "Temples", "Cheeks", "Jawline", "Neck", "Shoulders"];

  return (
    <main className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-3xl text-cyan-400 font-bold">OverlayMedix™: AR Injector Map</h1>
      <p className="mt-2 text-gray-400">Live diagnostic zones, AI precision mapping, anatomical overlays, and dosage visualization.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {zones.map(z => (
          <div key={z} className="p-4 border border-cyan-400 rounded">
            <h3 className="text-lg font-semibold">{z}</h3>
            <p className="text-sm">Suggested Dose: 0.3–0.6ml</p>
            <p className="text-xs">Overlay active ✅</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button className="bg-cyan-500 px-4 py-2 rounded text-black">Activate 3D Scan Mode</button>
      </div>
    </main>
  );
}
