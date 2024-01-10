import ProductsDTO from "../dao/DTOs/productsDto.js";

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Obtener producto
  async getProduct (filter, options) {
    let result = await this.dao.getProducts(filter, options);
    return result;
  };

  // Obtener producto por ID
  async getProductById (pid) {
    let result = await this.dao.productById(pid);
    return result;
  };

  // Crear producto
  async postProduct (product) {
    let products = new ProductsDTO(product);
    let result = await this.dao.postProduct(
      products.title,
      products.description,
      products.code,
      products.price,
      products.stock,
      products.category,
      products.owner
    );
    return result;
  };

  // Editar producto
  async putProduct (pid, productToReplace) {
    let result = await this.dao.putProduct(pid, productToReplace);
    return result;
  };

  // Eliminar producto
  async deleteProducts (pid) {
    let result = await this.dao.deleteProduct(pid);
    return result;
  };
}
