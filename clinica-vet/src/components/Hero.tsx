import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Heart, Calendar, PawPrint } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen gradient-bg flex items-center justify-center px-4 overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 opacity-20">
          <PawPrint className="w-24 h-24 text-primary-400 transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <PawPrint className="w-16 h-16 text-secondary-400 transform rotate-45" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        className="text-center lg:text-left"
      >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-2 mb-6"
          >
            <span className="text-primary-400 font-semibold flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Tu clínica veterinaria de confianza
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Veterinaria
            <span className="text-primary-400 block mt-2">SmartCare</span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-600 mb-8 h-20 bg-white/50 backdrop-blur-sm rounded-xl p-4">
            <Typewriter
              options={{
                strings: [
                  'Cuidamos a tus mascotas con amor y tecnología 🐶💙',
                  'Atención veterinaria de excelencia 🏥✨',
                  'Tu mascota es parte de nuestra familia 🐱❤️',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glow-button bg-gradient-to-r from-primary-400 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Reservar Cita
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary-400 text-primary-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Conócenos
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary-400/20 to-transparent z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <img
              src="https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=800&q=80"
              alt="Veterinario con perro"
              className="w-100 rounded-[2.5rem] transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-lg"
          >
            <Heart className="w-8 h-8 text-primary-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-4 -bottom-4 bg-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clientes Satisfechos</p>
              <p className="text-xl font-bold text-gray-800">2,000+</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;