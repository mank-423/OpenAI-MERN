const User = require('../models/UserSchema');

exports.createUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Creating new user
    const newUser = new User({ userId });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', userId: newUser.userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
