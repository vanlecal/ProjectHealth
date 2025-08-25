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
});

const User = mongoose.model('PatientUser', userSchema);
module.exports = User;
