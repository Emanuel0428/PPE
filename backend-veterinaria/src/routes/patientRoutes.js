const express = require('express');

const patientRoutes = (patientController) => {
  const router = express.Router();

  router.post('/', (req, res) => patientController.create(req, res));
  router.get('/:id', (req, res) => patientController.getById(req, res));
  router.get('/user/:userId', (req, res) => patientController.getByUserId(req, res));
  router.put('/:id', (req, res) => patientController.update(req, res));
  router.delete('/:id', (req, res) => patientController.delete(req, res));

  return router;
};

module.exports = patientRoutes;