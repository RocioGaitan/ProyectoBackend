import cartService from "../services/cartService.js";

export default class cartController {

    constructor () {
        this.cartService = new cartService();
    }

    async getAllCarts() {
        return await this.cartService.getAll();
    }

    async getCartByID(id) {
        const data = await this.cartService.getByID(id);

        if (data.error) throw new Error(data.error);
        return data.result;
    }

    async createCart(cart) {
        const {nameProduct, description, creator_user} = cart;

        if (!nameProduct || !description || !creator_user) {
            throw new Error('Error al crear el carrito');
        }

        const data = await this.cartService.create({nameProduct, description, creator_user});

        if (data.error) throw new Error(data.error);
        return data.result;
    }
}