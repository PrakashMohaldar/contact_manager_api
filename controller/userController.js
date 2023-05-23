const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const User = require('../model/userModel.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
      }
  
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
  
      const user = new User({
        username,
        email,
        password,
      });
  
      await user.validate(); // Validate the user data against the schema
  
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
  
      await user.save();
  
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
      res.status(403);
      throw new Error('All fields are required');
    }
    const user = await User.findOne({email});

    // compare password
    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign({
        user:{
          username: user.username,
          email: user.email,
          id: user._id
        }
      }, process.env.ACCESS_TOKEN_SECRET,
      {expiresIn : "15m"})
      res.status(200).json({accessToken})
    }
    else{
      res.status(401);
      throw new Error('Invalid credentials');
    }
    res.json("register");
})
const currentUser = asyncHandler(async (req,res)=>{
    res.json("Current User");
})

module.exports = {registerUser, loginUser, currentUser}