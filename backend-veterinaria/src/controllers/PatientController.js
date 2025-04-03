class PatientController {
    constructor(patientModel) {
      this.patientModel = patientModel;
    }
  
    async create(req, res) {
      try {
        const { user_id, name, species, breed, birth_date } = req.body;
        if (!user_id || !name || !species) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
  
        const patientId = await this.patientModel.create({ user_id, name, species, breed, birth_date });
        res.status(201).json({ id: patientId, user_id, name, species, breed, birth_date });
      } catch (error) {
        res.status(500).json({ error: 'Error al crear paciente' });
      }
    }
  
    async getById(req, res) {
      try {
        const id = parseInt(req.params.id);
        const patient = await this.patientModel.findById(id);
        if (!patient) {
          return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        res.json(patient);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener paciente' });
      }
    }
  
    async getByUserId(req, res) {
      try {
        const userId = parseInt(req.params.userId);
        const patients = await this.patientModel.findByUserId(userId);
        res.json(patients);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener pacientes' });
      }
    }
  
    async update(req, res) {
      try {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const patient = await this.patientModel.findById(id);
        if (!patient) {
          return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        await this.patientModel.update(id, patientData);
        res.json({ message: 'Paciente actualizado con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar paciente' });
      }
    }
  
    async delete(req, res) {
      try {
        const id = parseInt(req.params.id);
        const patient = await this.patientModel.findById(id);
        if (!patient) {
          return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        await this.patientModel.delete(id);
        res.json({ message: 'Paciente eliminado con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar paciente' });
      }
    }
  }
  
  module.exports = PatientController;