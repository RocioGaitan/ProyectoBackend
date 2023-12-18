import UserService from "../services/userService.js";

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
