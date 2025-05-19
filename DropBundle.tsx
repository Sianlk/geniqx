export default function DropBundle({ name, price }) {
  return (
    <div className="bg-black text-white border border-yellow-500 rounded p-4 m-2">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm">Unlock for {price} CoreBits</p>
      <button className="mt-2 bg-yellow-500 text-black px-3 py-1 rounded">Unlock</button>
    </div>
  );
}
