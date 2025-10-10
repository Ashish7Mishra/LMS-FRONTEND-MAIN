import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";


export default function CreateLesson() {
  const { id } = useParams<{ id: string }>(); // courseId
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/lessons", {
        course: id,
        title,
        content,
        videoUrl,
      });

      if (res.data.success) {
        setSuccess("✅ Lesson created successfully!");
        setTimeout(() => navigate(`/admin/courses/${id}`), 1000);
      } else {
        setError(res.data.message || "❌ Failed to create lesson");
      }
    } catch (err: any) {
      console.error("Lesson create error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Lesson</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Lesson Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          required
        />

        <input
          type="url"
          placeholder="Video URL (optional)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
}
