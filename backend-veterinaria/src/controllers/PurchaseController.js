class PurchaseController {
  constructor(purchaseModel, appointmentModel) {
    this.purchaseModel = purchaseModel;
    this.appointmentModel = appointmentModel; // Inyectamos el modelo de citas
  }

  async createPurchase(req, res) {
    const { cita_id, payment_methods, total, service } = req.body;

    if (!cita_id || !payment_methods || !total || !service) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
      // Verificar si la cita existe
      const appointment = await this.appointmentModel.findById(cita_id);
      if (!appointment) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      const result = await this.purchaseModel.createPurchase(cita_id, payment_methods, total, service);
      res.status(201).json({ message: 'Compra registrada con éxito', id: result.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PurchaseController;