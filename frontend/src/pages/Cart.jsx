import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import React, { useState } from "react";

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!user) return navigate("/login");

    setLoading(true);
    try {
      const orderItems = cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item._id,
      }));

      const { data } = await api.post(
        "/orders",
        { orderItems, totalPrice },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      console.log("Order Created:", data);
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed!");
    }
    setLoading(false);
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center py-20 text-lg">
        <p>Your cart is empty 😕</p>
        <Link to="/" className="text-blue-600 underline mt-3">
          Go Shopping →
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-4 border rounded-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => updateQty(item._id, item.qty - 1)}
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => updateQty(item._id, item.qty + 1)}
              >
                +
              </button>

              <button
                className="text-red-600 ml-4"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      

      <div className="text-right mt-8">
  <h2 className="text-xl font-bold mb-4">Total: ₹{totalPrice}</h2>
  <Link
    to="/checkout"
    className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
  >
    Proceed to Checkout
  </Link>
</div>

    </div>
  );
}
