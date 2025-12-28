import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide menu on login/signup
  const hideMenu =
    location.pathname === "/login" || location.pathname === "/signup";

  // Lock background scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  if (hideMenu) {
    return (
      <nav className="px-6 py-4 shadow bg-white">
        <Link to="/" className="text-xl font-bold text-orange-600">
          MealDash
        </Link>
      </nav>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-xl font-bold text-orange-600">
            MealDash
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-sm font-medium">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <Link to="/cart" className="hover:text-orange-600">Cart</Link>

            {user && (
              <Link to="/myorders" className="hover:text-orange-600">
                My Orders
              </Link>
            )}

            {user?.isAdmin && (
              <Link to="/admin" className="font-semibold hover:text-orange-600">
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" className="font-semibold hover:text-orange-600">
                  {user.name}
                </Link>
                <button
                  onClick={logout}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* SLIDE-IN MENU (RIGHT) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50
          transform transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col gap-6 text-lg">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>

          {user && (
            <Link to="/myorders" onClick={() => setMenuOpen(false)}>
              My Orders
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              DashBoard
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                {user.name}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-600 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
