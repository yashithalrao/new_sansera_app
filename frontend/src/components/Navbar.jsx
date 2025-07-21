

// import { Link, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/authContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   if (!user) return null;

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav style={{
//       padding: '12px 24px',
//       backgroundColor: '#1a1a1a',
//       color: '#e0e0e0',
//       display: 'flex',
//       alignItems: 'center',
//       borderBottom: '1px solid #333',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
//     }}>
//       <Link style={linkStyle} to="/dashboard">Dashboard</Link>
//       <Link style={linkStyle} to="/mytasks">My Tasks</Link>
//       <Link style={linkStyle} to="/entertask">Enter Task</Link>
//       {user.role === 'admin' && (
//         <>
//           <Link style={linkStyle} to="/alltasks">All Tasks</Link>
//           <Link style={linkStyle} to="/reports">Reports</Link>
//         </>
//       )}
//       <button
//         onClick={handleLogout}
//         style={{
//           marginLeft: 'auto',
//           padding: '6px 14px',
//           backgroundColor: '#ff4444',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontWeight: 'bold',
//           boxShadow: '0 0 10px rgba(255, 68, 68, 0.3)'
//         }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// const linkStyle = {
//   marginRight: '100px',
//   textDecoration: 'none',
//   color: '#ffffffff',
//   fontWeight: '500', 
//   fontSize: '20px'
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      padding: '12px 24px',
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid #333',
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }}>
      <Link style={linkStyle} to="/dashboard">Dashboard</Link>
      <Link style={linkStyle} to="/mytasks">My Tasks</Link>
      <Link style={linkStyle} to="/entertask">Enter Task</Link>
      {user.role === 'admin' && (
        <>
          <Link style={linkStyle} to="/alltasks">All Tasks</Link>
          <Link style={linkStyle} to="/reports">Reports</Link>
          <Link style={linkStyle} to="/users">Manage Users</Link> {/* ✅ NEW */}
        </>
      )}
      <button
        onClick={handleLogout}
        style={{
          marginLeft: 'auto',
          padding: '6px 14px',
          backgroundColor: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 0 10px rgba(255, 68, 68, 0.3)'
        }}
      >
        Logout
      </button>
    </nav>
  );
};

const linkStyle = {
  marginRight: '100px',
  textDecoration: 'none',
  color: '#ffffff',
  fontWeight: '500',
  fontSize: '20px'
};

export default Navbar;
