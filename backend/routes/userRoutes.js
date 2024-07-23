const express = require('express');
const {
  registerUser,
  loginUser,
  getUser,
} = require('../Controllers/userController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getUser);

module.exports = router;
