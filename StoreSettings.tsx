export default function StoreSettings() {
  return (
    <section className="mt-8 bg-gray-800 text-white p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">Drop Settings</h2>
      <label className="block mb-2">Price (VaultGems):</label>
      <input type="number" defaultValue={100} className="bg-black text-white px-3 py-1 rounded w-32" />
      <label className="block mt-4 mb-2">Promo Trigger (e.g. type "vaultblast" in DM):</label>
      <input type="text" defaultValue="vaultblast" className="bg-black text-white px-3 py-1 rounded w-full" />
    </section>
  );
}
