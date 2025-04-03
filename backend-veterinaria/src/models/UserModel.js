class UserModel {
    constructor(db) {
      this.db = db;
    }
  
    async create(user) {
      const result = await this.db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, user.password]
      );
      return result.lastID;
    }
  
    async findById(id) {
      return await this.db.get('SELECT * FROM users WHERE id = ?', [id]);
    }
  
    async findByEmail(email) {
      return await this.db.get('SELECT * FROM users WHERE email = ?', [email]);
    }
  
    async update(id, user) {
      const fields = Object.keys(user)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(user);
      await this.db.run(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);
    }
  
    async delete(id) {
      await this.db.run('DELETE FROM users WHERE id = ?', [id]);
    }
  }
  
  module.exports = UserModel;