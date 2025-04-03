import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, MessageSquare, PawPrint } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AppointmentForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  petName: string;
  petType: string;
  reason: string;
}

const Appointment: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentForm>();
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: AppointmentForm) => {
    if (!user) {
      alert('Por favor, inicia sesión para reservar una cita');
      navigate('/login');
      return;
    }

    try {
      // Crear paciente
      const patientResponse = await api.post('/patients', {
        user_id: user.id, 
        name: data.petName,
        species: data.petType,
        breed: '',
        birth_date: '',
      });

      const patientId = patientResponse.data.id;

      // Crear cita
      await api.post('/appointments', {
        user_id: user.id, 
        patient_id: patientId,
        date: data.date,
        time: data.time,
        service_type: 'Consulta',
        reason: data.reason,
      });

      alert('Cita reservada con éxito');
      setStep(1); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error al reservar la cita');
      }
      else {
        setError('Error al reservar la cita');
      }
    }
  };

  const steps = [
    { number: 1, title: 'Datos Personales', icon: User },
    { number: 2, title: 'Fecha y Hora', icon: Calendar },
    { number: 3, title: 'Información Mascota', icon: PawPrint },
  ];

  return (
    <section id="reservar" className="py-20 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Reserva tu Cita
          </h2>
          <p className="text-xl text-gray-600">
            Agenda una cita con nuestros especialistas en pocos pasos
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div key={s.number} className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      step >= s.number ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-24 mx-4 ${
                      step > s.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('name', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('phone', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+34 XXX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      {...register('date', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="time"
                      {...register('time', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Mascota
                  </label>
                  <div className="relative">
                    <PawPrint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('petName', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nombre de tu mascota"
                    />
                    {errors.petName && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Mascota
                  </label>
                  <select
                    {...register('petType', { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecciona el tipo</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="conejo">Conejo</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.petType && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo de la Consulta
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      {...register('reason', { required: true })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe brevemente el motivo de tu visita"
                    />
                    {errors.reason && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-lg border-2 border-primary-500 text-primary-600 font-semibold hover:bg-primary-50"
                >
                  Anterior
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => step < 3 ? setStep(step + 1) : handleSubmit(onSubmit)()}
                className="ml-auto px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700"
              >
                {step === 3 ? 'Reservar Cita' : 'Siguiente'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;