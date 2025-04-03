const express = require('express');

const userRoutes = (userController) => {
  const router = express.Router();

  router.post('/register', (req, res) => userController.register(req, res));
  router.post('/login', (req, res) => userController.login(req, res));
  router.get('/:id', (req, res) => userController.getUser(req, res));
  router.put('/:id', (req, res) => userController.updateUser(req, res));
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
};

module.exports = userRoutes;