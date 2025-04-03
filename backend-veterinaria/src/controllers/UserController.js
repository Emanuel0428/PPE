class UserController {
    constructor(userModel) {
      this.userModel = userModel;
    }
  
    async register(req, res) {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
  
        const existingUser = await this.userModel.findByEmail(email);
        if (existingUser) {
          return res.status(400).json({ error: 'El email ya está registrado' });
        }
  
        const userId = await this.userModel.create({ name, email, password });
        res.status(201).json({ id: userId, name, email });
      } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
      }
    }
  
    async login(req, res) {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
  
        const user = await this.userModel.findByEmail(email);
        if (!user || user.password !== password) {
          return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
  
        res.json({ id: user.id, name: user.name, email: user.email });
      } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
      }
    }
  
    async getUser(req, res) {
      try {
        const id = parseInt(req.params.id);
        const user = await this.userModel.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
      }
    }
  
    async updateUser(req, res) {
      try {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const user = await this.userModel.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await this.userModel.update(id, userData);
        res.json({ message: 'Usuario actualizado con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
      }
    }
  
    async deleteUser(req, res) {
      try {
        const id = parseInt(req.params.id);
        const user = await this.userModel.findById(id);
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        await this.userModel.delete(id);
        res.json({ message: 'Usuario eliminado con éxito' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
      }
    }
  }
  
  module.exports = UserController;