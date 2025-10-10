 import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

interface Lesson {
  _id: string;
  title: string;
  content: string;
}

export default function ManageLessons() {
  const { id } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);

  const fetchLessons = async (page: number) => {
    try {
      const res = await api.get(`/lessons/course/${id}?page=${page}&limit=${limit}`);
      const data = res.data?.data?.lessons || [];
      const pagination = res.data?.data?.pagination || {};
      setLessons(data);
      setTotal(pagination.total || 0);
    } catch {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLessons(page);
  }, [id, page]);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/lessons", { courseId: id, title, content });
      toast.success("Lesson added!");
      setTitle("");
      setContent("");
      fetchLessons(page);
    } catch {
      toast.error("Error adding lesson");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await api.delete(`/lessons/${lessonId}`);
      toast.success("Lesson deleted");
      fetchLessons(page);
    } catch {
      toast.error("Error deleting lesson");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Manage Lessons</h2>

      {/* Add Lesson Form */}
      <form onSubmit={handleAddLesson} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <input
          type="text"
          placeholder="Lesson Title"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Lesson Content"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Add Lesson
        </button>
      </form>

      {/* Lessons List */}
      <h3 className="text-xl font-semibold mb-3">Lessons</h3>
      {lessons.length === 0 ? (
        <p>No lessons yet.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {lessons.map((lesson) => (
              <li key={lesson._id} className="bg-gray-50 p-4 rounded flex justify-between items-center shadow-sm">
                <span>{lesson.title}</span>
                <button
                  onClick={() => handleDeleteLesson(lesson._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
