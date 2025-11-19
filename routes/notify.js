import express from "express";
import Notify from "../models/Notify.js";

const router = express.Router();

// POST /api/notify
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Empty email check
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required." });
    }

    // Optional API Key check
    const apiKey = req.headers["x-api-key"];
    if (process.env.API_KEY && apiKey !== process.env.API_KEY) {
      return res.status(401).json({ message: "Invalid API Key" });
    }

    // Save email
    const saved = await Notify.create({ email });

    return res.json({ message: "Email saved successfully", data: saved });

  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "Email already exists" });

    return res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
