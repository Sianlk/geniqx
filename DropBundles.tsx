export default function DropBundles() {
  const drops = [
    { name: "Prime Drop Pack", price: "950 CoreBits" },
    { name: "Legend Skin Pack", price: "2000 CoreBits" },
    { name: "Neuro Booster Kit", price: "1200 CoreBits" },
    { name: "VaultKey Mystery Crate", price: "1 VaultKey" }
  ];
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">Featured Drops</h2>
      <ul className="space-y-2 mt-2">
        {drops.map((d, i) => (
          <li key={i} className="border p-2 rounded">{d.name} - {d.price}</li>
        ))}
      </ul>
    </div>
  );
}
