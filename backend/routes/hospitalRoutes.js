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
router.put(
  "/appointments/:appointmentId/status",protect, appointmentController.updateAppointmentStatus
);


module.exports = router;