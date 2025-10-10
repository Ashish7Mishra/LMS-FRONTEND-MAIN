 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate user fetch from token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Example: decode role or fetch profile from API
      setUser({
        name: "John Doe",
        email: "john@example.com",
        role: "student", // or "instructor"
      });
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">LMS Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, {user.name} 👋
        </h2>
        <p className="text-gray-600">
          You are logged in as a{" "}
          <span className="font-medium text-purple-600">{user.role}</span>
        </p>
      </div>

      {/* Dashboard Sections */}
      {user.role === "student" ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">My Enrollments</h3>
            <p className="text-gray-600">View and manage your enrolled courses.</p>
            <button
              onClick={() => navigate("/my-enrollments")}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Go to Enrollments
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Browse Courses</h3>
            <p className="text-gray-600">Explore available courses to join.</p>
            <button
              onClick={() => navigate("/courses")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Explore Courses
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">My Courses</h3>
            <p className="text-gray-600">Manage courses you created as instructor.</p>
            <button
              onClick={() => navigate("/instructor/courses")}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Manage Courses
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Create New Course</h3>
            <p className="text-gray-600">Add new courses for your students.</p>
            <button
              onClick={() => navigate("/instructor/create-course")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
