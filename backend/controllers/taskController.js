const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const body = req.body;

    const taskData = {
      ...body,
      createdBy: req.user.id,
    };

    if (body.status === 'Completed') {
  const start = new Date(body.start);
  const actualCompletedDate = new Date();
  const daysTaken = Math.ceil((actualCompletedDate - start) / (1000 * 60 * 60 * 24));
  const actualHrs = parseFloat((daysTaken * 7.75).toFixed(2));

  taskData.actualCompletedDate = actualCompletedDate;
  taskData.daysTaken = daysTaken;
  taskData.actualHrs = actualHrs;
}


    const task = new Task(taskData);
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

exports.getAssignedTasks = async (req, res) => {
  try {
    const user = req.user;

    const tasks = await Task.find({
      personHandling: user.email // assuming tasks store email as assignee
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assigned tasks', error: err.message });
  }
};


exports.getMyTasks = async (req, res) => {
  try {
    // const tasks = await Task.find({ createdBy: req.user.id });
    const tasks = await Task.find({
  $or: [
    { createdBy: req.user.id },
    { personHandling: req.user.email }
  ]
});

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('createdBy', 'email'); // 👈 populate email
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all tasks' });
  }
};




// UPDATE Task
// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     // Only allow creator or admin to update
//     if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating task', error: err.message });
//   }
// };


exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updates = { ...req.body };

// Prevent end date from being overwritten unintentionally
if (!req.body.explicitlyEditingEndDate) {
  delete updates.end;
}


    // Recalculate only if task is being marked as completed
if (updates.status === 'Completed') {
  const start = new Date(updates.start || task.start);
  const actualCompletedDate = new Date();
  const daysTaken = Math.ceil((actualCompletedDate - start) / (1000 * 60 * 60 * 24));
  const actualHrs = parseFloat((daysTaken * 7.75).toFixed(2));

  updates.actualCompletedDate = actualCompletedDate;
  updates.daysTaken = daysTaken;
  updates.actualHrs = actualHrs;
}


    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};


// DELETE Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only allow creator or admin to delete
    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};



// GET /api/tasks/summary
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    // Get user's tasks
    // const tasks = await Task.find({ createdBy: userId });
    const tasks = await Task.find({
  $or: [
    { createdBy: req.user.id },
    { personHandling: req.user.email }
  ]
});


    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const completedThisWeek = tasks.filter(t =>
      t.status === 'Completed' &&
      new Date(t.updatedAt) >= startOfWeek
    );
    const overdueTasks = tasks.filter(t =>
      t.status !== 'Completed' &&
      new Date(t.end) < today
    );

    res.json({
      pendingCount: pendingTasks.length,
      pendingList: pendingTasks,
      completedThisWeekCount: completedThisWeek.length,
      overdueCount: overdueTasks.length
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ message: 'Error loading dashboard', error: err.message });
  }
};
