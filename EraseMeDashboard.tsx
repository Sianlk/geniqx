export default function EraseMeDashboard() {
  const options = ["Full Name", "Email Address", "Phone Number", "Old Usernames", "Face/Images", "School Info", "Location", "Address"];

  return (
    <main className="p-8 bg-black text-white">
      <h1 className="text-3xl text-red-500 font-bold">EraseMe™: Digital Data Removal</h1>
      <p className="text-sm text-gray-400 mt-2">Select what you want removed. We'll leave your active socials untouched unless selected.</p>
      <form className="mt-6 grid grid-cols-2 gap-4">
        {options.map(item => (
          <label key={item} className="flex gap-2 items-center bg-gray-800 p-3 rounded border border-red-500">
            <input type="checkbox" name="eraseOptions" value={item} defaultChecked />
            <span>{item}</span>
          </label>
        ))}
        <button className="col-span-2 mt-4 bg-red-600 text-black font-bold px-4 py-2 rounded">Start Erasure Process</button>
      </form>
    </main>
  );
}
