import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

import DashboardLayout from "../../layout/DashboardLayout";

import { FaTrash } from "react-icons/fa";

const SingleProject = () => {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [memberEmail, setMemberEmail] = useState("");

  const fetchProject = async () => {
    try {
      const response = await API.get(`/projects/${id}`);

      setProject(response.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await API.get(`/tasks/${id}`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createTaskHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(`/tasks/${id}`, formData);

      setTasks([response.data.task, ...tasks]);

      toast.success("Task created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const addMemberHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await API.put(`/projects/${id}/add-member`, {
        email: memberEmail,
      });

      setProject(response.data.project);

      setMemberEmail("");

      toast.success("Member added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add member");
    }
  };

  const deleteProjectHandler = async () => {
    const confirmDelete = window.confirm("Delete this project?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);

      toast.success("Project deleted");

      navigate("/projects");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, {
        status,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status,
              }
            : task,
        ),
      );

      toast.success("Task status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteTaskHandler = async (taskId) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${taskId}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "DONE"
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Loading project...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{project?.title}</h1>

        <p className="text-gray-500 mt-2">{project?.description}</p>
        {user?.role === "ADMIN" && (
          <button
            onClick={deleteProjectHandler}
            className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition-all duration-300"
          >
            Delete Project
          </button>
        )}
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Members */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Team Members</h2>

            <div className="flex flex-wrap gap-3 mt-4">
              {project?.members?.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {member.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>

                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Member */}
          {user?.role === "ADMIN" && (
            <form
              onSubmit={addMemberHandler}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter member email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Add Member
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Create Task */}
      {user?.role === "ADMIN" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Create Task</h2>

          <form
            onSubmit={createTaskHandler}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="LOW">Low Priority</option>

              <option value="MEDIUM">Medium Priority</option>

              <option value="HIGH">High Priority</option>
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              rows="4"
              className="md:col-span-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 transition-all duration-300 hover:shadow-lg"
            >
              Create Task
            </button>
          </form>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">All Tasks</option>

          <option value="TODO">TODO</option>

          <option value="IN_PROGRESS">IN PROGRESS</option>

          <option value="REVIEW">REVIEW</option>

          <option value="DONE">DONE</option>
        </select>
      </div>

      {/* Tasks Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Project Tasks</h2>

          <p className="text-gray-500 mt-1">
            Track progress and manage work efficiently
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-5">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700">
              No Tasks Created Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start by creating a task and assigning work to your team.
            </p>
          </div>
        ) : (
          tasks
            .filter((task) => {
              const matchesSearch = task.title
                .toLowerCase()
                .includes(search.toLowerCase());

              const matchesStatus =
                statusFilter === "ALL" ? true : task.status === statusFilter;

              return matchesSearch && matchesStatus;
            })
            .map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-2xl shadow-sm p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isOverdue(task) ? "border-red-300" : "border-gray-100"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold text-gray-800">
                        {task.title}
                      </h2>

                      {isOverdue(task) && (
                        <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                          Overdue
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 mt-3">{task.description}</p>

                    <div className="mt-4 text-sm text-gray-400">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No date"}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Status */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(task._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-xl px-4 py-2 outline-none"
                    >
                      <option value="TODO">TODO</option>

                      <option value="IN_PROGRESS">IN PROGRESS</option>

                      <option value="REVIEW">REVIEW</option>

                      <option value="DONE">DONE</option>
                    </select>

                    {user?.role === "ADMIN" && (
                      <button
                        onClick={() => deleteTaskHandler(task._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition-all duration-300"
                      >
                        <FaTrash />
                      </button>
                    )}

                    {/* Priority */}
                    <div
                      className={`text-center text-sm px-4 py-2 rounded-xl font-medium ${
                        task.priority === "HIGH"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-600"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default SingleProject;
