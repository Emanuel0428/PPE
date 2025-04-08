class PurchaseModel {
  constructor(db) {
    this.db = db;
  }

  async createPurchase(cita_id, payment_methods, total, service) {
    try {
      const result = await this.db.run(
        'INSERT INTO purchase (cita_id, payment_methods, total, service, date) VALUES (?, ?, ?, ?, ?)',
        [cita_id, payment_methods, total, service, new Date().toISOString()]
      );
      return { id: result.lastID };
    } catch (error) {
      console.error('Error al insertar en compras:', error);
      throw error;
    }
  }
}

module.exports = PurchaseModel;