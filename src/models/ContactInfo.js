import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("ContactInfo", contactInfoSchema);
