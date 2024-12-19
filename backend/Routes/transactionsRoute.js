import express from "express";
import Transaction from "../Modals/transactionHistoryModal.js";

const router = express.Router();

// For adding Transaction
router.post("/add", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.date ||
      !req.body.discription ||
      !req.body.amount ||
      !req.body.type
    ) {
      res
        .status(401)
        .send({ success: false, message: "Enter All The Details!" });
    }
    
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    res.status(200).send({ success: true, newTransaction });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

// For Getting specific user Transactions
router.get("/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const data = await Transaction.find({ username: user });
    res.status(200).send({ success: true, data });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

// For Deleting The Specific Transaction
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Transaction.findByIdAndDelete(id);
    if (!response) {
      res
        .status(404)
        .send({ success: false, message: "Transaction Not Found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Transaction History Deleted" });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

// For Reseting the Tracker
router.delete("/reset", async (req, res) => {
  try {
    await Transaction.deleteMany({});
    res.status(200).send({ success: true, message: "Tracker Reset Done!" });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});

export default router;
