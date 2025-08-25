const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/patientModel');


exports.registerUser = async (req, res) => {
    try {
      const { name, IdCard, phone, email, sex, region, password } = req.body;
      console.log(req.body);
  
      if (!name || !IdCard || !phone || !email || !password || !sex || !region) {
        return res.status(400).json({ message: 'Please fill all fields' });
      }
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, IdCard, phone, email, sex, region, password: hashedPassword, role: 'patient' });
      await user.save();
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(201).json({ token });
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  



// Login user
exports.loginUser = async (req, res) => {
  const { InsuranceID, password } = req.body;
  const IdCard = InsuranceID; // Map InsuranceID to IdCard
  console.log(IdCard);
  console.log(req.body);
  try {
    const user = await User.findOne({ IdCard });
    if (!user) return res.status(400).json({ message: 'Invalid User' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Patient profile
exports.getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update patient profile
exports.updatePatientProfile = async (req, res) => {
  try {
    const updates = req.body;

    // Disallow changing protected fields
    const disallowedFields = ['password', 'role', '_id', 'email'];
    disallowedFields.forEach((field) => delete updates[field]);
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        delete req.body[key];
      }
    });

    // Find and update
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true, select: '-password' } // return updated doc without password
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

