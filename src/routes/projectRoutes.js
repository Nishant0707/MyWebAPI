import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);

// Protected
router.post("/", authMiddleware, upload.single("image"), createProject);
router.put("/:id", authMiddleware, upload.single("image"), updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
