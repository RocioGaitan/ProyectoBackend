import Product from '../dao/classes/productDAO.js';

const productService = new Product();

const responseError = {
    status: 'error',
    error: 'Algo salió mal, inténtalo de nuevo más tarde'
};

export const getProducts = async (req, res) => {
    const result = await productService.getProducts();
    
    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const getProductById = async (req, res) => {
    const { pid } = req.params;
    const result = await productService.getProductById(pid);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const createProduct = async (req, res) => {
    const product = req.body; 
    const result = await productService.saveProduct(product);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result});
}

export const addProductToBusiness = async (req, res) => {
    const { bid } = req.params;
    const product = req.body; 

    const business = await productService.getBusinessById(bid);

    if (!business) return res.status(500).send(responseError);

    business.products.push(product);
    const result = await productService.updateBusiness(business._id, business);

    if (!result) return res.status(500).send(responseError);
    res.send({status: 'success', result: 'Product added to Business!'});
}
