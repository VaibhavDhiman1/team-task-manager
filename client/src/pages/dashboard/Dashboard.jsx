import { useEffect, useState } from "react";

import API from "../../api/axios";

import DashboardLayout from "../../layout/DashboardLayout";

import StatsCard from "../../components/StatsCard";

import SkeletonCard from "../../components/SkeletonCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await API.get("/dashboard");

      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Projects"
          value={dashboardData?.stats?.totalProjects}
          color="text-indigo-600"
        />

        <StatsCard
          title="Total Tasks"
          value={dashboardData?.stats?.totalTasks}
          color="text-green-600"
        />

        <StatsCard
          title="Overdue Tasks"
          value={dashboardData?.stats?.overdueTasks}
          color="text-red-500"
        />
      </div>

      {/* Assigned Tasks */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Assigned Tasks</h2>

          <span className="text-sm text-gray-500">
            {dashboardData?.assignedTasks?.length} Tasks
          </span>
        </div>

        <div className="space-y-4">
          {dashboardData?.assignedTasks?.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No assigned tasks found
            </div>
          ) : (
            dashboardData?.assignedTasks?.map((task) => (
              <div
                key={task._id}
                className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {task.projectId?.title}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "DONE"
                        ? "bg-green-100 text-green-600"
                        : task.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-600"
                          : task.status === "REVIEW"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.priority === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
