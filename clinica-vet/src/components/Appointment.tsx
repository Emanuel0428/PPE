import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, MessageSquare, PawPrint, CreditCard } from 'lucide-react';
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
  service?: string;
  payment_methods?: string;
  total?: number;
}

const Appointment: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue, reset, trigger } = useForm<AppointmentForm>({
    defaultValues: {
      total: 0,
    },
  });
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const servicios = [
    { nombre: 'Consulta general', precio: 30 },
    { nombre: 'Vacunación', precio: 20 },
    { nombre: 'Cirugía menor', precio: 100 },
  ];

  const onSubmit = async (data: AppointmentForm) => {
    console.log('onSubmit ejecutado con datos:', data);
    console.log('Usuario actual:', user);
    if (!user || !user.id) {
      alert('Por favor, inicia sesión para reservar una cita');
      navigate('/login');
      return;
    }

    try {
      if (step <= 3) {
        console.log('Paso 1-3: Creando paciente y cita');
        const patientResponse = await api.post('/patients', {
          user_id: user.id,
          name: data.petName,
          species: data.petType,
          breed: '',
          birth_date: '',
        });
        console.log('Respuesta de /patients:', patientResponse.data);

        const patientId = patientResponse.data.id;

        const appointmentResponse = await api.post('/appointments', {
          user_id: user.id,
          patient_id: patientId,
          date: data.date,
          time: data.time,
          service_type: data.service || 'Consulta',
          reason: data.reason,
        });
        console.log('Respuesta de /appointments:', appointmentResponse.data);

        const newAppointmentId = appointmentResponse.data.id;
        setAppointmentId(newAppointmentId);
        alert('Cita creada con éxito. Ahora selecciona el pago.');
        setStep(4);
      } else if (step === 4) {
        console.log('Paso 4: Registrando compra');
        if (!appointmentId) {
          setError('No se ha creado una cita válida. Por favor, reinicia el proceso.');
          return;
        }

        if (!data.service || !data.payment_methods || !data.total) {
          setError('Por favor, completa todos los campos de pago.');
          return;
        }

        const purchaseResponse = await api.post('/api/compras', {
          cita_id: appointmentId,
          payment_methods: data.payment_methods,
          total: data.total,
          service: data.service,
        });
        console.log('Respuesta de /api/compras:', purchaseResponse.data);

        alert('Cita y compra registradas con éxito');
        reset();
        setStep(1);
        setAppointmentId(null);
        setError(null);
      }
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || 'Error desconocido';
      setError(errorMessage);
      console.error('Error en el proceso:', errorMessage);
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate: { [key in 1 | 2 | 3]: readonly (keyof AppointmentForm)[] } = {
      1: ['name', 'phone'],
      2: ['date', 'time'],
      3: ['petName', 'petType', 'reason'],
    };

    if (step < 4) {
      const isValid = await trigger(fieldsToValidate[step as 1 | 2 | 3]);
      if (isValid) {
        setStep(step + 1);
      } else {
        console.log('Validación fallida en paso', step, errors);
      }
    }
  };

  const steps = [
    { number: 1, title: 'Datos Personales', icon: User },
    { number: 2, title: 'Fecha y Hora', icon: Calendar },
    { number: 3, title: 'Información Mascota', icon: PawPrint },
    { number: 4, title: 'Pago', icon: CreditCard },
  ];

  const handleServicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servicioSeleccionado = servicios.find((s) => s.nombre === e.target.value);
    setValue('service', e.target.value);
    setValue('total', servicioSeleccionado?.precio ?? 0);
  };

  return (
    <section id="reservar" className="py-20 px-4 pt-20 bg-gray-50">
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
                <div key={s.number} className="flex items-center relative group">
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
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {s.title}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-24 mx-4 ${
                        step > s.number ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
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

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servicio
                  </label>
                  <select
                    {...register('service', { required: true })}
                    onChange={handleServicioChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                  >
                    <option value="">Seleccione un servicio</option>
                    {servicios.map((servicio) => (
                      <option key={servicio.nombre} value={servicio.nombre}>
                        {servicio.nombre} - ${servicio.precio}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de Pago
                  </label>
                  <select
                    {...register('payment_methods', { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700"
                  >
                    <option value="">Seleccione método</option>
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                  {errors.payment_methods && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total
                  </label>
                  <input
                    type="text"
                    {...register('total', { required: true })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold"
                    readOnly
                  />
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
                type={step === 4 ? 'submit' : 'button'}
                onClick={step < 4 ? handleNextStep : undefined}
                className="ml-auto px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700"
              >
                {step === 4 ? 'Confirmar Compra' : 'Siguiente'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;