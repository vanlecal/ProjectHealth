const express = require('express');
const hospitalController = require('../controllers/hospitalController');   
const appointmentController = require('../controllers/appointmentController')
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.post('/register', hospitalController.registerHospital);
router.post('/login', hospitalController.loginHospital);
router.get('/me', protect, hospitalController.getHospitalProfile);
router.put('/me', protect, hospitalController.updateHospitalProfile);
router.get('/appointments', protect, appointmentController.getHospitalAppointments);
router.patch('/appointments/:appointmentId/status',protect, appointmentController.updateAppointmentStatus
);
router.post('/staff/add', protect, hospitalController.addStaff); 
router.get('/staff/all', protect, hospitalController.getAllStaff);  // Get all staff for logged-in hospital
router.put('/staff/edit/:staffId', protect, hospitalController.editStaff); // Edit staff details by ID
router.delete('/staff/delete/:staffId', protect, hospitalController.deleteStaff); // Delete staff by ID
router.post('/appointments/book-for-patient', protect, appointmentController.bookAppointmentForPatient);
router.get('/stats', protect, hospitalController.getHospitalStats);

module.exports = router;