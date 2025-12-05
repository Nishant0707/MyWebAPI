import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ========================
//  Fix __dirname for ES Modules
// ========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
//  HELMET (Production Ready)
// ========================
app.use(
  helmet({
    contentSecurityPolicy: false, // Render breaks CSP because of cross-origin assets
    crossOriginResourcePolicy: false, // Allow external images
    crossOriginEmbedderPolicy: false,
  })
);

// ========================
//  EXPRESS JSON
// ========================
app.use(express.json());

// ========================
//  CORS (Production Ready)
// ========================
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://localhost:5173",
  "https://mywebfrontend-0kli.onrender.com", 
  "http://mywebfrontend-0kli.onrender.com",// ✅ Added Render frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server, Postman, curl, direct browser hit
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// ========================
//  MORGAN LOGGER
// ========================
app.use(morgan("dev"));

// ========================
//  STATIC FILES (Uploads)
// ========================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ========================
//       ROUTES
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Mypot Backend Running Successfully!");
});

// ========================
//  START SERVER
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
