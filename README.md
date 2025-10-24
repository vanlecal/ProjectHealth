# HealthSync

HealthSync is a comprehensive healthcare management platform that centralizes patient medical records, enables seamless appointment booking, and provides secure access for both patients and healthcare providers. The platform ensures HIPAA-compliant data handling with bank-level security, allowing patients to manage their health information and hospitals to access complete patient histories for better care delivery.

## Features

### For Patients
- **Secure Account Creation**: Register using National Insurance ID with encrypted data storage.
- **Centralized Medical Records**: Access complete medical history, prescriptions, and treatment records from all partner hospitals in one place.
- **Appointment Booking**: Easily schedule appointments with verified hospitals based on specialties and availability.
- **Real-time Access**: View health information 24/7 from any device.
- **Profile Management**: Update personal information and preferences securely.

### For Hospitals
- **Hospital Registration**: Verified registration process for licensed healthcare providers.
- **Patient Lookup**: Search and access patient records using National Insurance ID.
- **Record Management**: Add diagnoses, prescriptions, treatments, and appointment details to patient profiles.
- **Staff Management**: Manage hospital staff, including doctors, nurses, and administrators.
- **Dashboard Analytics**: Overview of patients, appointments, and hospital performance metrics.

### Security & Compliance
- **HIPAA Compliant**: Adheres to healthcare data privacy standards.
- **Bank-Level Security**: End-to-end encryption for all data transmission and storage.
- **JWT Authentication**: Secure token-based authentication for all users.
- **Role-Based Access**: Different access levels for patients, hospital staff, and administrators.

## Tech Stack

### Frontend
- **React**: Component-based UI library with TypeScript for type safety.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Radix UI**: Accessible UI components for consistent design.
- **React Router**: Client-side routing for navigation.
- **Axios**: HTTP client for API requests.
- **React Hot Toast**: Notification system for user feedback.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for flexible data storage.
- **Mongoose**: ODM for MongoDB with schema validation.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcryptjs**: Password hashing for user security.
- **CORS**: Cross-origin resource sharing configuration.

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/healthsync
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN_1=http://localhost:5173
   CORS_ORIGIN_2=http://localhost:3000
   ```

4. Start the MongoDB service (if running locally).

5. Run the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the HealthSync directory:
   ```bash
   cd HealthSync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Usage

1. **Homepage**: Visit the homepage to learn about HealthSync features and navigate to login/register.
2. **Patient Registration/Login**: Patients can sign up or log in to access their dashboard, view records, and book appointments.
3. **Hospital Registration/Login**: Hospitals can register and manage their profiles, staff, patients, and records.
4. **Dashboards**: Separate dashboards for patients (view history, book appointments) and hospitals (manage records, staff, overview).

### API Endpoints

#### Patient Routes
- `POST /api/patient/register` - Register a new patient
- `POST /api/patient/login` - Patient login
- `GET /api/patient/profile` - Get patient profile
- `PUT /api/patient/profile` - Update patient profile

#### Hospital Routes
- `POST /api/hospital/register` - Register a new hospital
- `POST /api/hospital/login` - Hospital login
- `GET /api/hospital/dashboard` - Get hospital dashboard data
- `POST /api/hospital/staff` - Add hospital staff
- `GET /api/hospital/staff` - Get hospital staff list

#### Medical Records Routes
- `GET /api/medical-records/:patientId` - Get patient medical records
- `POST /api/medical-records` - Add new medical record
- `PUT /api/medical-records/:id` - Update medical record

#### Appointment Routes
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment status

## Project Structure

```
ProjectHealth/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── appointmentController.js
│   │   ├── hospitalController.js
│   │   ├── medicalRecordController.js
│   │   └── patientController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── appointmentModel.js
│   │   ├── hospitalModel.js
│   │   ├── MedicalRecord.js
│   │   ├── patientModel.js
│   │   └── Staff.js
│   ├── routes/
│   │   ├── hospitalRoutes.js
│   │   ├── medicalRecordRoutes.js
│   │   └── patientRoutes.js
│   ├── server.js
│   ├── package.json
│   └── README.md
├── HealthSync/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── hospital/
│   │   │   └── patient/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── AppRoutes.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
├── MDDTools/
├── README.md
├── jot.txt
└── .gitignore
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

Please ensure all contributions follow the project's coding standards and include appropriate tests.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For support or inquiries:
- Email: support@healthsync.com
- Phone: +1 (555) 123-4567

© 2025 HealthSync. All rights reserved.
