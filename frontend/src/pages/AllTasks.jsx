
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get('/tasks/all');
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching all tasks:", err);
      }
    };

    fetchAllTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditTask(null);
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task._id !== id));
  };

  return (
    <div>
      <h2>All Tasks (Admin View)</h2>

      {/* <TaskList
        tasks={tasks}
        onEdit={setEditTask}
        onDelete={handleDelete}
      /> */}
      {editTask && (
        <TaskForm
          editTask={editTask}              // ✅ This prop name must be `editTask`
          onTaskUpdated={handleTaskUpdated}
        />
      )}
      
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={setEditTask}          // ✅ This allows TaskList to trigger edits
        onEditComplete={handleTaskUpdated}
      />
    </div>
  );
}

