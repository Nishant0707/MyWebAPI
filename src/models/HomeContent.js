import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String }, // URL
  resumeFile: { type: String }, // URL
  socials: {
    linkedin: String,
    github: String,
    twitter: String,
  },
}, { timestamps: true });

export default mongoose.model("HomeContent", homeContentSchema);
