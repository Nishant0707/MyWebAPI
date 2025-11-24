import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  title: { type: String, default: "About Nishant" },
  subtitle: { type: String, default: "Software Engineer & Lifelong Learner" },
  bio: { type: String, default: "" },

  skills: { type: [String], default: [] },

  experience: {
    type: [
      {
        duration: String,
        role: String,
        company: String,
        points: [String],
      },
    ],
    default: [],
  },

  education: {
    type: [
      {
        year: String,
        degree: String,
        university: String,
      },
    ],
    default: [],
  },

  interests: { type: [String], default: [] },
});

export default mongoose.model("About", AboutSchema);
