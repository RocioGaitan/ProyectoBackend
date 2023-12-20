import mongoose from 'mongoose';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    number: Number,
    cart: {
        type : mongoose.SchemaTypes.ObjectId,
        ref: 'cart'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    products: [],
    totalPrice: Number,
    status: String
});

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;