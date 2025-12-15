import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSidebar(){
  return (
    <aside className="w-64 min-h-[60vh] bg-white rounded p-4 shadow">
      <nav className="flex flex-col gap-3">
        <Link to="/admin">Overview</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>
    </aside>
  );
}