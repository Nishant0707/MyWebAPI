import express from "express";
import { getHomeContent, updateHomeContent } from "../controllers/homeController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.get("/", getHomeContent);

router.put(
  "/update",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resumeFile", maxCount: 1 }
  ]),
  updateHomeContent
);

export default router;
