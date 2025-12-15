import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrder(data);
    } catch (err) {
      console.error("Order fetch error:", err);
    }
    setLoading(false);
  };

  const markPaid = async () => {
    try {
      await api.put(`/orders/${id}/pay`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      loadOrder();
    } catch {
      alert("Failed to update payment status");
    }
  };

  const markDelivered = async () => {
    try {
      await api.put(`/orders/${id}/deliver`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      loadOrder();
    } catch {
      alert("Failed to update delivery status");
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  if (loading || !order)
    return <h2 className="text-center py-10">Loading Order...</h2>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Order ID:</strong> {order._id.slice(-6)}</p>
        {user.isAdmin && (
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
        )}

        <p className="mt-4 font-semibold">Shipping Address</p>
        <p>{order.shippingAddress?.address}</p>
        <p>{order.shippingAddress?.city} - {order.shippingAddress?.postalCode}</p>

        <p className="mt-4 font-semibold">Payment</p>
        <p className={order.isPaid ? "text-green-600" : "text-red-600"}>
          {order.isPaid ? "Paid" : "Pending"}
        </p>

        {order.isPaid && (
          <p className="text-gray-600">Paid On: {new Date(order.paidAt).toLocaleString()}</p>
        )}

        <p className="mt-4 font-semibold">Delivery</p>
        <p className={order.isDelivered ? "text-green-600" : "text-red-600"}>
          {order.isDelivered ? "Delivered" : "Pending"}
        </p>

        {/* ITEMS */}
        <h2 className="text-xl font-semibold mt-6">Items</h2>
        <ul className="mt-2 space-y-1">
          {order.orderItems.map((item, i) => (
            <li key={i} className="flex justify-between border-b py-2">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.qty * item.price}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl mt-4 font-semibold">
          Total Paid: ₹{order.totalPrice}
        </h3>

        {/* Admin Controls */}
        {user.isAdmin && (
          <div className="mt-6 flex gap-3">
            {!order.isPaid && (
              <button
                onClick={markPaid}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Mark Paid
              </button>
            )}

            {order.isPaid && !order.isDelivered && (
              <button
                onClick={markDelivered}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Mark Delivered
              </button>
            )}
          </div>
        )}
      </div>

      
      <div className="bg-white shadow rounded p-4 mt-4">
  <h2 className="text-lg font-semibold mb-2">Delivery Status</h2>

  <p>
    <strong>Payment:</strong>{" "}
    {order.isPaid ? (
      <span className="text-green-600">Paid ✔</span>
    ) : (
      <span className="text-red-600">Pending ✖</span>
    )}
  </p>

  <p>
    <strong>Delivery:</strong>{" "}
    {order.isDelivered ? (
      <span className="text-green-600">Delivered ✔</span>
    ) : (
      <span className="text-orange-600">Not Delivered ✖</span>
    )}
  </p>

  {!order.isDelivered && order.isPaid && (
    <p className="text-blue-600 mt-2">
      Your order is being prepared and will be delivered soon.
    </p>
  )}
</div>

<div className="mt-4">
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full ${
        order.isDelivered ? "bg-green-600 w-full"
        : order.isPaid ? "bg-blue-600 w-1/2"
        : "bg-red-600 w-1/4"
      }`}
    ></div>
  </div>
</div>

<div className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Order Timeline</h3>

  <ul className="border-l pl-4 space-y-2">
    <li>  Order Placed: {new Date(order.createdAt).toLocaleString()}</li>

    {order.isPaid && (
      <li>Payment Completed: {new Date(order.paidAt).toLocaleString()}</li>
    )}

    {order.isDelivered && (
      <li>Delivered: {new Date(order.deliveredAt).toLocaleString()}</li>
    )}
  </ul>
</div>
</div>
  );
}
