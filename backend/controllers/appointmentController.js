const Appointment = require('../models/appointmentModel');
const Hospital = require('../models/hospitalModel');
const User = require('../models/patientModel');

// Book an appointment By Patient
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

// Get all appointments for hospital
exports.getHospitalAppointments = async (req, res) => {
  try {
    const hospitalId = req.userId; // from authMiddleware (hospital logged in)

    const appointments = await Appointment.find({ hospital: hospitalId })
      .populate("patient", "name email phone sex region IdCard") // fetch patient details
      .populate("hospital", "name address phone") // optional: show hospital info
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Get hospital appointments error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


//UPDATE APPOINTMENT STATUS
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const hospitalId = req.userId; // from authMiddleware (hospital logged in)
    const { appointmentId } = req.params;
    const { status } = req.body; // expected values: 'confirmed', 'denied', 'completed'
    console.log(req.body);

    // validate status
    const allowedStatuses = ["Confirmed", "Cancelled", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // check appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // make sure hospital owns the appointment
    if (appointment.hospital.toString() !== hospitalId) {
      return res.status(403).json({ message: "Not authorized to update this appointment" });
    }

    // update status
    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: `Appointment status updated to ${status}`,
      appointment,
    });
  } catch (err) {
    console.error("Update appointment status error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Book an appointment for a patient (Hospital creates it using patient's IdCard)
exports.bookAppointmentForPatient = async (req, res) => {
  try {
    const hospitalId = req.userId; // hospital logged-in via auth middleware
    const {
      IdCard,             // primary expected field name
      patientIdCard,      // alternate
      date,
      time,
      specialty,
      doctor,
      symptoms,
    } = req.body;

    console.log("Hospital ID:", hospitalId);
    console.log("Booking appointment for patient:", req.body);

    const patientCard = IdCard || patientIdCard;
    if (!patientCard || !date || !time || !specialty) {
      return res.status(400).json({ message: "Missing required fields. Provide IdCard, date, time and specialty." });
    }

    // Confirm hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) return res.status(404).json({ message: "Hospital not found or unauthorized" });

    // Find patient by IdCard
    const patient = await User.findOne({ IdCard: patientCard });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found with provided IdCard" });
    }

    // Parse & validate date
    const apptDate = new Date(date);
    if (isNaN(apptDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // check for conflicting appointment (same patient, same date & time)
    const conflict = await Appointment.findOne({
      patient: patient._id,
      date: apptDate,
      time,
    });
    if (conflict) {
      return res.status(409).json({ message: "Patient already has an appointment at that date/time" });
    }

    // Create appointment (hospital-created appointments set to Confirmed by default)
    const appointment = new Appointment({
      patient: patient._id,
      hospital: hospitalId,
      date: apptDate,
      time,
      specialty,
      doctor,
      symptoms,
      status: "Confirmed", // hospital-created -> confirmed
    });

    await appointment.save();

    // populate patient & hospital info for the response
    await appointment.populate("patient", "name email phone IdCard");
    await appointment.populate("hospital", "name address phone");

    res.status(201).json({
      message: "Appointment booked for patient successfully",
      appointment,
    });
  } catch (err) {
    console.error("Hospital book-for-patient error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
