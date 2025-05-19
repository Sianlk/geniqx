export default function ModuleToggles() {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-2xl font-semibold">Toggle Modules</h2>
      <ul>
        {["VaultX", "GENZ", "Nuvexa", "LexPrime", "AffiliateX", "OverlayMedix", "VisionCraft", "DropBooth", "NeuroX"].map(mod => (
          <li key={mod}><input type="checkbox" defaultChecked /> {mod}</li>
        ))}
      </ul>
    </div>
  );
}
