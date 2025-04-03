class PatientModel {
    constructor(db) {
      this.db = db;
    }
  
    async create(patient) {
      const result = await this.db.run(
        'INSERT INTO patients (user_id, name, species, breed, birth_date) VALUES (?, ?, ?, ?, ?)',
        [patient.user_id, patient.name, patient.species, patient.breed, patient.birth_date]
      );
      return result.lastID;
    }
  
    async findById(id) {
      return await this.db.get('SELECT * FROM patients WHERE id = ?', [id]);
    }
  
    async findByUserId(userId) {
      return await this.db.all('SELECT * FROM patients WHERE user_id = ?', [userId]);
    }
  
    async update(id, patient) {
      const fields = Object.keys(patient)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(patient);
      await this.db.run(`UPDATE patients SET ${fields} WHERE id = ?`, [...values, id]);
    }
  
    async delete(id) {
      await this.db.run('DELETE FROM patients WHERE id = ?', [id]);
    }
  }
  
  module.exports = PatientModel;