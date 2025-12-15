import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await api.put(
        "/auth/profile",
        { name, password },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      login(data.email, password || undefined);  
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (error) {
      setMessage("Update failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>

      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={submitHandler} className="space-y-3">
        <input
          type="text"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="New Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

