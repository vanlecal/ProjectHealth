// backend/models/Staff.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Doctor', 'Nurse', 'Lab Technician', 'Pharmacist', 'Receptionist'], 
    default: 'Nurse' 
  },
  specialization: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  hospital: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'HospitalUser', 
    required: true 
  },
  dateAdded: { type: Date, default: Date.now }
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
