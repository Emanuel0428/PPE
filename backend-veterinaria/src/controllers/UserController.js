const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  constructor(userModel) {
    this.userModel = userModel;
    this.secretKey = process.env.JWT_SECRET || 'tokenSecretKey';
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

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await this.userModel.create({ name, email, password: hashedPassword });
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
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
        expiresIn: '1h',
      });

      res.json({ id: user.id, name: user.name, email: user.email, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  async getMe(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No se proporcionó token' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      console.error('Error en getMe:', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  }

  async getUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id);
      const userData = req.body;
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
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