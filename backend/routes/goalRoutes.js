const express = require('express')
const router = express.Router()
const {getGoals, addGoal, updateGoal, deleteGoal}=require('../Controllers/goalControllers')

// THIS INSTEAD
router.route('/').get(getGoals).post(addGoal)
// OF THIS
// router.get('/', getGoals)
// router.post('/', addGoal)

// SAME HERE
router.route('/:id').put(updateGoal).delete(deleteGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports=router