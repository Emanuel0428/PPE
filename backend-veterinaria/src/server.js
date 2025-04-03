const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDb } = require('./db/db');
const UserModel = require('./models/UserModel');
const PatientModel = require('./models/PatientModel');
const AppointmentModel = require('./models/AppointmentModel');
const MessageModel = require('./models/MessageModel');
const UserController = require('./controllers/UserController');
const PatientController = require('./controllers/PatientController');
const AppointmentController = require('./controllers/AppointmentController');
const MessageController = require('./controllers/MessageController');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const messageRoutes = require('./routes/messageRoutes');

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
    const messageModel = new MessageModel(db);

    const userController = new UserController(userModel);
    const patientController = new PatientController(patientModel);
    const appointmentController = new AppointmentController(appointmentModel);
    const messageController = new MessageController(messageModel);

    app.use('/api/users', userRoutes(userController));
    app.use('/api/patients', patientRoutes(patientController));
    app.use('/api/appointments', appointmentRoutes(appointmentController));
    app.use('/api/messages', messageRoutes(messageController));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();