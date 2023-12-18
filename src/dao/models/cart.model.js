import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = mongoose.Schema({
    nameProduct: {
        type: String,
        minLength: 3,
        require: true
    },
    description: {
        type: String,
        minLength: 3,
        require: true
    },
    creator_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;