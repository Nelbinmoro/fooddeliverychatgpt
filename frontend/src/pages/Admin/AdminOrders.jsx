import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    if (!user.isAdmin) return navigate('/');

    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data } = await API.get('/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(data);
    } catch (err) {
      console.error('Admin Orders Error:', err);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="p-6 text-center">Loading Orders...</h2>;

  const updatePaid = async (id) => {
  try {
    await API.put(`/orders/${id}/pay`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    loadOrders();
  } catch {
    alert("Failed to update payment");
  }
};

const updateDelivered = async (id) => {
  try {
    await API.put(`/orders/${id}/deliver`, {}, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    loadOrders();
  } catch {
    alert("Failed to update delivery");
  }
};




  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-6">
      <AdminSidebar />
      <div>
        <h1 className="text-2xl font-bold mb-4">Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        {orders.length > 0 && (
          <div className="overflow-auto">
            <table className="min-w-full text-left bg-white shadow rounded border">
              <thead className="bg-gray-200 font-semibold">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">User</th>
                  <th className="p-3 border">Total (₹)</th>
                  <th className="p-3 border">Payment</th>
                </tr>
              </thead>

             <tbody>
  {orders.map(o => (
    <tr key={o._id} className="border-t">
      <td className="p-2">{o._id.slice(-6)}</td>
      <td>{o.user?.name}</td>
      <td>₹{o.totalPrice}</td>

      <td className="text-red-600 font-semibold">
        {!o.isPaid ? "Pending" : "Paid"}
      </td>

      <td className="flex gap-2 py-2">
        <button
          onClick={() => navigate(`/order/${o._id}`)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          View
        </button>

        {!o.isPaid && (
          <button
            onClick={() => updatePaid(o._id)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Mark Paid
          </button>
        )}

        {o.isPaid && !o.isDelivered && (
          <button
            onClick={() => updateDelivered(o._id)}
            className="px-3 py-1 bg-orange-600 text-white rounded"
          >
            Mark Delivered
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}
