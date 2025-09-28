const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "PatientUser", 
      required: true 
    },
    hospital: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "HospitalUser", 
      required: true 
    },
    doctor: { type: String, required: true }, 

    date: { type: Date, default: Date.now },

    diagnosis: { type: String, required: true },
    notes: { type: String },
    recordType: { type: String },

    vitals: {
      bp: String,
      hr: String,
      temp: String,
      weight: String,
    },

    prescriptions: [
      {
        medication: String,
        dosage: String,
        frequency: String,
        duration: String,
      }
    ],
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecord;
