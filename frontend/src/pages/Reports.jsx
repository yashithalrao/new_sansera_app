import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../App.css';
import {
  PieChart, Pie, Cell,
  Tooltip as RechartTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export default function Report() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get('/tasks/all');
      setTasks(res.data);
    } catch (err) {
      console.error("Report fetch failed:", err);
    }
  };

  const exportCSV = () => {
    const headers = [
      'SL No', 'Project ID', 'Fixture No', 'Person Email',
      'Start Date', 'End Date', 'Planned Hrs', 'Actual Hrs',
      'Variance', 'Status'
    ];
    const rows = tasks.map(t => [
      t.slNo, t.projectId, t.fixtureNumber,
      t.createdBy?.email || 'Unknown',
      new Date(t.start).toLocaleDateString(),
      new Date(t.end).toLocaleDateString(),
      t.plannedHrs,
      t.actualHrs,
      (t.actualHrs - t.plannedHrs).toFixed(2),
      t.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task_report.csv';
    a.click();
  };

  const COLORS = ['#3ba4b7ff', '#e4da17ff', '#1ac76eff'];

  const statusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { name: 'Ongoing', value: tasks.filter(t => t.status === 'Ongoing').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length }
  ];

  const barData = tasks.map(t => ({
    name: `#${t.slNo}`,
    planned: t.plannedHrs,
    actual: t.actualHrs
  }));

  return (
    <div style={pageStyle}>
      <h2 style={headerStyle}>📋 Admin Report</h2>

      <div style={{ marginBottom: '30px' }}>
        <button onClick={exportCSV} style={exportButtonStyle}>
          Export to CSV
        </button>
      </div>

      <div style={chartContainerStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>Task Status Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartTooltip contentStyle={tooltipStyle} />
            <Legend />
          </PieChart>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>Planned vs Actual Hours</h3>
          <BarChart width={500} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="planned" fill="#0529f4ff" />
            <Bar dataKey="actual" fill="#55e0d0ff" />
          </BarChart>
        </div>
      </div>

      <div style={tableContainerStyle}>
        <h3 style={cardTitle}>Task Table</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              {['SL No', 'Project ID', 'Fixture No', 'Person Email', 'Start Date', 'End Date', 'Planned Hrs', 'Actual Hrs', 'Variance', 'Status'].map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td>{t.slNo}</td>
                <td>{t.projectId}</td>
                <td>{t.fixtureNumber}</td>
                <td>{t.createdBy?.email || 'Unknown'}</td>
                <td>{new Date(t.start).toLocaleDateString()}</td>
                <td>{new Date(t.end).toLocaleDateString()}</td>
                <td>{t.plannedHrs}</td>
                <td>{t.actualHrs}</td>
                <td>{(t.actualHrs - t.plannedHrs).toFixed(2)}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Styles ---

const pageStyle = {
  backgroundColor: '#f5faff',
  padding: '40px',
  minHeight: '100vh',
  fontFamily: 'Segoe UI',
  color: '#003366'
};

const headerStyle = {
  marginBottom: '20px',
  color: '#0056b3'
};

const exportButtonStyle = {
  background: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 2px 6px rgba(0, 123, 255, 0.3)'
};

const chartContainerStyle = {
  display: 'flex',
  gap: '40px',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const cardStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  flex: '1 1 40%',
  maxWidth: '600px'
};

const cardTitle = {
  marginBottom: '16px',
  color: '#003366'
};

const tooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  color: '#333'
};

const tableContainerStyle = {
  marginTop: '50px',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  background: '#fff',
  color: '#333',
  borderRadius: '8px',
  boxShadow: '0 0 8px rgba(0,0,0,0.05)'
};

tableStyle['th'] = tableStyle['td'] = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left'
};
