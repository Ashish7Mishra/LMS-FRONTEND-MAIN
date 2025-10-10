 import { useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">Instructor Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

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
    </div>
  );
}
