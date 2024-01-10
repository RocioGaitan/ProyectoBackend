import TicketsDTO from "../dao/DTOs/tickestsDto.js";

export default class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
    //obtener ticket
    async getTicket () {
      let result = await this.dao.getTicket();
      return result;
    };

    //obtener ticket by ID
    async getTicketByID (tid) {
      let result = await this.dao.getTicketByID(tid);
      return result;
    };

    //crear ticket
    async postTicket (ticket) {
      let tickets = new TicketsDTO(ticket);
      let result = await this.dao.postTicket(
        tickets.code,
        tickets.date,
        tickets.purchase,
        tickets.amount
      );
      return result;
    };
  };