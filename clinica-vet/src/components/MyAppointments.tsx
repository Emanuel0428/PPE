import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, PawPrint, CreditCard, AlertCircle, Trash2 } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  appointment_id: number;
  user_id: number;
  patient_id: number;
  date: string;
  time: string;
  service_type: string;
  reason: string;
  status: string;
  pet_name: string;
  pet_species: string;
  pet_breed: string;
  pet_birth_date: string;
  payment_methods: string | null;
  total: number | null;
  purchase_service: string | null;
  purchase_date: string | null;
}

const MyAppointments: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Para mostrar mensaje de éxito al eliminar

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/appointments/user/${user.id}`);
        setAppointments(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error al cargar las citas');
        console.error('Error al obtener citas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleDelete = async (appointmentId: number) => {
    // Mostrar confirmación al usuario
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      await api.delete(`/appointments/${appointmentId}`);
      // Actualizar la lista de citas eliminando la cita borrada
      setAppointments(appointments.filter((appt) => appt.appointment_id !== appointmentId));
      setSuccessMessage('Cita eliminada con éxito.');
      setError(null);

      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la cita');
      console.error('Error al eliminar cita:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-4 bg-gray-50 text-center">
        <p className="text-lg text-gray-600">Cargando tus citas...</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-400 mb-4">Mis Citas</h2>
          <p className="text-xl text-gray-600">Revisa tus citas programadas</p>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center justify-center">
            <p>{successMessage}</p>
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">No tienes citas programadas.</p>
            <button
              onClick={() => navigate('/appointment')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Reservar una cita
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.appointment_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Cita para {appointment.pet_name}
                    </h3>
                    <p className="text-gray-600">
                      <PawPrint className="inline-block w-5 h-5 mr-2" />
                      {appointment.pet_species} - {appointment.pet_breed}
                    </p>
                    <p className="text-gray-600">
                      Fecha de nacimiento: {appointment.pet_birth_date}
                    </p>
                    <p className="text-gray-600">
                      <Calendar className="inline-block w-5 h-5 mr-2" />
                      {appointment.date}
                    </p>
                    <p className="text-gray-600">
                      <Clock className="inline-block w-5 h-5 mr-2" />
                      {appointment.time}
                    </p>
                    <p className="text-gray-600">Servicio: {appointment.service_type}</p>
                    <p className="text-gray-600">Motivo: {appointment.reason}</p>
                    <p className="text-gray-600">
                      Estado:{' '}
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-sm ${
                          appointment.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {appointment.status === 'pending'
                          ? 'Pendiente'
                          : appointment.status === 'confirmed'
                          ? 'Confirmada'
                          : 'Cancelada'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-primary-400">Detalles de Pago</h4>
                    {appointment.payment_methods ? (
                      <>
                        <p className="text-gray-600">
                          <CreditCard className="inline-block w-5 h-5 mr-2" />
                          Método: {appointment.payment_methods}
                        </p>
                        <p className="text-gray-600">
                          Servicio comprado: {appointment.purchase_service}
                        </p>
                        <p className="text-gray-600">Total: ${appointment.total}</p>
                        <p className="text-gray-600">
                          Fecha de compra: {appointment.purchase_date}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-600">No hay información de pago disponible.</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(appointment.appointment_id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                  title="Eliminar cita"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;