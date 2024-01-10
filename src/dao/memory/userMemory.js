//imports
import { createHash } from '../../utils/utils.js'

export default class UserMemory {
  constructor() {
    this.data = []; //Almacena los usuarios
  }

  //login
  postLogin(email) {
    const user = this.data.find((p) => p.email === email);
    return user; 
  }

  //registra un usuario
  postRegister(first_name, last_name, email, age, password) {
    //validacion de admin
    if (email === config.adminNAME) {
      const hashedPassword = createHash(password);
      let result = this.data.push({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role: "admin",
      });
      return result;
    }
    //validacion de premium
    if (email === "rociogaitan98.rg@gmail.com") {
      const hashedPassword = createHash(password);
      let result = this.data.push({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role: "premium",
      });
      return result;
    }

    const hashedPassword = createHash(password);
    let result = this.data.push({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });
    return result;
  };

  //encontrar usuario
  findUser(email) {
    const user = this.data.find((p) => p.email === email);
    return user;
  }

  //restaura la contraseña
  async postRestore(email, password) {
    const hashedPassword = createHash(password);
    const user = this.data.find((p) => p.email === email);
    if (user) {
      user.password = hashedPassword;
    }
    return user ? user.password : null; // Devolver la nueva contraseña o null si no se encontró el usuario
  }

};