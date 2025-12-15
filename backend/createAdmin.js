import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

console.log("Connected to MongoDB");

const admin = await User.create({
  name: "Admin",
  email: "admin@example.com",
  password: "123456",
  isAdmin: true
});

console.log("Admin Created:", admin);
process.exit();
