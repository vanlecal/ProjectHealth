const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/patientModel');
const Hospital = require('../models/hospitalModel');

// @desc    Add a new medical record
// @route   POST /api/records
// @access  Private
const addMedicalRecord = async (req, res) => {
  try {
    const { patient, hospital, doctor, diagnosis, notes, recordType, vitals, prescriptions } = req.body;
    console.log("Request Body:", req.body);

    // Find patient by IdCard
    const existingPatient = await Patient.findOne({ IdCard: patient });
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create medical record using patient's _id
    const record = await MedicalRecord.create({
      patient: existingPatient._id,
      hospital,
      doctor,
      diagnosis,
      notes,
      recordType,
      vitals,
      prescriptions,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all medical records for a patient
// @route   GET /api/records/:patientId
// @access  Private
const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId })
      .populate('patient', 'name dob gender')
      .populate("hospital", "name")
      .sort({ visitDate: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get patient records by patient ID card number
const getMedicalRecordsByCard = async (req, res) => {
  try {
    const { IdCard } = req.params;

    // Find the patient with that ID card number
    const patient = await Patient.findOne({IdCard });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Fetch medical records linked to this patient
    const records = await MedicalRecord.find({ patient: patient._id })
      .populate("patient", "name IdCard dateOfBirth gender phone email address bloodType knownAllergies emergencyContact sex region")
      .populate("hospital", "name")
      .sort({ createdAt: -1 });

    if (records.length === 0) {
      return res.status(200).json({ message: "No medical records found", records: [] });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Update a medical record
// @route   PUT /api/records/:id
// @access  Private
const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    if (record.createdBy.toString() !== req.hospital.id) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }

    record.diagnosis = req.body.diagnosis || record.diagnosis;
    record.treatment = req.body.treatment || record.treatment;
    record.visitDate = req.body.visitDate || record.visitDate;
    record.notes = req.body.notes || record.notes;

    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// @desc    Get all patient medical records for the logged-in hospital
// @route   GET /api/records/hospital
// @access  Private (Hospital only)
const getAllPatientRecordsForHospital = async (req, res) => {
  try {
    const hospitalId = req.userId; // from JWT middleware

    // Confirm hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Fetch all records for this hospital
    const records = await MedicalRecord.find({ hospital: hospitalId })
      .populate(
        "patient",
        "name IdCard"
      )
      .populate("hospital", "name")
      .sort({ createdAt: -1 });

    if (records.length === 0) {
      return res
        .status(200)
        .json({ message: "No medical records found for this hospital", records: [] });
    }

    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching hospital records:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  addMedicalRecord,
  getMedicalRecords,
  getMedicalRecordsByCard,
  updateMedicalRecord,
  getAllPatientRecordsForHospital,
};
