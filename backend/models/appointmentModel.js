const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientUser', // Your patient model
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HospitalUser', // Your hospital model
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  specialty: { type: String, required: true },
  doctor: { type: String, required: false },
  symptoms: { type: String, required: false },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
