import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  discription: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
});
const Transaction = mongoose.model("Transaction", historySchema);
export default Transaction;
