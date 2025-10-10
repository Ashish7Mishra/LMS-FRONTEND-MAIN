 import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import { Link } from "react-router-dom";

interface Enrollment {
  _id: string;
  course: {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    category?: string;
  };
  progress: number;
}

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setError(null);
        if (user.role !== "student") {
          setError("Only students can view enrollments.");
          setLoading(false);
          return;
        }

        const res = await api.get("/enrollments/my-enrollments");
        console.log("API response (MyEnrollments):", res.data);

        if (res.data.success) {
          const enrollArray = res.data.data?.data || [];
          setEnrollments(enrollArray);
        } else {
          setError(res.data.message || "Failed to fetch enrollments");
        }
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError("Unable to load enrollments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>

      {enrollments.length === 0 ? (
        <p className="text-gray-600">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enroll) => (
            <div
              key={enroll._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col relative"
            >
              {enroll.progress === 100 && (
                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Completed
                </span>
              )}
              <img
                src={enroll.course.imageUrl || "https://via.placeholder.com/400"}
                alt={enroll.course.title}
                className="w-full h-44 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{enroll.course.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                {enroll.course.description.substring(0, 80)}...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${enroll.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Progress: {enroll.progress}%
              </p>
              <Link
                to={`/courses/${enroll.course._id}`}
                className="mt-4 block text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded font-semibold hover:opacity-90"
              >
                Continue Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
