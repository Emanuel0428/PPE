import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Scissors, Ambulance, Syringe, Bath, Heart } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Consultas Veterinarias',
    description: 'Atención médica integral para tu mascota con los mejores especialistas.',
    color: 'from-primary-400 to-primary-500',
  },
  {
    icon: Scissors,
    title: 'Peluquería Canina',
    description: 'Servicio de grooming profesional para mantener a tu mascota limpia y elegante.',
    color: 'from-secondary-400 to-secondary-600',
  },
  {
    icon: Ambulance,
    title: 'Emergencias 24/7',
    description: 'Atención de emergencias veterinarias las 24 horas, todos los días.',
    color: 'from-red-400 to-red-600',
  },
  {
    icon: Syringe,
    title: 'Vacunación',
    description: 'Programa completo de vacunación para proteger la salud de tu mascota.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Bath,
    title: 'Spa y Bienestar',
    description: 'Tratamientos relajantes y terapéuticos para el bienestar de tu mascota.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Heart,
    title: 'Cardiología',
    description: 'Especialistas en salud cardíaca para mascotas con equipos de última generación.',
    color: 'from-pink-400 to-pink-600',
  },
];

const ServiceCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}> = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      className="glass-card p-6 rounded-2xl relative overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <motion.div
        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.2 }}
      >
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una atención integral y especializada para el bienestar de tu mascota
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;