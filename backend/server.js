import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import transactionRouter from "./Routes/transactionsRoute.js";
import userRouter from "./Routes/usersRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import verifyToken from "./Middlewares/cookieJwtAuth.js";
import Transaction from "./Modals/transactionHistoryModal.js";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MongoPass = process.env.MONGODB_PASSWORD;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(
  cors({
    origin: "https://expense-tracker-3reg.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://ch3tan5aini:${MongoPass}@transactions.wzaf1.mongodb.net/?retryWrites=true&w=majority&appName=transactions`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Routes

//unKnown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});


//home route
app.get("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const decoded = jwt.decode(token);
  res.status(200).send({ success: true, username: decoded.username });
});

// transaction routes
app.use("/transactions", verifyToken, transactionRouter);

// users routes
app.use("/users", userRouter);

//Download UserData Route
app.get("/download/:username", verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const data = await Transaction.find({ username: username });
    if (!data) {
      res.status(404).send({ success: false, message: "No Data Found" });
    }
    const newFormatedData =
      data
        .map(
          (obj) =>
            `Date: ${obj.date}, Discription: ${obj.discription}, Type: ${obj.type}, Amount: ${obj.amount}`
        )
        .join("\n") + "\n";

    await fs.unlink("./UserData/user-data.txt");

    await fs.appendFile("./UserData/user-data.txt", newFormatedData, "utf-8");

    const filePath = "./UserData/user-data.txt";

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).send("File not found.");
      }
    });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ success: false, message: "Try Again Later" });
  }
});
