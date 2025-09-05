const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

dotenv.config();

const app = express();

// CORS configuration using environment variables
const allowedOrigins = [
  process.env.CORS_ORIGIN_1,
  process.env.CORS_ORIGIN_2,
  process.env.CORS_ORIGIN_3
];

app.use(cors({
  origin: allowedOrigins,
//   credentials: true
}));

app.use(express.json());

connectDB();

app.use('/api/patient', require('./routes/patientRoutes'));
app.use('/api/hospital', require('./routes/hospitalRoutes'));
app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));