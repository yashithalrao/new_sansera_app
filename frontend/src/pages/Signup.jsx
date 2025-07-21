
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); 
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/auth/signup', { email, username, password });
//       alert('Account created!');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div style={pageStyle}>
//       <form onSubmit={handleSubmit} style={formStyle}>
//         <h1 style={brandText}>SANSERA</h1>
//         <h2 style={titleStyle}>Create Account</h2>

//         <input
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//           style={inputStyle}
//           required
//         />

//         <input
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           placeholder="Username"
//           style={inputStyle}
//           required
//         />

//         <input
//           type={showPassword ? 'text' : 'password'}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter your password"
//           style={inputStyle}
//           required
//         />

//         <button
//           type="button"
//           style={toggleButtonStyle}
//           onClick={() => setShowPassword((prev) => !prev)}
//         >
//           {showPassword ? 'Hide' : 'Show'}
//         </button>

//         <button type="submit" style={buttonStyle}>Sign up</button>

//         <div style={loginPrompt}>
//           Already have an account?
//           <Link to="/" style={loginLink}> Login</Link>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// // 💠 Blue + White styles
// const pageStyle = {
//   backgroundColor: '#eaf4ff',
//   minHeight: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontFamily: 'Segoe UI, sans-serif',
//   color: '#003366',
//   padding: '20px'
// };

// const formStyle = {
//   backgroundColor: '#ffffff',
//   padding: '40px',
//   borderRadius: '12px',
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   display: 'flex',
//   flexDirection: 'column',
//   width: '100%',
//   maxWidth: '400px'
// };

// const brandText = {
//   fontSize: '2.4rem',
//   fontWeight: 'bold',
//   color: '#007BFF',
//   letterSpacing: '1.5px',
//   textAlign: 'center',
//   marginBottom: '10px'
// };

// const titleStyle = {
//   textAlign: 'center',
//   marginBottom: '30px',
//   color: '#0056b3',
//   fontSize: '1.8rem'
// };

// const inputStyle = {
//   backgroundColor: '#f0f8ff',
//   color: '#003366',
//   border: '1px solid #b3d7ff',
//   borderRadius: '8px',
//   padding: '12px',
//   marginBottom: '15px',
//   fontSize: '1rem'
// };

// const toggleButtonStyle = {
//   backgroundColor: '#007BFF',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '6px',
//   padding: '8px 12px',
//   fontSize: '0.85rem',
//   cursor: 'pointer',
//   width: '60px',
//   marginBottom: '20px',
//   alignSelf: 'flex-end'
// };

// const buttonStyle = {
//   backgroundColor: '#0056b3',
//   color: '#ffffff',
//   padding: '12px',
//   border: 'none',
//   borderRadius: '8px',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   fontSize: '1rem',
//   marginTop: '10px'
// };

// const loginPrompt = {
//   marginTop: '20px',
//   textAlign: 'center',
//   fontSize: '0.9rem',
//   color: '#003366'
// };

// const loginLink = {
//   color: '#007BFF',
//   marginLeft: '5px',
//   textDecoration: 'underline',
//   cursor: 'pointer'
// };

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', { email, username, password });
      alert('Account created!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={wrapperStyle}>
      {/* 🔹 Background Video */}
      <video autoPlay muted loop playsInline style={videoStyle}>
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={brandText}>SANSERA</h1>
        <h2 style={titleStyle}>Create Account</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
          required
        />

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={inputStyle}
          required
        />

        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={inputStyle}
          required
        />

        <button
          type="button"
          style={toggleButtonStyle}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>

        <button type="submit" style={buttonStyle}>Sign up</button>

        <div style={loginPrompt}>
          Already have an account?
          <Link to="/" style={loginLink}> Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
const wrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const videoStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  minWidth: '100%',
  minHeight: '100%',
  objectFit: 'cover',
  zIndex: -1,
  opacity: 1,
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px',
  zIndex: 1
};

const brandText = {
  fontSize: '2.4rem',
  fontWeight: 'bold',
  color: '#007BFF',
  letterSpacing: '1.5px',
  textAlign: 'center',
  marginBottom: '10px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#0056b3',
  fontSize: '1.8rem'
};

const inputStyle = {
  backgroundColor: '#f0f8ff',
  color: '#003366',
  border: '1px solid #b3d7ff',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '15px',
  fontSize: '1rem'
};

const toggleButtonStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 12px',
  fontSize: '0.85rem',
  cursor: 'pointer',
  width: '60px',
  marginBottom: '20px',
  alignSelf: 'flex-end'
};

const buttonStyle = {
  backgroundColor: '#0056b3',
  color: '#ffffff',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: '10px'
};

const loginPrompt = {
  marginTop: '20px',
  textAlign: 'center',
  fontSize: '0.9rem',
  color: '#003366'
};

const loginLink = {
  color: '#007BFF',
  marginLeft: '5px',
  textDecoration: 'underline',
  cursor: 'pointer'
};
