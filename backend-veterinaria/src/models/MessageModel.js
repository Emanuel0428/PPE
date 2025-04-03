class MessageModel {
    constructor(db) {
      this.db = db;
    }
  
    async create(message) {
      const result = await this.db.run(
        'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
        [message.name, message.email, message.message]
      );
      return result.lastID;
    }
  
    async findById(id) {
      return await this.db.get('SELECT * FROM messages WHERE id = ?', [id]);
    }
  
    async findAll() {
      return await this.db.all('SELECT * FROM messages');
    }
  }
  
  module.exports = MessageModel;