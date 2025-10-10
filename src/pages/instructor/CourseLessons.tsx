 import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosConfig";


interface Lesson {
  _id: string;
  title: string;
  content: string;
}

export default function CourseLessons() {
  const { id } = useParams<{ id: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get(`/lessons/course/${id}`);
        if (res.data.success) setLessons(res.data.data);
      } catch (err) {
        console.error("Error fetching course lessons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading lessons...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
      <ul className="space-y-3">
        {lessons.map((lesson) => (
          <li
            key={lesson._id}
            className="p-4 bg-white shadow rounded-lg border-l-4 border-blue-600"
          >
            <h3 className="font-semibold text-lg">{lesson.title}</h3>
            <p className="text-gray-600 text-sm">{lesson.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
