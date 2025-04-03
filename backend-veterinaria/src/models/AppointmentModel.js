class AppointmentModel {
    constructor(db) {
      this.db = db;
    }
  
    async create(appointment) {
      const result = await this.db.run(
        'INSERT INTO appointments (user_id, patient_id, date, time, service_type, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          appointment.user_id,
          appointment.patient_id,
          appointment.date,
          appointment.time,
          appointment.service_type,
          appointment.reason,
          appointment.status || 'pending',
        ]
      );
      return result.lastID;
    }
  
    async findById(id) {
      return await this.db.get('SELECT * FROM appointments WHERE id = ?', [id]);
    }
  
    async findByUserId(userId) {
      return await this.db.all('SELECT * FROM appointments WHERE user_id = ?', [userId]);
    }
  
    async update(id, appointment) {
      const fields = Object.keys(appointment)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(appointment);
      await this.db.run(`UPDATE appointments SET ${fields} WHERE id = ?`, [...values, id]);
    }
  
    async delete(id) {
      await this.db.run('DELETE FROM appointments WHERE id = ?', [id]);
    }
  }
  
  module.exports = AppointmentModel;