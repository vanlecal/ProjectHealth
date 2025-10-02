const express = require('express');
const patientController = require('../controllers/patientController');
const { bookAppointment, getPatientAppointments } = require('../controllers/appointmentController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.post('/register', patientController.registerUser);
router.post('/login', patientController.loginUser);
router.get('/me', protect, patientController.getPatientProfile);
router.put('/me', protect, patientController.updatePatientProfile);
router.get('/gethospitals', patientController.getAllHospitals);

// Patient books appointment
router.post('/book', protect, bookAppointment);

// Get all appointments of logged-in patient
router.get('/myappointments', protect, getPatientAppointments);

// Get user statistics
router.get('/stat', protect, patientController.getPatientDashboardStats);


module.exports = router;