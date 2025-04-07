const express = require('express');

const purchaseRoutes = (purchaseController) => {
  const router = express.Router();

  router.post('/compras', (req, res) => purchaseController.createPurchase(req, res));

  return router;
};

module.exports = purchaseRoutes;