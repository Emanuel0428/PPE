const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./db/db');
const UserModel = require('./models/UserModel');
const PatientModel = require('./models/PatientModel');
const AppointmentModel = require('./models/AppointmentModel');
const PurchaseModel = require('./models/PurchaseModel');
const UserController = require('./controllers/UserController');
const PatientController = require('./controllers/PatientController');
const AppointmentController = require('./controllers/AppointmentController');
const PurchaseController = require('./controllers/PurchaseController');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

(async () => {
  try {
    const db = await initDb();

    const userModel = new UserModel(db);
    const patientModel = new PatientModel(db);
    const appointmentModel = new AppointmentModel(db);
    const purchaseModel = new PurchaseModel(db);

    const userController = new UserController(userModel);
    const patientController = new PatientController(patientModel);
    const appointmentController = new AppointmentController(appointmentModel);
    const purchaseController = new PurchaseController(purchaseModel, appointmentModel); 

    app.use('/api/users', userRoutes(userController));
    app.use('/api/patients', authMiddleware, patientRoutes(patientController));
    app.use('/api/appointments', authMiddleware, appointmentRoutes(appointmentController));
    app.use('/api', authMiddleware, purchaseRoutes(purchaseController));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();