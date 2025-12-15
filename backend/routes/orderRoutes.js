import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Customer create + Admin fetch all
router.route("/")
  .post(protect, createOrder)
  .get(protect, adminOnly, getOrders);

// User orders
router.route("/myorders")
  .get(protect, getUserOrders);

// Single order
router.route("/:id")
  .get(protect, getOrderById);

// Admin mark PAID
router.route("/:id/pay")
  .put(protect, adminOnly, updateOrderToPaid);

// Admin mark DELIVERED
router.route("/:id/deliver")
  .put(protect, adminOnly, updateOrderToDelivered);

export default router;
