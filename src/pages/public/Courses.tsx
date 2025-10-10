 import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../utils/axiosConfig";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        console.log("Fetched courses:", res.data);

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (res.data && Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching courses", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 shadow-md bg-white overflow-hidden"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="flex justify-between pt-3">
                <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
        Available Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition bg-white overflow-hidden">
                <img
                  src={course.img || "https://via.placeholder.com/600x400"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {course.category || "General"}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students || 0}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No courses available
          </p>
        )}
      </div>
    </div>
  );
}
