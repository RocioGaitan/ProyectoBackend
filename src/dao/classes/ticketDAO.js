import  ticketModel  from "../models/ticketsModel.js";

export default class Tickets {
  // Obtener ticket
  async getTicket() {
    try {
      const result = await ticketModel.find();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Obtener ticket by ID
  async getTicketByID(tid) {
    try {
      const result = await ticketModel.findById(tid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Crear ticket
  async postTicket(code, date, purchase, amount) {
    try {
      const result = await ticketModel.create({
        code,
        date,
        purchase: { cart: purchase },
        amount,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
