const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup

router.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;


  try {


    const exists = await User.findOne({ $or: [{ email }, { username }] });
if (exists) return res.status(400).json({ message: 'Email or username already exists' });

const hash = await bcrypt.hash(password, 10);

// Check if any admin exists
const adminExists = await User.exists({ role: 'admin' });
const role = adminExists ? 'user' : 'admin';

const user = new User({ email, username, password: hash, role });
await user.save();


    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const token = jwt.sign(
  { id: user._id, role: user.role,username: user.username }, // ✅ include role
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);


    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role, 
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, 'email role'); // send only safe fields
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/users/:id/promote', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// DELETE user (admin only)
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;


