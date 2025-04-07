import React, { useState, FormEvent } from 'react';

interface FormData {
  cita_id: string;
  service: string;
  payment_methods: string;
  total: number;
}

const CompraForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cita_id: '',
    service: '',
    payment_methods: '',
    total: 0,
  });

  const servicios = [
    { nombre: 'Consulta general', precio: 30 },
    { nombre: 'Vacunación', precio: 20 },
    { nombre: 'Cirugía menor', precio: 100 },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsedFormData = {
      ...formData,
      cita_id: parseInt(formData.cita_id, 10),
    };

    if (isNaN(parsedFormData.cita_id)) {
      alert('El ID de la cita debe ser un número válido');
      return;
    }

    console.log('Datos enviados a /api/compras:', parsedFormData);

    try {
      const response = await fetch('http://localhost:5000/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedFormData),
      });
      if (response.ok) {
        alert('Compra simulada registrada con éxito');
        setFormData({ cita_id: '', service: '', payment_methods: '', total: 0 });
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const handleServicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servicioSeleccionado = servicios.find((s) => s.nombre === e.target.value);
    setFormData({
      ...formData,
      service: e.target.value,
      total: servicioSeleccionado?.precio || 0,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Simulación de Compra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID de Cita</label>
          <input
            type="text"
            value={formData.cita_id}
            onChange={(e) => setFormData({ ...formData, cita_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Servicio</label>
          <select
            value={formData.service}
            onChange={handleServicioChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.nombre} value={servicio.nombre}>
                {servicio.nombre} - ${servicio.precio}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
          <select
            value={formData.payment_methods}
            onChange={(e) => setFormData({ ...formData, payment_methods: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Seleccione método</option>
            <option value="tarjeta">Tarjeta de Crédito/Débito</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold">Total: ${formData.total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Registrar Compra
        </button>
      </form>
    </div>
  );
};

export default CompraForm;