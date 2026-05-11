import {
  FaHome,
  FaFolderOpen,
  FaTasks,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <aside
      className={`
fixed top-0 left-0 h-screen bg-white shadow-lg z-50
w-64 flex flex-col justify-between
transition-transform duration-300

${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0 lg:static
`}
    >
      <div>
        {/* Header */}
        <div className="p-6 border-b relative">
          <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>

          <p className="text-sm text-gray-500 mt-1">Team Workspace</p>

          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-6 right-5 text-xl text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaFolderOpen />
            Projects
          </Link>

          <Link
            to="/tasks"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaTasks />
            Tasks
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={logoutHandler}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
