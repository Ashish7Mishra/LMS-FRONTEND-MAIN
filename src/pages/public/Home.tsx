 import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";

interface Course {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const res = await api.get("/courses?limit=3");
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("Error fetching featured courses", err);
      }
    };
    fetchFeaturedCourses();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white max-w-3xl">
          <h2 className="text-lg font-semibold uppercase tracking-wide">
            Welcome to Learnify
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold my-4">
            Unlock Your Potential
          </h1>
          <p className="mb-6 text-lg">
            Learn new skills, upgrade your career, and grow with expert-led
            courses.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/courses"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:opacity-90"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:opacity-90"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-700">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
              >
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className="mt-3 inline-block text-blue-600 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No featured courses available
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
