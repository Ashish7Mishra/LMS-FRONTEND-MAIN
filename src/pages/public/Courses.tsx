import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import CourseCard from "../../components/CourseCard";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor?: { _id: string; name: string; email: string } | string;
  imageUrl?: string;
  category?: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get("/courses", {
        params: { page, limit, search, category },
      });
      const data = res.data?.data?.data || [];
      const pagination = res.data?.data?.pagination || {};
      setCourses(data);
      setTotal(pagination.total || data.length);
    } catch (err) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, search, category]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">All Courses</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Courses List */}
      {loading ? (
        <Spinner />
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-600">No courses found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                page === idx + 1
                  ? "bg-blue-600 text-white"
                  : "border text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
