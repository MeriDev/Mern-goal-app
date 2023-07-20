const User = require('../models/userModel')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

// @desc register User
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName,email,password } = req.body

  if (!userName || !email || !password) {
    res.status(400)
    throw new Error('Please enter all fields')
  }
  
  const userExists =await User.findOne({email})
  if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt)

  // create user
  const user = await User.create({
      userName,email,password:hashedPassword
    })
  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token:generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => { 
  const { email, password } = req.body

  // check user
  const user = await User.findOne({ email })
  
  // match the password
  if ( user && (await bcrypt.compare(password,user.password))) {
    
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

})

// @desc Get user data
// @route POST /api/users/me
// @access private
const getUser = asyncHandler(async (req, res) => { 
  const { _id, userName, email } = await User.findById(req.user.id)
  
  res.status(200).json({id:_id,userName,email})
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET,{expiresIn:"30d"})
}



module.exports = {
  registerUser,loginUser,getUser
}

