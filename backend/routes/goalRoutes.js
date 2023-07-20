const express = require('express')
const router = express.Router()
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../Controllers/goalControllers')

const {protect}=require('../middleware/authMiddleware')

// THIS INSTEAD
router.route('/').get(protect,getGoals).post(protect,addGoal)
// OF THIS
// router.get('/', getGoals)
// router.post('/', addGoal)

// SAME HERE
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports=router