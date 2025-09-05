const express = require('express');
const hospitalController = require('../controllers/hospitalController');   
const router = express.Router();
const protect = require('../middleware/authMiddleware');


router.post('/register', hospitalController.registerHospital);
router.post('/login', hospitalController.loginHospital);
router.get('/me', protect, hospitalController.getHospitalProfile);


module.exports = router;