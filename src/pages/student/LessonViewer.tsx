 import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/axiosConfig";
import { Check } from "lucide-react"; // ✅ icon

interface Lesson {
  _id: string;
  title: string;
  content: string;
  videoUrl?: string;
  course: {
    _id: string;
    title: string;
  };
}

export default function LessonViewer() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [courseLessons, setCourseLessons] = useState<Lesson[]>([]);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${id}`);
        if (res.data.success) {
          setLesson(res.data.data);

          // fetch all lessons in same course
          const lessonsRes = await api.get(
            `/lessons/course/${res.data.data.course._id}`
          );
          if (lessonsRes.data.success) {
            setCourseLessons(lessonsRes.data.data);
          }

          // fetch enrollment for this course
          const enrollRes = await api.get("/enrollments/my-enrollments");
          if (enrollRes.data.success) {
            const match = enrollRes.data.data.find(
              (en: any) => en.course._id === res.data.data.course._id
            );
            if (match) {
              setEnrollmentId(match._id);
              setCompletedLessons(match.completedLessons || []);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleMarkComplete = async () => {
    if (!lesson || !enrollmentId) return;
    try {
      const res = await api.patch(`/enrollments/${enrollmentId}/progress`, {
        lessonId: lesson._id,
      });
      if (res.data.success) {
        setMessage("✅ Lesson marked as completed!");
        setCompletedLessons((prev) =>
          prev.includes(lesson._id) ? prev : [...prev, lesson._id]
        );
        // notify other components
        window.dispatchEvent(new Event("progressUpdated"));
      }
    } catch (err: any) {
      console.error("Error updating progress:", err);
      setMessage("❌ Could not update progress");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!lesson) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">Lesson not found.</p>
        <Link
          to="/courses"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Lesson Content */}
      <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

        {lesson.videoUrl && (
          <div className="mb-6">
            <video
              src={lesson.videoUrl}
              controls
              className="w-full rounded-lg shadow"
            />
          </div>
        )}

        <p className="text-gray-700 whitespace-pre-line mb-6">
          {lesson.content}
        </p>

        {enrollmentId && (
          <button
            onClick={handleMarkComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded font-semibold shadow hover:opacity-90"
          >
            Mark as Completed
          </button>
        )}

        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>

      {/* Sidebar - Course Lessons */}
      <div className="bg-gray-50 shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          {lesson.course?.title} - Lessons
        </h3>
        <ul className="space-y-2">
          {courseLessons.map((l) => {
            const isCompleted = completedLessons.includes(l._id);
            return (
              <li key={l._id} className="flex items-center justify-between">
                <Link
                  to={`/lessons/${l._id}`}
                  className={`flex-1 px-3 py-2 rounded ${
                    l._id === lesson._id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {l.title}
                </Link>
                {isCompleted && (
                  <Check className="text-green-600 ml-2" size={18} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
