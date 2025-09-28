const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const medicalRecordController = require('../controllers/medicalRecordController');

// add new record
router.post('/', protect, medicalRecordController.addMedicalRecord);

// get all records for a patient
router.get('/:patientId', protect, medicalRecordController.getMedicalRecords);

// get all patient records for a hospital
router.get('/records/hospital', protect, medicalRecordController.getAllPatientRecordsForHospital);

// get patient records by ID card number
router.get('/card/:IdCard', medicalRecordController.getMedicalRecordsByCard);

// update a record
router.put('/:id', protect, medicalRecordController.updateMedicalRecord);

module.exports = router;
