const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospitalModel');
const Appointment = require("../models/appointmentModel");
const MedicalRecord = require("../models/MedicalRecord");
const Patient = require("../models/patientModel");
const Staff = require('../models/Staff');


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

// Update hospital profile (excluding password)
exports.updateHospitalProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Prevent updating password directly here
    if (updates.password) {
      delete updates.password;
    }

    // Ensure hospital exists
    const hospital = await Hospital.findById(req.userId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Apply updates
    Object.assign(hospital, updates);
    await hospital.save();

    res.status(200).json({
      message: 'Hospital profile updated successfully',
      hospital: {
        ...hospital._doc,
        password: undefined // hide password in response
      }
    });
  } catch (err) {
    console.error('Update hospital profile error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// @desc    Get hospital stats
// @route   GET /api/hospital/stats
// @access  Private (Hospital only)
exports.getHospitalStats = async (req, res) => {
  try {
    const hospitalId = req.userId; // from auth middleware
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Ensure hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // 1. Total unique patients who visited the hospital
    const totalPatients = await MedicalRecord.distinct("patient", {
      hospital: hospitalId,
    });

    // 2. Total patients who visited today
    const patientsToday = await MedicalRecord.distinct("patient", {
      hospital: hospitalId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    // 3. Total appointments scheduled for today (to be addressed today)
    const appointmentsToday = await Appointment.countDocuments({
      hospital: hospitalId,
      date: { $gte: today, $lt: tomorrow },
    });

    // 4. Total appointments created today (regardless of scheduled date)
    const appointmentsMadeToday = await Appointment.countDocuments({
      hospital: hospitalId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    // 5. Total medical records for this hospital
    const patientRecords = await MedicalRecord.countDocuments({
      hospital: hospitalId,
    });

    // 6. Total medical records created today
    const patientRecordsToday = await MedicalRecord.countDocuments({
      hospital: hospitalId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    res.status(200).json({
      totalPatients: totalPatients.length,
      patientsToday: patientsToday.length,
      appointmentsToday,
      appointmentsMadeToday,
      patientRecords,
      patientRecordsToday,
    });
  } catch (error) {
    console.error("Error fetching hospital stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.addStaff = async (req, res) => {
  try {
    const hospitalId = req.userId; // from protect middleware
    const { name, role, specialization, email, phoneNumber } = req.body;

    // Validate inputs
    if (!name || !role || !specialization || !email || !phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
    }

    // Find hospital by ID from token
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ 
        success: false, 
        message: 'Hospital not found.' 
      });
    }

    // Prevent duplicate staff by email under same hospital
    const existingStaff = await Staff.findOne({ email, hospital: hospitalId });
    if (existingStaff) {
      return res.status(409).json({ 
        success: false, 
        message: 'A staff member with this email already exists for this hospital.' 
      });
    }

    // Create and save new staff
    const newStaff = new Staff({
      name,
      role,
      specialization,
      email,
      phoneNumber,
      hospital: hospitalId
    });

    await newStaff.save();

    // Add staff reference to hospital document
    hospital.staff.push(newStaff._id);
    await hospital.save();

    res.status(201).json({
      success: true,
      message: 'Staff added successfully.',
      staff: newStaff
    });

  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An unexpected error occurred while adding staff.',
      error: error.message 
    });
  }
};


exports.getAllStaff = async (req, res) => {
  try {
    const hospitalId = req.userId; // from protect middleware

    // Verify hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found.'
      });
    }

    // Fetch all staff linked to this hospital
    const staffList = await Staff.find({ hospital: hospitalId }).sort({ dateAdded: -1 });

    res.status(200).json({
      success: true,
      message: 'Staff list retrieved successfully.',
      total: staffList.length,
      staff: staffList
    });
  } catch (error) {
    console.error('Error fetching staff list:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while retrieving staff list.',
      error: error.message
    });
  }
};


exports.deleteStaff = async (req, res) => {
  try {
    const hospitalId = req.userId; // from protect middleware
    const { staffId } = req.params;

    // Validate input
    if (!staffId) {
      return res.status(400).json({
        success: false,
        message: 'Staff ID is required.'
      });
    }

    // Check if hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found.'
      });
    }

    // Check if staff belongs to this hospital
    const staff = await Staff.findOne({ _id: staffId, hospital: hospitalId });
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found or does not belong to this hospital.'
      });
    }

    // Delete the staff record
    await Staff.findByIdAndDelete(staffId);

    // Remove staff ID from hospital's staff array
    hospital.staff = hospital.staff.filter(
      id => id.toString() !== staffId.toString()
    );
    await hospital.save();

    res.status(200).json({
      success: true,
      message: 'Staff removed successfully.'
    });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while deleting staff.',
      error: error.message
    });
  }
};


exports.editStaff = async (req, res) => {
  try {
    const { name, role, specialization, email, phoneNumber } = req.body;
    const staffId = req.params.staffId; // ✅ match route
    const hospitalId = req.userId; // from protect middleware
    console.log(req.body);

    if (!staffId) {
      return res.status(400).json({ message: 'Staff ID is required in the URL.' });
    }

    // Check hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found.' });
    }

    // Find staff belonging to this hospital
    const staff = await Staff.findOne({ _id: staffId, hospital: hospitalId });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found or does not belong to your hospital.' });
    }

    // Update only provided fields
    if (name) staff.name = name;
    if (role) staff.role = role;
    if (specialization) staff.specialization = specialization;
    if (email) staff.email = email;
    if (phoneNumber) staff.phoneNumber = phoneNumber;

    await staff.save();

    res.status(200).json({
      message: 'Staff details updated successfully.',
      staff,
    });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
