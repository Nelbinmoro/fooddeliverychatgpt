import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide menu on login or signup page
  const hideMenu =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-orange-600">
        MealDash
      </Link>

      {!hideMenu && (
        <div className="flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>

          <Link to="/cart" className="hover:text-orange-600">
            Cart
          </Link>

          {user ? (
            <>
              {/* My Orders */}
              <Link
                to="/myorders"
                className="hover:text-orange-600"
              >
                My Orders
              </Link>

              {/* Admin link */}
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-orange-600 font-semibold"
                >
                  Dashboard
                </Link>
              )}

              {/* User name → Profile */}
              <Link
                to="/profile"
                className="font-semibold hover:text-orange-600"
              >
                {user.name}
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-600">
                Login
              </Link>
              <Link to="/signup" className="hover:text-orange-600">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
