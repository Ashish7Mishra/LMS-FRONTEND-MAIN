 import { useEffect, useMemo, useState } from "react";
import api from "../../utils/axiosConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

interface Enrollment {
  _id: string;
  course: Course;
  progress: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"inprogress" | "completed" | "explore">(
    "inprogress"
  );

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setError(null);
        setLoading(true);
        if (user?.role !== "student") {
          setEnrollments([]);
          return;
        }
        const res = await api.get("/enrollments/my-enrollments");
        console.log("Student enrollments API:", res.data);
        if (res.data.success) {
          const arr = res.data.data?.data || [];
          setEnrollments(arr);
        } else {
          setError(res.data.message || "Failed to fetch enrollments");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load enrollments. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
    const listener = () => fetchEnrollments();
    window.addEventListener("progressUpdated", listener);
    return () => window.removeEventListener("progressUpdated", listener);
  }, [user?.role]);

  const stats = useMemo(() => {
    const total = enrollments.length;
    const completed = enrollments.filter((e) => e.progress >= 100).length;
    const inProgress = total - completed;
    return { total, completed, inProgress };
  }, [enrollments]);

  const filtered = useMemo(() => {
    if (tab === "inprogress")
      return enrollments.filter((e) => e.progress > 0 && e.progress < 100);
    if (tab === "completed") return enrollments.filter((e) => e.progress >= 100);
    // explore: show all (or you may fetch marketplace separately)
    return enrollments;
  }, [enrollments, tab]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Resume learning where you left off.</p>
      </header>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="text-2xl font-semibold">{stats.total}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-semibold">{stats.completed}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-semibold">{stats.inProgress}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setTab("inprogress")}
          className={`px-4 py-2 rounded-md ${tab === "inprogress" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`px-4 py-2 rounded-md ${tab === "completed" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Completed
        </button>
        <button
          onClick={() => setTab("explore")}
          className={`px-4 py-2 rounded-md ${tab === "explore" ? "bg-blue-600 text-white" : "bg-white border"}`}
        >
          Explore
        </button>
      </div>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm">
          <p className="mb-3">No courses to show in this tab.</p>
          <Link to="/courses" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((enroll) => (
            <article key={enroll._id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={enroll.course.imageUrl || "https://via.placeholder.com/600x400"}
                  alt={enroll.course.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold">{enroll.course.title}</h3>
                <p className="text-sm text-gray-500 mt-2 flex-1">{enroll.course.description.substring(0, 100)}...</p>

                {/* progress */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      style={{ width: `${Math.max(0, Math.min(100, enroll.progress))}%` }}
                      className="h-2 rounded bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>{enroll.progress}%</span>
                    <Link to={`/courses/${enroll.course._id}`} className="text-blue-600 font-medium">
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
