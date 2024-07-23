const express = require('express');
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../Controllers/goalControllers');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, setGoal);
// router.get('/', getGoals);
// router.post('/', setGoals);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
