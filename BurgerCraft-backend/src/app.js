import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin : process.env.CLIENT_URL || "http://localhost:5173",
  credentials : true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cards", cardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to BurgerCraft Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});