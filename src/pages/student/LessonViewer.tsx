 import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosConfig";

export default function LessonViewer() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${id}`);
        console.log("Lesson details response:", res.data);
        setLesson(res.data?.data);
      } catch (err) {
        console.error("Error fetching lesson", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  if (loading) return <p className="text-center">Loading lesson...</p>;
  if (!lesson) return <p className="text-center text-red-500">Lesson not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">{lesson.title}</h1>
      <p className="text-gray-700 mb-6">{lesson.content}</p>

      {lesson.videoUrl && (
        <div className="mb-6">
          <video
            src={lesson.videoUrl}
            controls
            className="w-full rounded-lg shadow"
          />
        </div>
      )}

      {lesson.resources?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <ul className="list-disc list-inside text-purple-600">
            {lesson.resources.map((res: string, idx: number) => (
              <li key={idx}>
                <a href={res} target="_blank" rel="noopener noreferrer">
                  {res}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
