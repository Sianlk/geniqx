export default function InjectableGrid() {
  const zones = ["Forehead", "Glabella", "Cheeks", "Jawline", "Chin", "Lips"];
  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {zones.map(zone => (
        <div key={zone} className="border border-pink-500 p-4 rounded bg-black text-white">
          <h3 className="font-bold">{zone}</h3>
          <p className="text-sm">AI dose recommendation: 0.5ml</p>
        </div>
      ))}
    </div>
  );
}
