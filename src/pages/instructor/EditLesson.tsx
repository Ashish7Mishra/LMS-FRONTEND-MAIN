import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";

export default function EditLesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${id}`);
        if (res.data.success) {
          const l = res.data.data;
          setTitle(l.title);
          setContent(l.content);
          setVideoUrl(l.videoUrl || "");
        }
      } catch (err) {
        setError("Failed to load lesson.");
      }
    };
    fetchLesson();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.put(`/lessons/${id}`, {
        title,
        content,
        videoUrl,
      });

      if (res.data.success) {
        setSuccess("✅ Lesson updated!");
        setTimeout(() => navigate(-1), 1000);
      } else {
        setError(res.data.message || "❌ Failed to update lesson");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Lesson</h2>

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
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
}
