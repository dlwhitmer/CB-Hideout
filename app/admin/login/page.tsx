export default function AdminLogin() {
  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

      <form className="flex flex-col gap-4">
        <input className="p-2 bg-gray-800 border border-gray-700" placeholder="Username" />
        <input className="p-2 bg-gray-800 border border-gray-700" placeholder="Password" type="password" />
        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded">Login</button>
      </form>
    </div>
  );
}