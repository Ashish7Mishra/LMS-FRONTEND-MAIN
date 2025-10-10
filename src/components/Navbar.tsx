 import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Learnify
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          >
            Courses
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {user.role === "student" && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "instructor" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
