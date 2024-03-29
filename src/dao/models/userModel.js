import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String },
});

const User = mongoose.model("users", userSchema);

export default User;