import mongoose from "mongoose";
import Users from "../classes/userDAO.js";
import UserMemory from "../memory/userMemory.js";
import config from "../../config/config.js";
import UserRepository from "../../services/usersRepository.js";

//crea una conexión a la base de datos de MongoDB a través de Mongoose y luego instancia un objeto Users. Si la configuración es para utilizar memoria, asigna directamente un objeto UserMemory al userService
//switch entre memoria y mongo segun dotenv
let userService;
switch (config.persistence) {
  case "MONGO":
    const connection = mongoose.connect(config.mongoURL);
    const user = new Users
    userService = new UserRepository(user)
  
    break;

  case "MEMORY":
    userService  = new UserMemory;
    break;
    
}


export default userService;