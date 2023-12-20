import productModel from '../models/productModel.js';

export default class Product {
    getProducts = async () => {
        try {
            return await productModel.find();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getProductById = async (id) => {
        try {
            return await productModel.findOne({_id: id});
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    saveProduct = async (product) => {
        try {
            return await productModel.create(product);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateProduct = async (id, product) => {
        try {
            return await productModel.updateOne({_id: id}, {$set: product});
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
