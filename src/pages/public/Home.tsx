import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import CourseCard from "../../components/CourseCard";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor?: string | { _id: string; name: string; email: string };
  imageUrl?: string;
}

export default function Home() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses"); // deployed API
        const data = res.data?.data?.data || [];
        setCourses(data.slice(0, 3)); // latest 3 courses
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          {user
            ? `Welcome back, ${user.role === "instructor" ? "Instructor" : "Student"} ${user.name}!`
            : "Welcome to Mini-LMS 🚀"}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          {user
            ? "Continue your learning journey or manage courses below."
            : "A lightweight LMS for students and instructors. Explore courses, enroll, and track your progress."}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/courses"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Browse Courses
          </Link>
          {!user && (
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-lg shadow hover:bg-blue-50 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Latest Courses</h2>
        {loading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <p className="text-gray-600">No courses available yet.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-10">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              View All Courses →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
