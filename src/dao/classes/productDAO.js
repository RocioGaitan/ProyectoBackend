import  productModel from "../models/productModel.js";

export default class Products {
  // Obtener productos
  async getProducts(filter, options) {
    try {
      let Product = await productModel.paginate(filter, options);
      return Product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Obtener productos por ID
  async productById(pid) {
    try {
      const result = await productModel.find({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Crear productos
  async postProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    owner
  ) {
    try {
      let product = productModel.create({
        title,
        description,
        code,
        price,
        stock,
        category,
        owner: { user: owner },
      });
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Editar productos
  async putProduct(pid, productToReplace) {
    try {
      let result = await productModel.updateOne({ _id: pid }, productToReplace);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  // Eliminar productos
  async deleteProduct(pid) {
    try {
      let result = await productModel.deleteOne({ _id: pid });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
