import express from "express";
import Notify from "../models/Notify.js";

const router = express.Router();

// POST /api/notify
router.post("/", async (req, res) => {
  try {
    // Accept either a raw text body or a JSON object with an email field
    const email =
      typeof req.body === "string"
        ? req.body.trim()
        : typeof req.body?.email === "string"
          ? req.body.email.trim()
          : "";

    // Empty email check
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Do not store duplicates
    const existing = await Notify.findOne({ email });
    if (existing) {
      return res
        .status(200)
        .json({ message: "Email already registered", data: existing });
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
