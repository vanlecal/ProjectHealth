const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  sex: { type: String, required: true },
  IdCard: { type: String, required: true },
  region: { type: String, required: true },
  role: { type: String, default: 'patient' },

  // New fields
  dateOfBirth: { type: Date, required: false },  
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: false, default: null },
  emergencyContact: {
    name: { type: String, required: false },
    phone: { type: String, required: false }
  },
  knownAllergies: [{ type: String }] // array of strings, e.g., ['Peanuts', 'Penicillin']
});

const User = mongoose.model('PatientUser', userSchema);
module.exports = User;
