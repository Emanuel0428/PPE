import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, PawPrint, CreditCard } from 'lucide-react';
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
  service: string;
  paymentMethod: string;
  total: number;
}

const Appointment: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<AppointmentForm>({
    defaultValues: { total: 0 },
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const services = [
    { name: 'Consulta general', price: 30 },
    { name: 'Vacunación', price: 20 },
    { name: 'Cirugía menor', price: 100 },
  ];

  const onSubmit = async (data: AppointmentForm) => {
    if (!user || !user.id) {
      setError('Por favor, inicia sesión para reservar una cita');
      navigate('/login');
      return;
    }

    try {
      // Paso 1-3: Crear paciente y cita
      if (step <= 3) {
        const patientResponse = await api.post('/patients', {
          user_id: user.id,
          name: data.petName,
          species: data.petType,
          breed: '',
          birth_date: '',
        });

        const patientId = patientResponse.data.id;

        const appointmentResponse = await api.post('/appointments', {
          user_id: user.id,
          patient_id: patientId,
          date: data.date,
          time: data.time,
          service_type: data.service || 'Consulta',
          reason: data.reason,
        });

        const appointmentId = appointmentResponse.data.id;

        if (step === 3) {
          setStep(4);
          setValue('service', '');
          setValue('paymentMethod', '');
          setValue('total', 0);
          localStorage.setItem('appointmentId', appointmentId.toString());
        }
      }

      // Paso 4: Registrar compra
      if (step === 4) {
        const appointmentId = localStorage.getItem('appointmentId');
        if (!appointmentId) {
          setError('No se encontró una cita válida. Por favor, reinicia el proceso.');
          return;
        }

        await api.post('/compras', {
          cita_id: parseInt(appointmentId, 10),
          service: data.service,
          payment_methods: data.paymentMethod,
          total: data.total,
        });

        alert('Cita y compra registradas con éxito');
        reset();
        setStep(1);
        localStorage.removeItem('appointmentId');
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Error al procesar la solicitud');
    }
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = services.find((s) => s.name === e.target.value);
    setValue('service', e.target.value);
    setValue('total', selectedService?.price || 0);
  };

  const steps = [
    { number: 1, title: 'Datos Personales', icon: User },
    { number: 2, title: 'Fecha y Hora', icon: Calendar },
    { number: 3, title: 'Información Mascota', icon: PawPrint },
    { number: 4, title: 'Pago', icon: CreditCard },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Reserva tu Cita</h2>
          <p className="text-xl text-gray-600">Agenda tu cita en pocos pasos</p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between mb-6">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-sm mt-2">{s.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('name', { required: 'Este campo es requerido' })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('phone', { required: 'Este campo es requerido' })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="+34 XXX XXX XXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      {...register('date', { required: 'Este campo es requerido' })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hora</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      {...register('time', { required: 'Este campo es requerido' })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre de la Mascota</label>
                  <div className="relative">
                    <PawPrint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('petName', { required: 'Este campo es requerido' })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      placeholder="Nombre de tu mascota"
                    />
                    {errors.petName && <p className="text-red-500 text-sm">{errors.petName.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Mascota</label>
                  <select
                    {...register('petType', { required: 'Este campo es requerido' })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Selecciona el tipo</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="conejo">Conejo</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.petType && <p className="text-red-500 text-sm">{errors.petType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Motivo</label>
                  <textarea
                    {...register('reason', { required: 'Este campo es requerido' })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Describe el motivo de la consulta"
                  />
                  {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Servicio</label>
                  <select
                    {...register('service', { required: 'Este campo es requerido' })}
                    onChange={handleServiceChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service) => (
                      <option key={service.name} value={service.name}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                  <select
                    {...register('paymentMethod', { required: 'Este campo es requerido' })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Selecciona un método</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                  {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total</label>
                  <input
                    {...register('total', { required: 'Este campo es requerido' })}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    readOnly
                  />
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Anterior
                </button>
              )}
              <button
                type={step === 4 ? 'submit' : 'button'}
                onClick={step < 4 ? handleNextStep : undefined}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg ml-auto"
              >
                {step === 4 ? 'Confirmar' : 'Siguiente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;