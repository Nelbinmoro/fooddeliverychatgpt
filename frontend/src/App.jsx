import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import AdminRoute from "./routes/AdminRoutes.jsx";
import Profile from "./pages/Profile.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import MyOrders from "./pages/MyOrders.jsx";

import CategoryPage from "./pages/CategoryPage.jsx";   // ← ADD THIS



export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <main className="container py-6">
        <Routes>
          
          {/* Public Routes (blocked for logged-in users) */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" replace />}
          />

          {/* Protected User Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* CATEGORY ROUTE ADDED */}
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
