const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // projects where user is member
    const projects = await Project.find({
      members: userId,
    });

    const projectIds = projects.map((project) => project._id);

    // all tasks for these projects
    const tasks = await Task.find({
      projectId: { $in: projectIds },
    });

    // assigned tasks
    const assignedTasks = await Task.find()
      .populate("projectId", "title")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // overdue tasks
    const overdueTasks = tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "DONE",
    );

    // status counts
    const todoCount = tasks.filter((task) => task.status === "TODO").length;

    const inProgressCount = tasks.filter(
      (task) => task.status === "IN_PROGRESS",
    ).length;

    const reviewCount = tasks.filter((task) => task.status === "REVIEW").length;

    const doneCount = tasks.filter((task) => task.status === "DONE").length;

    res.status(200).json({
      success: true,

      stats: {
        totalProjects: projects.length,
        totalTasks: tasks.length,
        overdueTasks: overdueTasks.length,

        statusCounts: {
          TODO: todoCount,
          IN_PROGRESS: inProgressCount,
          REVIEW: reviewCount,
          DONE: doneCount,
        },
      },

      assignedTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
