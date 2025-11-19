import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notifyRoute from "./routes/notify.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// Allow plain text bodies so clients don't need to set Content-Type headers
app.use(express.text({ type: () => true }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/notify", notifyRoute);

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
