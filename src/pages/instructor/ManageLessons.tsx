 import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/axiosConfig";

interface Lesson {
  _id: string;
  title: string;
  content: string;
}

export default function ManageLessons() {
  const { id } = useParams<{ id: string }>(); // courseId
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchLessons = async () => {
    try {
      const res = await api.get(`/lessons/course/${id}`);
      if (res.data.success) {
        setLessons(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching lessons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [id]);

  const handleDelete = async (lessonId: string) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const res = await api.delete(`/lessons/${lessonId}`);
      if (res.data.success) {
        setMessage("✅ Lesson deleted successfully");
        setLessons((prev) => prev.filter((l) => l._id !== lessonId));
      } else {
        setMessage("❌ Failed to delete lesson");
      }
    } catch (err) {
      console.error("Delete lesson error:", err);
      setMessage("❌ Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading lessons...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Lessons</h2>
        <Link
          to={`/admin/courses/${id}/add-lesson`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Lesson
        </Link>
      </div>

      {message && <p className="mb-4 text-center text-sm text-gray-600">{message}</p>}

      {lessons.length === 0 ? (
        <p className="text-gray-600">No lessons found for this course.</p>
      ) : (
        <ul className="space-y-3">
          {lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <span className="font-medium">{lesson.title}</span>
              <div className="space-x-2">
                <Link
                  to={`/admin/lessons/${lesson._id}/edit`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
