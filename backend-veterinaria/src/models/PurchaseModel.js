class PurchaseModel {
    constructor(db) {
      this.db = db;
    }
  
    async createPurchase(cita_id, payment_methods, total, service) {
      try {
        const result = await this.db.run(
          `INSERT INTO purchase (cita_id, payment_methods, total, service) 
           VALUES (?, ?, ?, ?)`,
          [cita_id, payment_methods, total, service]
        );
        return { id: result.lastID };
      } catch (error) {
        throw new Error('Error al crear la compra: ' + error.message);
      }
    }
  }
  
  module.exports = PurchaseModel; 