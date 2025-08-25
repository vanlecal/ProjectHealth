const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.post('/register', patientController.registerUser);
router.post('/login', patientController.loginUser);
router.get('/me', protect, patientController.getPatientProfile);

module.exports = router;