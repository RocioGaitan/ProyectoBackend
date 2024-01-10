import express from 'express';
import passport from 'passport';
import { auth } from '../utils/authRole.js';
import userController from '../controllers/userController.js';


const router = express.Router();

//rutas del login y register
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
//private
router.get("/private", auth, userController.getPrivate);
//register
router.get("/register", userController.getRegister);
router.post("/register",
  passport.authenticate("register", { failureRedirect: "/api/sessions/failregister" }),
  userController.postRegister
);

//login github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.getLoginGit
);

//profile del usuario
router.get("/profile", userController.getProfile);

//fail auth
router.get("/failregister", userController.failRegister);

//fail login
router.get("/faillogin", userController.failLogin);

//logout
router.get("/logout", userController.logout);

//restore
router.get("/restore/:token", userController.getRestore);

router.post("/restore/:token", userController.postRestore);

//cambio de rol de usuario y obtener informacion actual
router.put("/premium/:uid", userController.putRole);
//current para jwt
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.current
);

export default router;