const Appointment = require('../models/appointmentModel');
const Hospital = require('../models/hospitalModel');
const User = require('../models/patientModel');

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { hospitalId, date, time, specialty, doctor, symptoms } = req.body;
    const patientId = req.userId; // Set by auth middleware

    if (!hospitalId || !date || !time || !specialty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    // Create appointment
    const appointment = new Appointment({
      patient: patientId,
      hospital: hospitalId,
      date,
      time,
      specialty,
      doctor,
      symptoms,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    console.error("Book appointment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all appointments for patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.userId;
    const appointments = await Appointment.find({ patient: patientId })
      .populate("hospital", "name address phone")
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Get appointments error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
