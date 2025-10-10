 import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axiosConfig";


interface Lesson {
  _id: string;
  title: string;
  course: { _id: string; title: string };
}

export default function AllLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLessons = async () => {
      try {
        const res = await api.get("/lessons");
        if (res.data.success) setLessons(res.data.data);
      } catch (err) {
        console.error("Error fetching all lessons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLessons();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading lessons...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">All Lessons</h2>
      <table className="w-full border shadow rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Course</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-t">
              <td className="p-3">{lesson.title}</td>
              <td className="p-3">{lesson.course?.title}</td>
              <td className="p-3">
                <Link
                  to={`/admin/lessons/${lesson._id}/edit`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </Link>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
