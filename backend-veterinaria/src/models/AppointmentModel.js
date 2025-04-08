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
    const query = `
      SELECT 
        a.id AS appointment_id,
        a.user_id,
        a.patient_id,
        a.date,
        a.time,
        a.service_type,
        a.reason,
        a.status,
        p.name AS pet_name,
        p.species AS pet_species,
        p.breed AS pet_breed,
        p.birth_date AS pet_birth_date,
        pur.payment_methods,
        pur.total,
        pur.service AS purchase_service,
        pur.date AS purchase_date
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN purchase pur ON a.id = pur.cita_id
      WHERE a.user_id = ?
    `;
    return await this.db.all(query, [userId]);
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