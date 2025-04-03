const express = require('express');

const appointmentRoutes = (appointmentController) => {
  const router = express.Router();

  router.post('/', (req, res) => appointmentController.create(req, res));
  router.get('/:id', (req, res) => appointmentController.getById(req, res));
  router.get('/user/:userId', (req, res) => appointmentController.getByUserId(req, res));
  router.put('/:id', (req, res) => appointmentController.update(req, res));
  router.delete('/:id', (req, res) => appointmentController.delete(req, res));

  return router;
};

module.exports = appointmentRoutes;