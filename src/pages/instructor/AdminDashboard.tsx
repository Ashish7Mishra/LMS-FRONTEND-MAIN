 import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { BookOpen, Layers, User, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Instructor</h2>

        <nav className="flex flex-col space-y-4 flex-grow">
          <Link
            to="/admin/courses"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <BookOpen className="w-5 h-5" />
            <span>My Courses</span>
          </Link>

          <Link
            to="/admin/lessons"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <Layers className="w-5 h-5" />
            <span>Lessons</span>
          </Link>

          <Link
            to="/admin/profile"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <button
          onClick={logout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-6"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user?.name || "Instructor"} 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Courses */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Manage Courses
            </h3>
            <p className="text-gray-500 text-sm">
              Create, edit, and manage your teaching courses.
            </p>
            <Link
              to="/admin/courses"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Go to Courses →
            </Link>
          </div>

          {/* Card: Lessons */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Manage Lessons
            </h3>
            <p className="text-gray-500 text-sm">
              Add and edit lessons inside your courses.
            </p>
            <Link
              to="/admin/lessons"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Go to Lessons →
            </Link>
          </div>

          {/* Card: Profile */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Profile Settings
            </h3>
            <p className="text-gray-500 text-sm">
              Update your profile and account settings.
            </p>
            <Link
              to="/admin/profile"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              Go to Profile →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
