import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import API from '../../services/api';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    (async()=>{
      try{ const { data } = await API.get('/products'); setProducts(data); }catch(err){ console.error(err); }
    })();
  },[]);

  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-6">
      <AdminSidebar />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-left border">
            <thead>
              <tr>
                <th className="p-2">Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p=> (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.countInStock}</td>
                  <td><button className="text-blue-600">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}