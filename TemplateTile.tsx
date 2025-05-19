export default function TemplateTile({ name, category }) {
  return (
    <div className="border p-4 rounded bg-gray-900 text-white">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">{category}</p>
      <button className="mt-2 px-3 py-1 bg-purple-600 text-white rounded">Edit</button>
    </div>
  );
}
