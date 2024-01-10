import { createHash } from "../../utils/utils.js";
import User from "../models/userModel.js";

export default class Users {
    // Método para iniciar sesión
    async postLogin (email) {
      try {
        const user = await User.findOne(
          { email },
          {
            first_name: 1,
            last_name: 1,
            age: 1,
            password: 1,
            email: 1,
            role: 1,
          }
        );
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    // Método para registrar un usuario
    async postRegister(first_name, last_name, email, age, password, role) {
      try {
        const hashedPassword = createHash(password);
        const user = await User.create({
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
          role,
        });
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    // Método para obtener un usuario por correo electrónico
    async findUser(email) {
      try {
        const user = await User.findOne({ email: email });
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    // Método para restablecer la contraseña de un usuario
    async postRestore (email, password) {
      try {
        const userFound = await User.findOne({ email: email });
        const hashedPassword = createHash(password);
        const newPassword = await User.updateOne(
          { email: userFound.email },
          { password: hashedPassword }
        );
        return newPassword;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  };