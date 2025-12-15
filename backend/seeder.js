import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear users collection
    await User.deleteMany();

    // Create admin user with plain password (will get auto-hashed in User model)
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456",
      isAdmin: true,
    });

    console.log("Admin Created:", adminUser);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
