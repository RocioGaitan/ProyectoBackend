//imports
import { isValidatePassword } from "../utils/utils.js";
import userService from "../dao/factory/factoryUsers.js";

import config from "../config/config.js";
import userRole from "../utils/usersRole.js";
import jwt from "jsonwebtoken";
import User from "../dao/models/userModel.js";


//login
export async function getLogin(req, res) {
    res.render("login");
}
  
export async function postLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", { error: "Valores erróneos" });
  }

  try {
    // Aquí deberías pasar los datos de email y password a userService.postLogin()
    const user = await userService.postLogin(email, password);

    if (!user) {
      return res.status(400).render("login", { error: "Usuario no encontrado" });
    }

    const isValidPassword = isValidatePassword(user, password);
    const isAdmin = email === config.adminNAME || email === config.adminEMAIL;

    if (!isValidPassword) {
      return res.status(401).render("login", { error: "Error en la contraseña" });
    }

    if (isAdmin) {
      req.session.email = email;
      return res.redirect("/api/sessions/private");
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    return res.redirect("/api/sessions/profile");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).render("error", { error: "Error al iniciar sesión" });
  }
}
  
//private
   export async function getPrivate(req, res) {
    res.render("private");
}
  
//registrar usuarios
  export async function getRegister(req, res) {
    res.render("register");
}

export async function postRegister(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const { role } = userRole(email);

    // Validación de datos
    if (!first_name || !last_name || !email || !age || !password || !role) {
      return res.status(400).send("Faltan datos.");
    }

    // Verificar si el usuario ya existe
    const existingUser = await userService.findUser(email);
    if (existingUser) {
      //return res.status(400).send("El usuario ya está registrado.");
      res.redirect("/api/sessions/login");
    }

    // Crear un nuevo usuario
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password,
      role,
    };

    const user = await userService.postRegister(newUser);
    console.log("Usuario registrado con éxito.", user);
    res.redirect("/api/sessions/login");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).send("Error al registrar usuario.");
  }
}

  
//login con GitHub
  export async function getLoginGit(req, res) {
    req.session.user = req.user;
    res.redirect("/api/sessions/profile");
}
  
//muestra el perfil del usuario
  export async function getProfile(req, res) {
    if (!req.session.user) {
      return res.redirect("login");
    }
    const { first_name, last_name, email, age, carts, role } = req.session.user;
    const cartsParse = JSON.stringify(carts);
    res.render("profile", {
      first_name,
      last_name,
      age,
      email,
      cartsParse,
      role,
    });
}
  
//errores de auth
 export async function failRegister(req, res) {
    console.log("Falla en autenticacion 1");
    res.redirect("/api/sessions/login");
}

export async function failLogin(req, res) {
    console.log("Falla en autenticacion");
    res.redirect("api/sessions/register");
}
  
//logout termina la sesion
  export async function logout(req, res) {
    delete req.session.user;
    res.redirect("login");
}
  
//establecer contraseña
  export async function getRestore(req, res) {
    const token = req.params.token;
    res.render("restore", { token });
}
  


export async function postRestore(req, res) {
  const token = req.params.token;
  jwt.verify(token, "CoderKey", async (err, decoded) => {
      if (err) {
          console.log(err);
          return res.redirect("/api/sessions/login");
      }

      const { email, password } = req.body;
      const user = await userService.findUser(email);
      if (!user) {
          return res.status(400).send({ status: "error", error: "Usuario no encontrado" });
      }

      if (isValidatePassword(user, password)) {
          return res.send({ error: "Ingrese una contraseña diferente a la anterior" });
      }

      try {
          const userFound = await userService.postRestore(email, password);
          res.redirect("/api/sessions/login");
      } catch (error) {
          console.error("Error al restaurar contraseña:", error);
          res.status(500).send("Error al restaurar contraseña.");
      }
  });
}

//cambio de rol del usuario
  export async function putRole(req, res) {
    const { uid } = req.params;
    
    //cambiar de role de premium a user y visceversa
    const user = await User.findById(uid);
    if (user.email == config.adminEMAIL && user.role == "premium") {
      const role = await User.updateOne({
        role: "user",
      });
      res.send({ result: "Success", payload: role });
    }
    if (user.email == config.adminEMAIL && user.role == "user") {
      const role = await User.updateOne({
        role: "premium",
      });
      res.send({ result: "Success", payload: role });
    } else {
      res.send({ error: "Usuario no autorizado para realizar cambio de rol" });
    }
}
  
//retorna la informacion del usuario actual
  export function current(req, res) {
    res.send(req.user);
}

export default {
    getLogin,
    postLogin,
    getPrivate,
    getRegister,
    postRegister,
    getLoginGit,
    getProfile,
    failRegister,
    failLogin,
    logout,
    getRestore,
    postRestore,
    putRole,
    current,
  };


/*export async function postRegister(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    const { role } = userRole(email);
  
    if (!first_name || !last_name || !email || !age || !password || !role) {
      return res.status(400).send("Faltan datos.");
    } else {
      try {
        const user = await UserRepository.postRegister(
          first_name,
          last_name,
          email,
          age,
          password,
          role
        );
        console.log("Usuario registrado con éxito.", user);
        res.redirect("/api/sessions/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).send("Error al registrar usuario.");
    }
  }
}*/

/*export async function postRestore(req, res) {
    const token = req.params.token;
    //crear token para enviar correo de restauracion de contraseña
    jwt.verify(token, "CoderKey", async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.redirect("/api/sessions/login");
      } else {
        const { email, password } = req.body;
        const user = await userService.findUser(email);
        if (!user) {
          return res
            .status(400).send({ status: "error", error: "Usuario no encontrado" });
        }
        if (isValidatePassword(user, password)) {
          res.send({ error: "Ingrese una contraseña diferente a la anterior" });
        } else {
          const userFound = await userService.postRestore(email, password);
          res.redirect("/api/sessions/login");
        }
      }
    });
}*/

/*import UserService from "../services/userService.js";

export default class UserController {

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers() {
        return await this.userService.getAll();
    }

    async getUserByID(uid) {
        const data = await this.userService.getByID(uid);

        if (data.error) throw new Error(data.error);

        return data.result;
    }

    async createUser(user) {
        const {first_name, last_name, age, email} = user;

        if (!first_name || !last_name || !age|| !email) {
            throw new Error('Error al crear el usuario');
        }

        const data = await this.userService.create({first_name, last_name, age, email});

        if (data.error) throw new Error(data.error);

        return data.result;
    }
    
}


const responseError = {
    status: 'error',
    error: 'Algo salio mal vuelva a intentar mas tarde'
};

export const getUsers = async (req, res) => {
    const result = await userService.getUsers();
    
    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const getUserById = async (req, res) => {
    const { uid } = req.params;

    const result = await userService.getUserById(uid);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const saveUser = async (req, res) => {
    const user = req.body; 
    const result = await userService.saveUser(user);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}*/
