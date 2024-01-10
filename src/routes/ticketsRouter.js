import { Router } from 'express';
import ticketsController from "../controllers/ticketsController.js";

const router = Router();

//obtener todos los tickets
router.get("/", ticketsController.getTicket);

//obtener un ticket
router.get("/:tid", ticketsController.getTicketById);

//crear un tiket
router.post("/:cid/purchase", ticketsController.postTicket)



export default router;