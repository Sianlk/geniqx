export default function DropBoothStore() {
  const products = ["VaultX Templates", "VisionCraft Packs", "1-on-1 Consult", "Exclusive Audio Drop", "Ebook Course", "AI Persona Script"];

  return (
    <main className="p-8">
      <h1 className="text-4xl text-emerald-500 font-bold">DropBooth™ Creator Shop</h1>
      <p className="mt-2 text-white">Sell your vaults, drops, AI bundles, courses, or offers — with token paygating, affiliate triggers, and impulse viral hooks.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {products.map(name => (
          <div key={name} className="p-4 border border-emerald-500 rounded bg-black text-white">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-400">Token unlock · DRM protected</p>
            <button className="mt-2 px-3 py-1 bg-emerald-500 text-black rounded">Buy Now</button>
          </div>
        ))}
      </div>
    </main>
  );
}
