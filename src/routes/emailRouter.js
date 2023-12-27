import { Router } from "express";
import { getEmail, postEmail } from '../controllers/emailController.js';


const router = Router();

router.get("/", getEmail);

router.post("/enviar-correo", postEmail);

export default router;