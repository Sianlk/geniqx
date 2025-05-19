export default function ModuleBlock({ title, type }) {
  return (
    <div className="p-4 border border-blue-400 rounded bg-black text-white mt-3">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-400">{type}</p>
      <button className="mt-2 bg-blue-500 px-2 py-1 rounded text-black">Configure</button>
    </div>
  );
}
