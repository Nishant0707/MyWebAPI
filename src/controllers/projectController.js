import fs from "fs";
import path from "path";
import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("getProjects error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, live, code } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const tagsArray = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const imagePath = req.file
      ? `/uploads/${req.file.filename}` // ALWAYS forward slash
      : null;

    const project = await Project.create({
      title,
      description,
      tags: tagsArray,
      live,
      code,
      image: imagePath,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, live, code } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tagsArray = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    // If new image uploaded
    if (req.file) {
      // delete old image
      if (project.image) {
        const oldFile = path.join(process.cwd(), project.image.replace("/", path.sep));
        fs.unlink(oldFile, (err) => {
          if (err) console.warn("Could not delete old image:", err.message);
        });
      }

      // save new image
      project.image = `/uploads/${req.file.filename}`;
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.tags = tagsArray.length ? tagsArray : project.tags;
    project.live = live ?? project.live;
    project.code = code ?? project.code;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("updateProject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.image) {
      const filePath = path.join(process.cwd(), project.image.replace("/", path.sep));
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Could not delete project image:", err.message);
      });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("deleteProject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
