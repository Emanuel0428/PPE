import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Heart, Calendar, PawPrint } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen gradient-bg flex items-center justify-center px-6 py-6 overflow-hidden pt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-12 opacity-20">
          <PawPrint className="w-20 h-20 text-primary-400 transform -rotate-12" />
        </div>
        <div className="absolute bottom-24 right-12 opacity-20">
          <PawPrint className="w-12 h-12 text-secondary-400 transform rotate-45" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
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
            className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 mb-4"
          >
            <span className="text-primary-400 font-semibold flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Tu clínica veterinaria de confianza
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Veterinaria
            <span className="text-primary-400 block mt-2">SmartCare</span>
          </h1>

          <div className="text-lg md:text-xl text-gray-600 mb-6 h-16 bg-white/50 backdrop-blur-sm rounded-xl p-3">
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

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glow-button bg-gradient-to-r from-primary-400 to-primary-500 text-white px-6 py-3 rounded-full font-medium text-base shadow-lg flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/appointment'}
            >
              <Calendar className="w-4 h-4" />
              Reservar Cita
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary-400 text-primary-400 px-6 py-3 rounded-full font-medium text-base hover:bg-primary-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
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
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
            <motion.div
              className="relative inset-0 bg-gradient-to-tr from-primary-400/20 to-transparent z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <img
              src="https://i.postimg.cc/J0LtCgpZ/Veterinaria-Smart-Care.webp?auto=format&fit=crop&w=800&q=80"
              alt="Veterinario con perro"
              className="w-full rounded-[2rem] transform hover:scale-105 transition-transform duration-700"
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
            className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg"
          >
            <Heart className="w-6 h-6 text-primary-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-4 -bottom-4 bg-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clientes Satisfechos</p>
              <p className="text-lg font-bold text-gray-800">2,000+</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;