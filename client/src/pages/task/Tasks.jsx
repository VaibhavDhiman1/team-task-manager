import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import DashboardLayout from "../../layout/DashboardLayout";

const Tasks = () => {
  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const fetchTasks = async () => {
    try {
      const response = await API.get(
        "/tasks"
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (
    taskId,
    status
  ) => {
    try {
      await API.put(
        `/tasks/${taskId}`,
        {
          status,
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status,
              }
            : task
        )
      );

      toast.success(
        "Task updated"
      );
    } catch (error) {
      toast.error(
        "Failed to update task"
      );
    }
  };

  const isOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) <
        new Date() &&
      task.status !== "DONE"
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading tasks...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      
      {/* Header */}
      <div className="mb-8">
        
        <h1 className="text-3xl font-bold text-gray-800">
          Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Manage assigned work and track progress
        </p>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">
            All Tasks
          </option>

          <option value="TODO">
            TODO
          </option>

          <option value="IN_PROGRESS">
            IN PROGRESS
          </option>

          <option value="REVIEW">
            REVIEW
          </option>

          <option value="DONE">
            DONE
          </option>
        </select>

      </div>

      {/* Tasks */}
      <div className="space-y-5">
        
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            
            <h2 className="text-2xl font-bold text-gray-700">
              No Tasks Found
            </h2>

            <p className="text-gray-500 mt-2">
              Tasks assigned to you will appear here.
            </p>

          </div>
        ) : (
          tasks
            .filter((task) => {
              const matchesSearch =
                task.title
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  );

              const matchesStatus =
                statusFilter === "ALL"
                  ? true
                  : task.status ===
                    statusFilter;

              return (
                matchesSearch &&
                matchesStatus
              );
            })
            .map((task) => (
              <div
                key={task._id}
                className={`bg-white rounded-2xl shadow-sm p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isOverdue(task)
                    ? "border-red-300"
                    : "border-gray-100"
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

                    <p className="text-gray-500 mt-3">
                      {task.description}
                    </p>

                    <div className="mt-4 text-sm text-gray-400">
                      
                      <p>
                        Project:{" "}
                        {
                          task.projectId
                            ?.title
                        }
                      </p>

                      <p className="mt-1">
                        Due:{" "}
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "No date"}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">
                    
                    {/* Status */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(
                          task._id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-xl px-4 py-2 outline-none"
                    >
                      <option value="TODO">
                        TODO
                      </option>

                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>

                      <option value="REVIEW">
                        REVIEW
                      </option>

                      <option value="DONE">
                        DONE
                      </option>
                    </select>

                    {/* Priority */}
                    <div
                      className={`text-center text-sm px-4 py-2 rounded-xl font-medium ${
                        task.priority ===
                        "HIGH"
                          ? "bg-red-100 text-red-600"
                          : task.priority ===
                            "MEDIUM"
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

export default Tasks;