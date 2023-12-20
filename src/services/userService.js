import userModel from '../dao/models/userModel.js';

export default class UserService {
    
    async getAll() {
        return userModel.find();
    }

    async getByID(uid) {
        let error = null;
        const result = await userModel.findOne({_id: uid});
        if (!result) error = `El usuario ${uid} no existe!`;

        return {error, result};
    }

    async create(user) {

        let error = null;
        if (!this.validateEmail(user.email)) {
            error = "El email ingresado no es válido!";
            return {error, user: null}
        }

        const result = await userModel.create(user);

        return { error, result}
    }

    validateEmail(email) {
        const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return validEmail.test(email);
    }
}