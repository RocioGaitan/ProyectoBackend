import UsersDTO from "../dao/DTOs/usersDto.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao; //almacena el objeto DAO proporcionado
  }

  //inicia sesion
  async postLogin(email) {
    let result = await this.dao.postLogin(email);
    return result;
  }

  //registra un usuario
  async postRegister(user) {
    let users = new UsersDTO(user);
    let result = await this.dao.postRegister(
      users.first_name,
      users.last_name,
      users.email,
      users.age,
      users.password,
      users.role
    );
    return result;
  }

  //encuentra un usuario por email
  async findUser(email) {
    let result = await this.dao.findUser(email);
    return result;
  }

  //restaura la contraseña
  async postRestore(email, password) {
    let result = await this.dao.postRestore(email, password);
    return result;
  }
}