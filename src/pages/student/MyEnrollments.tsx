 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axiosConfig";

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments/my");
        console.log("Enrollments API:", res.data);
        setEnrollments(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching enrollments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <p className="text-center">Loading enrollments...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        My Enrollments
      </h1>

      {enrollments.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {enrollments.map((enroll: any) => (
            <div
              key={enroll._id}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {enroll.course?.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {enroll.course?.description?.slice(0, 100)}...
                </p>
              </div>
              <Link
                to={`/courses/${enroll.course?._id}`}
                className="text-purple-600 font-medium hover:underline mt-auto"
              >
                Go to Course →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have not enrolled in any courses yet.</p>
      )}
    </div>
  );
}
