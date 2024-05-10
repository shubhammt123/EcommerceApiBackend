const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
const Review = require('../model/review');
const Rating = require('../model/rating');

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, dob, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  };

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const reviews = await Review.find({ user: userId });
    const ratings = await Rating.find({ user: userId });

        
    user._doc.reviews = reviews;  
    user._doc.ratings = ratings;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.setHeader("Authorization",`Bearer ${token}`)
    res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };
  

  exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await User.findByIdAndDelete(userId);
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  };