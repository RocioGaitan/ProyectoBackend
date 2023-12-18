import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        minLength: 3,
        unique: true,
        require: true
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;