import mongoose from "mongoose";

const NotifySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notify", NotifySchema);
