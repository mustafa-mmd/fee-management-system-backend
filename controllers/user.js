const UserModel= require('../models/user');

// Get user profile
const getUserProfile=async(req,res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// Update user info or feesPaid
const Update=async(req,res) => {
  try {
    const { name, email, feesPaid } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { name, email, feesPaid },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all students 
const getAllStudents=async(req,res) => {
  try {
    const students = await UserModel.find().select('name email feesPaid');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
module.exports = {getUserProfile, Update, getAllStudents};