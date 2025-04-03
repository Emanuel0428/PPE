import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana García',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Excelente atención para mi mascota. El equipo es muy profesional y cariñoso.',
    rating: 5,
    pet: '🐶 Max',
  },
  {
    name: 'Carlos Rodríguez',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'El mejor servicio veterinario que he encontrado. Siempre atentos y disponibles.',
    rating: 5,
    pet: '🐱 Luna',
  },
  {
    name: 'María Torres',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Increíble experiencia. Mi mascota recibió un tratamiento excepcional.',
    rating: 5,
    pet: '🐰 Copito',
  },
];

const TestimonialCard: React.FC<{
  name: string;
  image: string;
  text: string;
  rating: number;
  pet: string;
  index: number;
}> = ({ name, image, text, rating, pet, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-bl-[100%] -z-1 opacity-50" />
      <Quote className="w-8 h-8 text-primary-400 mb-4 opacity-50" />
      <p className="text-gray-600 mb-4 relative z-10">{text}</p>
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{pet}</p>
        </div>
        <div className="ml-auto flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Historias reales de familias que confían en nosotros para el cuidado de sus mascotas
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;