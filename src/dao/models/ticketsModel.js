import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true },
  date: { type: Date, required: true },
  purchase: [{
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true },
  }],
  amount: { type: Number, required: true },
});

ticketSchema.pre("findOne", function () {
  this.populate("purchase.cart");
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
