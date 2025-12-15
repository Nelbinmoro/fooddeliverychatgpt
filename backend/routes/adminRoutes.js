import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.put("/make-admin", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  user.isAdmin = true;
  await user.save();

  res.json({ message: "Admin role granted", user });
});

export default router;
