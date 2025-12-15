import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const CATEGORY_OPTIONS = ["pizza", "burger", "drinks", "cakes"];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    countInStock: "",
  });

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
    loadProducts();
  }, [user, navigate]);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch {
      alert("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.description) {
      return alert("All fields are required");
    }

    const payload = {
      ...form,
      category: form.category.toLowerCase(),
      image:
        form.image ||
        "https://via.placeholder.com/300x200?text=Food+Image",
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Product updated");
      } else {
        await api.post("/products", payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Product added");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      countInStock: product.countInStock,
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      loadProducts();
    } catch {
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
      countInStock: "",
    });
  };

  if (loading) {
    return <h2 className="text-center py-10">Loading...</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Admin Navigation */}
      <nav className="flex gap-6 mb-6 border-b pb-4">
        <Link to="/admin" className="font-semibold text-blue-600 underline">
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="font-semibold text-gray-700 hover:text-blue-600"
        >
          Orders
        </Link>
      </nav>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border p-2 rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="border p-2 rounded"
        />

        {/* Category dropdown */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <input
          name="countInStock"
          value={form.countInStock}
          onChange={handleChange}
          placeholder="Stock Qty"
          type="number"
          className="border p-2 rounded"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded md:col-span-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded md:col-span-2 hover:bg-blue-700"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 rounded md:col-span-2 hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Products List */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        <ul className="space-y-3">
          {products.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <span className="font-medium">
                {item.name} — ₹{item.price} ({item.category})
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
