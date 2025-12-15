// import asyncHandler from "express-async-handler";
// import Product from "../models/productModel.js";

// export const getProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find({});
//   res.json(products);
// });

// export const getProductById = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }
//   res.json(product);
// });


// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, image, category, description, countInStock } = req.body;

//     if (!name || !price) {
//       return res.status(400).json({ message: "Name and price are required" });
//     }

//     const product = await Product.create({
//       name,
//       price,
//       image: image || "",
//       category: category || "Other",
//       description: description || "",
//       countInStock: countInStock ?? 0,
//     });

//     res.status(201).json(product);
//   } catch (err) {
//     console.error("Create product error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // UPDATE
// export const updateProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(product);
// });

// // DELETE
// export const deleteProduct = asyncHandler(async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// });

import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// GET all products (with optional category filter)
// export const getProducts = asyncHandler(async (req, res) => {
//   const { category } = req.query;

//   let filter = {};

//   if (category && category !== "all") {
//     filter.category = { $regex: new RegExp(`^${category}$`, "i") }; // case-insensitive
//   }

//   const products = await Product.find(filter);
//   res.json(products);
// });

export const getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  let filter = {};

  if (category && category !== "all") {
    filter.category = new RegExp(`^${category}$`, "i");
  }

  const products = await Product.find(filter);
  res.json(products);
});

// GET product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});


// CREATE product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, category, description, countInStock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const product = await Product.create({
    name,
    price,
    image: image || "",
    category: category || "other",
    description: description || "",
    countInStock: Number(countInStock) || 0,
  });

  res.status(201).json(product);
});


// UPDATE product
export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(updated);
});


// DELETE product
export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ message: "Product deleted successfully" });
});

