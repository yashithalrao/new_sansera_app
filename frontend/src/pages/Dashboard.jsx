
// import React, { useEffect, useState, useContext } from 'react';
// import axios from '../api/axios';
// import { AuthContext } from '../context/authContext';

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     pendingCount: 0,
//     pendingList: [],
//     completedThisWeekCount: 0,
//     overdueCount: 0
//   });

//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await axios.get('/tasks/summary');
//         setStats(res.data);
//       } catch (err) {
//         console.error("Dashboard load error:", err);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   return (
//   <div style={pageStyle}>
//     <div style={brandingContainer}>
//       <h1 style={brandText}>SANSERA</h1>
//       <img src="/logo.png" alt="Logo" style={logoStyle} />
//     </div>

//     <h2 style={headingStyle}>📊 Dashboard</h2>
//     <h3 style={subheadingStyle}>Welcome back, {user?.username || 'User'}!</h3>


//       <div style={cardContainerStyle}>
//         <div style={cardStyle}>
//           <h3 style={cardTitle}>🔵 Pending Tasks: {stats.pendingCount}</h3>
//           <ul>
//             {stats.pendingList.map((t) => (
//               <li key={t._id}>{t.projectId} - {t.task}</li>
//             ))}
//           </ul>
//         </div>

//         <div style={cardStyle}>
//           <h3 style={cardTitle}>✅ Completed This Week</h3>
//           <p style={statValue}>{stats.completedThisWeekCount}</p>
//         </div>

//         <div style={cardStyle}>
//           <h3 style={cardTitle}>🔴 Overdue Tasks</h3>
//           <p style={statValue}>{stats.overdueCount}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Styles ---

// const pageStyle = {
//   backgroundColor: '#121212',
//   minHeight: '100vh',
//   padding: '40px',
//   color: '#f0f0f0',
//   fontFamily: 'Segoe UI'
// };

// const headingStyle = {
//   fontSize: '2rem',
//   marginBottom: '10px'
// };

// const subheadingStyle = {
//   fontSize: '1.2rem',
//   marginBottom: '30px',
//   color: '#bbb'
// };

// const cardContainerStyle = {
//   display: 'flex',
//   flexWrap: 'wrap',
//   gap: '20px'
// };

// const cardStyle = {
//   background: '#1e1e1e',
//   padding: '20px',
//   borderRadius: '10px',
//   boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
//   flex: '1 1 300px'
// };

// const cardTitle = {
//   marginBottom: '12px',
//   fontSize: '1.1rem',
//   color: '#61dafb'
// };

// const statValue = {
//   fontSize: '2rem',
//   fontWeight: 'bold',
//   marginTop: '10px'
// };

// const brandingContainer = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginBottom: '30px',
// };

// const brandText = {
//   fontSize: '2.4rem',
//   fontWeight: 'bold',
//   color: '#61dafb',
//   letterSpacing: '1.5px',
// };

// const logoStyle = {
//   width: '100px',
//   height: '100px',
//   objectFit: 'contain',
// };

import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/authContext';

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendingCount: 0,
    pendingList: [],
    completedThisWeekCount: 0,
    overdueCount: 0
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/tasks/summary');
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div style={pageStyle}>
      <div style={brandingContainer}>
        <h1 style={brandText}>SANSERA</h1>
        <img src="/logo.png" alt="Logo" style={logoStyle} />
      </div>

      <h2 style={headingStyle}>📊 Dashboard</h2>
      <h3 style={subheadingStyle}>Welcome back, {user?.username || 'User'}!</h3>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>🔵 Pending Tasks: {stats.pendingCount}</h3>
          <ul style={listStyle}>
            {stats.pendingList.map((t) => (
              <li key={t._id}>{t.projectId} - {t.task}</li>
            ))}
          </ul>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>✅ Completed This Week</h3>
          <p style={statValue}>{stats.completedThisWeekCount}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>🔴 Overdue Tasks</h3>
          <p style={statValue}>{stats.overdueCount}</p>
        </div>
      </div>
    </div>
  );
}

// --- Blue & White Styles ---

const pageStyle = {
  backgroundColor: '#eaf4ff',
  minHeight: '100vh',
  padding: '40px',
  color: '#003366',
  fontFamily: 'Segoe UI'
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '10px',
  color: '#0056b3'
};

const subheadingStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  color: '#0066cc'
};

const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px'
};

const cardStyle = {
  background: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  flex: '1 1 300px',
  color: '#003366'
};

const cardTitle = {
  marginBottom: '12px',
  fontSize: '1.1rem',
  color: '#007BFF'
};

const statValue = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginTop: '10px',
  color: '#0056b3'
};

const listStyle = {
  paddingLeft: '20px',
  marginTop: '10px',
  color: '#333'
};

const brandingContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '30px',
};

const brandText = {
  fontSize: '2.4rem',
  fontWeight: 'bold',
  color: '#007BFF',
  letterSpacing: '1.5px',
};

const logoStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  marginLeft: '15px'
};
