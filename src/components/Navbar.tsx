import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="font-bold text-xl">
          Mini-LMS
        </Link>

        <div className="flex items-center space-x-4">
          {/* Public links */}
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>

          {/* Role-based links */}
          {user ? (
            <>
              {user.role === "student" && (
                <>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                  <Link to="/my-courses" className="hover:underline">
                    My Courses
                  </Link>
                </>
              )}

              {user.role === "instructor" && (
                <>
                  <Link to="/admin" className="hover:underline">
                    Admin Dashboard
                  </Link>
                  <Link to="/admin/create-course" className="hover:underline">
                    Create Course
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
