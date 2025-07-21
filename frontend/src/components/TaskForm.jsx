import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/authContext';

const initialTask = {
  slNo: '',
  projectId: '',
  fixtureNumber: '',
  category: '',
  personHandling: '',
  supportedPerson: '',
  priority: '',
  task: '',
  start: '',
  end: '',
  plannedHrs: '',
  status: '',
  remarks: ''
};

const editableFields = Object.keys(initialTask);

export default function TaskForm({ onTaskCreated, editTask, onTaskUpdated }) {
  const [task, setTask] = useState(initialTask);
  const [users, setUsers] = useState([]);
  const { user } = useAuth(); // from context

  useEffect(() => {
    if (editTask) {
      const filtered = {};
      editableFields.forEach(field => {
        filtered[field] = editTask[field] || '';
      });
      setTask(filtered);
    } else {
      setTask(initialTask);
    }
  }, [editTask]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const res = await api.get('/auth/users'); // ✅
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users for personHandling', err);
      }
    };

    if (user?.role === 'admin') fetchUsers();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...task,
        slNo: Number(task.slNo),
        plannedHrs: Number(task.plannedHrs),
        start: new Date(task.start),
        end: new Date(task.end)
      };

      let res;
      if (editTask?._id) {
        res = await api.put(`/tasks/${editTask._id}`, payload);
        onTaskUpdated(res.data);
      } else {
        res = await api.post('/tasks', payload);
        onTaskCreated(res.data);
      }

      setTask(initialTask);
    } catch (err) {
      console.error("❌ Error saving task:", err);
    }
  };

  return (
    <div style={card}>
      <h3 style={{ color: 'blue', marginBottom: '35px' }}>
        {editTask ? "✏️ Edit Task" : "➕ Add Task"}
      </h3>

      <form onSubmit={handleSubmit}>
        {editableFields.map((key) => (
          <div key={key} style={{ marginBottom: '12px' }}>
            {key === 'priority' ? (
              <select name={key} value={task[key]} onChange={handleChange} style={select} required>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            ) : key === 'status' ? (
              <select name={key} value={task[key]} onChange={handleChange} style={select} required>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            ) : key === 'personHandling' && user?.role === 'admin' ? (
              <select name="personHandling" value={task.personHandling} onChange={handleChange} style={select} required>
                <option value="">Assign to</option>
                {users.map(u => (
                  <option key={u._id} value={u.email}>
                    {u.email}
                  </option>
                ))}
              </select>
            ) : ['start', 'end'].includes(key) ? (
              <input
                type="date"
                name={key}
                value={task[key]?.slice(0, 10)}
                onChange={handleChange}
                style={input}
                required
              />
            ) : (
              <input
                type={['slNo', 'plannedHrs'].includes(key) ? 'number' : 'text'}
                name={key}
                value={task[key]}
                onChange={handleChange}
                placeholder={key}
                style={input}
                required={key !== 'remarks'}
              />
            )}
          </div>
        ))}

        <button type="submit" style={button}>
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      {editTask?.status === 'Completed' && (
        <div style={{ marginTop: '20px', color: '#fff' }}>
          <p><strong>📅 Actual Completed Date:</strong> {new Date(editTask.actualCompletedDate).toLocaleDateString()}</p>
          <p><strong>🕒 Actual Hours:</strong> {editTask.actualHrs}</p>
          <p><strong>📆 Days Taken:</strong> {editTask.daysTaken}</p>
        </div>
      )}
    </div>
  );
}

// --- Styles ---
// --- Styles ---
const card = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '12px',
  maxWidth: '600px',
  margin: 'auto',
  boxShadow: '0 0 12px rgba(0, 102, 204, 0.15)',
  color: '#0a1d37',
};

const input = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #cce0ff',
  backgroundColor: '#f7fbff',
  color: '#0a1d37',
  fontSize: '1rem',
};

const select = {
  ...input,
};

const button = {
  marginTop: '20px',
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 0 8px rgba(0, 123, 255, 0.3)',
};

