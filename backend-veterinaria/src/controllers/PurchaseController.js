class PurchaseController {
  constructor(purchaseModel) {
    this.purchaseModel = purchaseModel;
  }

  async createPurchase(req, res) {
    const { cita_id, payment_methods, total, service } = req.body;

    if (!cita_id || !payment_methods || !total || !service) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
      const result = await this.purchaseModel.createPurchase(cita_id, payment_methods, total, service);
      res.status(201).json({ message: 'Compra registrada con éxito', id: result.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PurchaseController;