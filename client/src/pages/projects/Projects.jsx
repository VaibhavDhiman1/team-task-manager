import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../../api/axios";

import DashboardLayout from "../../layout/DashboardLayout";

import EmptyState from "../../components/EmptyState";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects");

      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/projects", formData);

      setProjects([response.data.project, ...projects]);

      setFormData({
        title: "",
        description: "",
      });

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>

          <p className="text-gray-500 mt-1">
            Manage and organize your team projects
          </p>
        </div>

        {user?.role === "ADMIN" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
          >
            {showForm ? "Close Form" : "Create Project"}
          </button>
        )}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">New Project</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows="4"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20">Loading projects...</div>
      ) : projects.length === 0 ? (
        /* Empty State */
        <EmptyState
          title="No Projects Found"
          description="Create your first project to start managing tasks."
        />
      ) : (
        /* Project Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {project.description || "No description"}
                  </p>
                </div>

                <div className="bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full">
                  {project.members?.length} Members
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Created by {project.createdBy?.name}
                </div>

                <Link
                  to={`/projects/${project._id}`}
                  className="text-indigo-600 font-medium hover:text-indigo-700"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Projects;
