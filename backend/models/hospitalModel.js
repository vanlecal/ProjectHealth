const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Hospital name
  email: { type: String, required: true, unique: true }, // For login
  password: { type: String, required: true }, // Hashed password
  phone: { type: String, required: true },
  region: { type: String, required: true },
  address: { type: String, required: true }, // Hospital physical address
  registrationNumber: { type: String, required: true, unique: true }, // Unique hospital ID
  role: { type: String, default: 'hospital' },

  // Extra hospital-specific info
  type: { 
    type: String, 
    enum: ['General', 'Specialist', 'Clinic', 'Teaching', 'Other'], 
    required: false
  },
  capacity: { type: Number, required: false }, // No. of beds / patients hospital can handle
  departments: [{ type: String }], // Example: ['Cardiology', 'Pediatrics', 'Oncology']
  establishedDate: { type: Date, required: false }, // When hospital was founded
  emergencyAvailable: { type: Boolean, default: false } // 24/7 emergency services
});

const Hospital = mongoose.model('HospitalUser', hospitalSchema);
module.exports = Hospital;
