import config from "../config/config.js";

// Función autenticadora
export function auth(req, res, next) {
  if (
    req.session?.email === config.adminNAME ||
    (req.session?.email === config.adminEMAIL && req.session?.admin) ||
    req.session?.premium
  ) {
    return next();
  }

  return res.status(401).json({ error: "Acceso no autorizado" });
}