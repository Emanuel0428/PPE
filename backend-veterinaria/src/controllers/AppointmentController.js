class AppointmentController {
    constructor(appointmentModel) {
      this.appointmentModel = appointmentModel;
    }
  
    async create(req, res) {
      try {
        const { user_id, patient_id, date, time, service_type, reason, status } = req.body;
        if (!user_id || !patient_id || !date || !time || !service_type || !reason || !status) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
        const appointmentId = await this.appointmentModel.create({
          user_id,
          patient_id,
          date,
          time,
          service_type,
          reason,
          status,
        });
        res.status(201).json({ id: appointmentId, user_id, patient_id, date, time, service_type, reason, status });
      } catch (error) {
        console.error('Error en create appointment:', error);
        res.status(500).json({ error: 'Error al crear cita' });
      }
    }
  
    async getById(req, res) {
      try {
        const id = parseInt(req.params.id);
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
          return res.status(404).json({ error: 'Cita no encontrada' });
        }
        res.json(appointment);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener cita' });
      }
    }
  
    async getByUserId(req, res) {
      try {
        const userId = parseInt(req.params.userId);
        const appointments = await this.appointmentModel.findByUserId(userId);
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener citas' });
      }
    }
  
    async update(req, res) {
      try {
        const id = parseInt(req.params.id);
        const appointmentData = req.body;
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
          return res.status(404).json({ error: 'Cita no encontrada' });
        }
        await this.appointmentModel.update(id, appointmentData);
        res.json({ message: 'Cita actualizada con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cita' });
      }
    }
  
    async delete(req, res) {
      try {
        const id = parseInt(req.params.id);
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
          return res.status(404).json({ error: 'Cita no encontrada' });
        }
        await this.appointmentModel.delete(id);
        res.json({ message: 'Cita eliminada con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cita' });
      }
    }
  }
  
  module.exports = AppointmentController;