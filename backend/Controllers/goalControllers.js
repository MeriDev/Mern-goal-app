const asyncHandler=require('express-async-handler')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Getting goals' })
})

// @desc Add Goal
// @route POST /api/goals
// @access private
const addGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  res.status(200).json({message:'Goal Added'})
})

// @desc update Goal
// @route PUT /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req,res) => {
  res.status(200).json({ message: ` Goal ${req.params.id} updated`})
}
)
// @desc Delete Goal
// @route GEDT /api/goals/:id
// @access private
const deleteGoal =asyncHandler(async (req,res) => {
  res.status(200).json({ message: `Goal ${req.params.id} deleted!` })
})

module.exports={getGoals,addGoal,updateGoal,deleteGoal}