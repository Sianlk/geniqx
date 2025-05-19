export default function DarkWebTracePanel() {
  return (
    <div className="mt-8 p-6 bg-gray-900 border border-red-500 text-white rounded">
      <h2 className="text-xl font-bold mb-2">Dark Web Scan</h2>
      <p className="text-sm mb-4 text-gray-400">Scanning onion layers, pastebins, marketplaces, and leaked vaults for any trace of selected items...</p>
      <p>Status: <span className="text-green-400">🟢 In Progress</span></p>
    </div>
  );
}
