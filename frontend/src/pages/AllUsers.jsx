// import { useEffect, useState } from 'react';
// import api from '../api/axios';

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get('/auth/users'); // protected route
//       setUsers(res.data);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to fetch users');
//     }
//   };

//   const promoteToAdmin = async (id) => {
//     try {
//       await api.put(`/auth/users/${id}/promote`);
//       alert('User promoted to admin');
//       fetchUsers(); // refresh list
//     } catch (err) {
//       alert(err.response?.data?.message || 'Promotion failed');
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div style={pageStyle}>
//       <h2 style={headingStyle}>All Employees</h2>
//       <table style={tableStyle}>
//         <thead>
//           <tr style={theadRowStyle}>
//             <th style={thStyle}>Email</th>
//             <th style={thStyle}>Role</th>
//             <th style={thStyle}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} style={tbodyRowStyle}>
//               <td style={tdStyle}>{user.email}</td>
//               <td style={tdStyle}>{user.role}</td>
//               <td style={tdStyle}>
//                 {user.role !== 'admin' && (
//                   <button onClick={() => promoteToAdmin(user._id)} style={buttonStyle}>
//                     Promote to Admin
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;

// // Styles

// const pageStyle = {
//   padding: '40px',
//   maxWidth: '800px',
//   margin: '0 auto',
//   fontFamily: 'Segoe UI, sans-serif',
//   backgroundColor: '#f5f5f5',
//   minHeight: '100vh',
// };

// const headingStyle = {
//   textAlign: 'center',
//   marginBottom: '30px',
//   fontSize: '28px',
//   color: '#333',
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   backgroundColor: '#fff',
//   boxShadow: '0 0 10px rgba(0,0,0,0.05)',
// };

// const theadRowStyle = {
//   backgroundColor: '#007BFF',
//   color: '#fff',
// };

// const thStyle = {
//   padding: '12px 16px',
//   textAlign: 'left',
// };

// const tbodyRowStyle = {
//   borderBottom: '1px solid #ddd',
// };

// const tdStyle = {
//   padding: '12px 16px',
// };

// const buttonStyle = {
//   padding: '6px 12px',
//   backgroundColor: '#28a745',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };


import { useEffect, useState } from 'react';
import api from '../api/axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/users');
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch users');
    }
  };

  const promoteToAdmin = async (id) => {
    try {
      await api.put(`/auth/users/${id}/promote`);
      alert('User promoted to admin');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Promotion failed');
    }
  };

  const deleteUser = async (id, email) => {
    const confirmEmail = prompt(`Type the user's email (${email}) to confirm deletion:`);

    if (confirmEmail !== email) {
      alert('Email mismatch. Deletion cancelled.');
      return;
    }

    try {
      await api.delete(`/auth/users/${id}`);
      alert('User deleted successfully');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Deletion failed');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>All Employees</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={theadRowStyle}>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={tbodyRowStyle}>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                {user.role !== 'admin' && (
                  <>
                    <button onClick={() => promoteToAdmin(user._id)} style={buttonStyleGreen}>
                      Promote to Admin
                    </button>
                    <button onClick={() => deleteUser(user._id, user.email)} style={buttonStyleRed}>
                      Kick Out
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

// Styles

const pageStyle = {
  padding: '40px',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '28px',
  color: '#333',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
};

const theadRowStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
};

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
};

const tbodyRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tdStyle = {
  padding: '12px 16px',
};

const buttonStyleGreen = {
  padding: '6px 12px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '8px',
};

const buttonStyleRed = {
  padding: '6px 12px',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
