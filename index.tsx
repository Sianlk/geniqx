export default function VaultXStore() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold text-yellow-400">VaultX™ Premium Store</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {["Prime Pass", "Legendary Drop Pack", "Synapz Boosters", "VaultKey Crates", "RetroCore Skins"].map(item => (
          <div key={item} className="p-4 bg-gray-900 rounded-lg shadow hover:scale-105 transition">
            <h2 className="text-xl text-white font-semibold">{item}</h2>
            <button className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded">Buy with CoreBits</button>
          </div>
        ))}
      </div>
    </main>
  );
}
