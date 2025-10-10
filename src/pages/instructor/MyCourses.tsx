 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import { Users } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  studentsCount: number;
  thumbnail?: string;
}

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyCourses = async () => {
      try {
        const res = await api.get("/enrollments/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user, token, navigate]);

  if (loading) return <p className="text-center py-10">Loading your courses...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        My Enrolled Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              className="rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition bg-white overflow-hidden cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              <img
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                }
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-purple-600">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" /> {course.studentsCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
