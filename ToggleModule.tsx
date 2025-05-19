export default function ToggleModule({ module, enabled }) {
  return (
    <div className="p-2 border rounded-xl shadow mb-2">
      <strong>{module}</strong>: {enabled ? "ON" : "OFF"}
    </div>
  );
}
