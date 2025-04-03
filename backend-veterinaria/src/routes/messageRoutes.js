const express = require('express');

const messageRoutes = (messageController) => {
  const router = express.Router();

  router.post('/', (req, res) => messageController.create(req, res));
  router.get('/:id', (req, res) => messageController.getById(req, res));
  router.get('/', (req, res) => messageController.getAll(req, res));

  return router;
};

module.exports = messageRoutes;