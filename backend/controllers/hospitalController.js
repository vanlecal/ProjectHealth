const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospitalModel');


// Register hospital
exports.registerHospital = async (req, res) => {
  try {
    const { name, registrationNumber, phone, email, region, address, type, password } = req.body;
    console.log(req.body);

    if (!name || !registrationNumber || !phone || !email || !region || !address || !type || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Check for existing hospital by email or registration number
    const existingHospital = await Hospital.findOne({ $or: [{ email }, { registrationNumber }] });
    if (existingHospital) {
      return res.status(409).json({ message: 'Email or Registration Number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = new Hospital({
      name,
      registrationNumber,
      phone,
      email,
      region,
      address,
      type,
      password: hashedPassword,
      role: 'hospital'
    });

    await hospital.save();

    const token = jwt.sign({ id: hospital._id, role: hospital.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Hospital registration error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login hospital
exports.loginHospital = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email });
    if (!hospital) return res.status(400).json({ message: 'Invalid Email' });

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign({ id: hospital._id, role: hospital.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Hospital login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get hospital profile
exports.getHospitalProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.userId).select('-password');
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    res.status(200).json(hospital);
  } catch (err) {
    console.error('Fetch hospital profile error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

