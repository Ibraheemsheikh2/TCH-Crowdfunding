const express = require('express');
const { signup, signin, forgotPassword, resetPassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);








// Protected route - Get current user session
router.get('/me', auth, async (req, res) => {
  try {
    const users = await User.getAll();
    const currentUser = users.find(user => user.id === req.user.userId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = currentUser;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});



module.exports = router; 