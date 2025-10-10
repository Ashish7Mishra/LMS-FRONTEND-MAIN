 import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";

interface Lesson {
  _id: string;
  title: string;
  duration: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  lessons?: Lesson[];
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        setError("Failed to load course details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!id) return;
    setEnrolling(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/enrollments", { courseId: id });
      if (res.data.success) {
        setSuccess("✅ Enrolled successfully!");
        setTimeout(() => navigate("/my-courses"), 1500);
      } else {
        setError(res.data.message || "Failed to enroll.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error during enrollment");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading course...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Course Image */}
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-80 object-cover rounded-lg shadow"
          />
        )}

        {/* Course Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {course.category}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Price:</span>{" "}
            {course.price > 0 ? `₹${course.price}` : "Free"}
          </p>

          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 disabled:opacity-60"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}
        </div>
      </div>

      {/* Lessons Preview */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Lessons Included
        </h2>
        {course.lessons && course.lessons.length > 0 ? (
          <ul className="space-y-3">
            {course.lessons.map((lesson, idx) => (
              <li
                key={lesson._id}
                className="p-4 border rounded-lg shadow-sm flex justify-between"
              >
                <span>
                  {idx + 1}. {lesson.title}
                </span>
                <span className="text-sm text-gray-500">
                  {lesson.duration}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No lessons available yet.</p>
        )}
      </div>
    </div>
  );
}
