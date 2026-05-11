import {
  FaHome,
  FaFolderOpen,
  FaTasks,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <aside className="fixed md:static z-50 w-64 bg-white shadow-lg flex-col justify-between">
      
      <div>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">
            TaskFlow
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Team Workspace
          </p>
        </div>

        <nav className="p-4 space-y-2">
          
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaHome />
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaFolderOpen />
            Projects
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-gray-700 transition"
          >
            <FaTasks />
            Tasks
          </Link>

        </nav>
      </div>

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