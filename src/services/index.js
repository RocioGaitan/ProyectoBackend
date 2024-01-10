// Importaciones
import Tickets from "../dao/classes/ticketDAO.js";
import TicketRepository from "../services/ticketsRepository.js";
import Products from "../dao/classes/productDAO.js";
import ProductRepository from "../services/productsRepository.js";

// Instancia de producto
const product = new Products();
const productService = new ProductRepository(product);

// Instancia de ticket
const ticket = new Tickets();
const ticketService = new TicketRepository(ticket);

// Exportación de servicios
export default { productService, ticketService };
