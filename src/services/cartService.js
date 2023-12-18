import cartModel from '../dao/models/cart.model.js';

export default class cartService {

    async getAll() {
        return cartModel.find();
    }

    async getByID(id) {
        let error = null;
        const result = await cartModel.findOne({_id: id});
        if (!result) error = `El carrito ${id} no existe!`;

        return {error, result};
    }

    async create(cart) {
        let error = null;
        const result = await cartModel.create(cart);

        return {error, result}
    }
}