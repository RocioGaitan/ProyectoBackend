import { cartModel } from "../models/cart.model";

export default class Cart {
  // Obtener carrito
  async getCart() {
    try {
      let cart = await cartModel.find();
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Obtener carrito por ID
  async getCartById(cid) {
    try {
      const result = await cartModel.findOne({ _id: cid });
      return result;
    } catch (error) {
      console.log("error: " + error);
      return null;
    }
  }

  // Crear carrito
  async postCart(uid) {
    try {
      let carts = await cartModel.create({
        user: { user: uid },
      });
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Editar carrito
  async putCart(cid, cartToReplace) {
    try {
      let cart = await cartModel.updateOne({ _id: cid }, cartToReplace);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Agregar un producto al carrito
  async addProduct(cid, pid, quantity) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      cart.products.push({ product: pid, quantity: quantity });
      await cart.save();
      let newCart = await cartModel.findOne({ _id: cid });
      let totalPrice = 0;
      newCart.products.map((p) => {
        totalPrice += p.product.price * p.quantity;
      });
      const result = await cartModel.updateOne({
        totalPrice: totalPrice,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Eliminar carrito
  async deleteCart(cid) {
    try {
      let cart = await cartModel.deleteOne({ _id: cid });
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Eliminar producto
  async deleteProduct(cid, pid) {
    try {
      let cart = await cartModel.findOne({ _id: cid });
      cart.products.splice({ _id: pid });
      let result = await cartModel.updateOne({ _id: cid }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
