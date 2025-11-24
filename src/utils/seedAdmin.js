import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existing) {
      console.log("Admin already exists ✔");
      process.exit(0);
    }

    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashed,
    });

    console.log("Default Admin Created Successfully ✔");
    mongoose.connection.close();
  } catch (error) {
    console.log("SEED ERROR ❌", error);
    process.exit(1);
  }
};

seedAdmin();
