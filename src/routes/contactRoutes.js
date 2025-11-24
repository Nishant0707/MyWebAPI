import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  getContactInfo,
  updateContactInfo,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// USER
router.post("/send", sendMessage);
router.get("/info", getContactInfo);

// ADMIN
router.get("/messages", authMiddleware, getMessages);
router.delete("/messages/:id", authMiddleware, deleteMessage);
router.put("/info", authMiddleware, updateContactInfo);

export default router;
