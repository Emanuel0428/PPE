import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="w-8 h-8 text-primary-600" />
          <span className="text-2xl font-bold text-gray-800">SmartCare</span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition duration-300">
            Inicio
          </Link>
          <Link to="/services" className="text-gray-600 hover:text-primary-600 transition duration-300">
            Servicios
          </Link>
          <Link to="/testimonials" className="text-gray-600 hover:text-primary-600 transition duration-300">
            Testimonios
          </Link>
          <Link to="/appointment" className="text-gray-600 hover:text-primary-600 transition duration-300">
            Reservar Cita
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition duration-300">
            Contacto
          </Link>
          {user ? (
            <>
              <span className="text-gray-600">Hola, {user.name}</span>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-primary-600 transition duration-300"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 transition duration-300">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-primary-600 transition duration-300">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;