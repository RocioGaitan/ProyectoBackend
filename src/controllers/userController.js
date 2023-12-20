import User from '../dao/classes/userDAO.js';

const userService = new User();

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
    const user = req.body; //Tarea: validar los campos
    const result = await userService.saveUser(user);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

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
    
}*/
