import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRoute);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Chatbot backend running at http://localhost:${PORT}`);
});