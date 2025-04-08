class PurchaseController {
  constructor(purchaseModel, appointmentModel) {
    this.purchaseModel = purchaseModel;
    this.appointmentModel = appointmentModel;
  }

  async createPurchase(req, res) {
    const { cita_id, payment_methods, total, service, date } = req.body;
  
    if (!cita_id || !payment_methods || !total || !service || !date) {
      console.log('Faltan campos requeridos en createPurchase');
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
  
    try {
      const appointment = await this.appointmentModel.findById(cita_id);
      if (!appointment) {
        console.log('Cita no encontrada:', cita_id);
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
  
      const result = await this.purchaseModel.createPurchase(cita_id, payment_methods, total, service, date);
      res.status(201).json({ message: 'Compra registrada con éxito', id: result.id });
    } catch (error) {
      console.error('Error en createPurchase:', error.message);
      res.status(500).json({ error: `Error al crear la compra: ${error.message}` });
    }
  }
}

module.exports = PurchaseController;