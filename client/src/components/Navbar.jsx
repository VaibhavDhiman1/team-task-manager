const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

        <p className="text-sm text-gray-500">
          Manage your projects and tasks efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="font-medium text-gray-800">{user?.name}</p>

          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <div
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            user?.role === "ADMIN"
              ? "bg-indigo-100 text-indigo-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {user?.role}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
