class MessageController {
    constructor(messageModel) {
      this.messageModel = messageModel;
    }
  
    async create(req, res) {
      try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
  
        const messageId = await this.messageModel.create({ name, email, message });
        res.status(201).json({ id: messageId, name, email, message });
      } catch (error) {
        res.status(500).json({ error: 'Error al enviar mensaje' });
      }
    }
  
    async getById(req, res) {
      try {
        const id = parseInt(req.params.id);
        const message = await this.messageModel.findById(id);
        if (!message) {
          return res.status(404).json({ error: 'Mensaje no encontrado' });
        }
        res.json(message);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensaje' });
      }
    }
  
    async getAll(req, res) {
      try {
        const messages = await this.messageModel.findAll();
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
      }
    }
  }
  
  module.exports = MessageController;