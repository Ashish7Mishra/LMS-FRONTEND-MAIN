import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/AuthContext";

interface Lesson {
  _id: string;
  title: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category?: string;
  imageUrl?: string;
  instructor?: { _id: string; name: string; email: string } | string;
  lessons?: Lesson[];
}

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data?.data);
      // Optional: check if user already enrolled
      if (user?.role === "student") {
        const enrolledRes = await api.get("/enrollments/my");
        const enrolledCourses = enrolledRes.data?.data || [];
        setEnrolled(enrolledCourses.some((c: any) => c.course._id === id));
      }
    } catch (err) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post("/enrollments", { courseId: id });
      toast.success("Enrolled successfully!");
      setEnrolled(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Spinner />;
  if (!course) return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Course Header */}
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow"
        />
      )}
      <h1 className="text-4xl font-bold text-blue-600 mb-2">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        By{" "}
        {typeof course.instructor === "object"
          ? course.instructor?.name
          : course.instructor || "Unknown"}
      </p>

      {/* Enroll Button */}
      {user?.role === "student" && !enrolled && (
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mb-6"
        >
          {enrolling ? "Enrolling..." : "Enroll in Course"}
        </button>
      )}
      {enrolled && (
        <p className="text-green-600 font-semibold mb-6">You are enrolled in this course.</p>
      )}

      {/* Lessons */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lessons</h2>
      {course.lessons && course.lessons.length > 0 ? (
        <ul className="space-y-3">
          {course.lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="border p-3 rounded hover:shadow cursor-pointer"
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No lessons added yet.</p>
      )}
    </div>
  );
}
