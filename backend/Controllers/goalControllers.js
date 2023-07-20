const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User=require('../models/userModel')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  const goals=await Goal.find( {user:req.user.id})

  res.status(200).json(goals)
})

// @desc Add Goal
// @route POST /api/goals
// @access private
const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user:req.user.id
  })

  res.status(200).json(goal)
})

// @desc update Goal
// @route PUT /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal= await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  
  //check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

// Make sure the logged in user matches the goal user
  if (goal.user.toString()!==user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
  res.status(200).json(updatedGoal)
}
)
// @desc Delete Goal
// @route GEDT /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  
  //check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

// Make sure the logged in user matches the goal user
  if (goal.user.toString()!==user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.deleteOne()
  
  res.status(200).json({id:req.params.id})
})

module.exports={getGoals,addGoal,updateGoal,deleteGoal}