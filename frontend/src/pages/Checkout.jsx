import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  const handleOrder = async () => {
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode)
      return alert("Fill shipping details");

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
})),

        shippingAddress,
        paymentMethod: "COD",
        itemsPrice: totalPrice,
        shippingPrice: 40,
        totalPrice: totalPrice + 40,
      };

      const { data } = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      clearCart(); // empty cart after ordering
      navigate(`/order/${data._id}`);
    } catch (err) {
      console.error("Order submit error:", err);
      alert("Failed to submit order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>

        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-3 rounded"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
        />

        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-3 rounded"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        />

        <input
          type="text"
          placeholder="Postal Code"
          className="border p-2 w-full mb-3 rounded"
          value={shippingAddress.postalCode}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
          }
        />
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        <p className="mb-2">Items Total: ₹{totalPrice}</p>
        <p className="mb-2">Shipping: ₹40</p>
        <h3 className="text-xl font-bold mt-3">Total: ₹{totalPrice + 40}</h3>

        <button
          onClick={handleOrder}
          className="w-full mt-5 bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
