const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

// User signup route
const signup = async (req, res) => {
  try{
    const { name, email, password } = req.body;

    //validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //check if user already exists
    const existingUser = await UserModel.findOne({  
      email: email
    }); 
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword
    });
    //save user to database
    await newUser.save();
    //generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        fessPaid: newUser.feesPaid
      }
    });

  }catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// User login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //check if user exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    //check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    //generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        feesPaid: user.feesPaid
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = {  
  signup,
  login
};