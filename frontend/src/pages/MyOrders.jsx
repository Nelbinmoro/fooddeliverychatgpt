import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(data);
    } catch (err) {
      console.error("My Orders Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="text-center py-10">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="p-2">{o._id.slice(-6)}</td>
                <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="p-2">₹{o.totalPrice}</td>
                <td className="p-2">
                  {o.isDelivered ? (
                    <span className="text-green-600">Delivered</span>
                  ) : o.isPaid ? (
                    <span className="text-blue-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Pending</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => navigate(`/order/${o._id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
