import  cartModel  from "../dao/models/cartModel.js";
import  productModel  from "../dao/models/productModel.js";
import ticketService from "../services/index.js";
import { v4 as uuidv4 } from "uuid";

async function getTicket(req, res) {
    res.render("login");
}

async function getTicketById(req, res) {
  const { tid } = req.params;
  const result = await ticketService.getTicketByID(tid);
  res.send({ result: "success", payload: result });
}

async function postTicket(req, res) {
  const { cid } = req.params;
  const code = uuidv4();
  const date = new Date();

  // Busca el carrito y actualiza el stock de los productos
  const purchase = await cartModel.findOne({ _id: cid });
  let stock;
  purchase.products.forEach((p) => {
    stock = p.product.stock - p.quantity;
  });
  const amount = purchase.totalPrice;
  const newStock = await productModel.updateMany({ stock: stock });

  const result = ticketService.postTicket(code, date, purchase, amount);
  res.send({ result: "success", payload: result });
}

export default { getTicket, getTicketById, postTicket };
