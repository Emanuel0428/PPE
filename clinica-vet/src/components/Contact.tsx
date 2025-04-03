import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../api';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Av. Principal 123, Ciudad',
      color: 'text-blue-500',
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+34 912 345 678',
      color: 'text-green-500',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contacto@smartcare.vet',
      color: 'text-purple-500',
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun-Dom: 24 horas',
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
          >
            <div className={`p-3 rounded-full bg-opacity-10 ${item.color.replace('text', 'bg')}`}>
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ContactForm) => {
    try {
      await api.post('/messages', data);
      setSuccess('Mensaje enviado con éxito');
      setError(null);
      reset(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Error al enviar el mensaje');
      } else {
        setError('Error al enviar el mensaje');
      }
      setSuccess(null);
    }
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contacto
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para atenderte 24/7. No dudes en contactarnos para cualquier emergencia
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfo />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  {...register('message', { required: true })}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">Este campo es requerido</p>}
              </div>
              {success && <p className="text-green-500 text-sm">{success}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;