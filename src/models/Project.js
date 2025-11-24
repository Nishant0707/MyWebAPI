import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    image: { type: String }, // "/uploads/filename.jpg"
    live: { type: String },
    code: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
