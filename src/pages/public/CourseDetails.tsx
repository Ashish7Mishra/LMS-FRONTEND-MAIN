 import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { CheckCircle, X } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor?: { _id: string; name: string; email: string } | string;
  imageUrl?: string;
  lessons?: { _id: string; title: string; duration: string }[];
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "instructor">("overview");

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  const defaultImage = "https://via.placeholder.com/800x400.png?text=Course+Banner";

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Banner */}
        <div className="h-64 w-full rounded-xl overflow-hidden shadow-md">
          <img
            src={course.imageUrl || defaultImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tabs */}
        <div>
          <div className="flex border-b mb-4 space-x-6">
            {["overview", "lessons", "instructor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 px-1 font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
            </div>
          )}

          {activeTab === "lessons" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Lessons</h2>
              {course.lessons && course.lessons.length > 0 ? (
                <ul className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <li
                      key={lesson._id}
                      className="p-3 bg-white shadow-sm rounded-lg flex justify-between"
                    >
                      <span>{lesson.title}</span>
                      <span className="text-gray-500">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No lessons added yet.</p>
              )}
            </div>
          )}

          {activeTab === "instructor" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Instructor</h2>
              <p>
                {typeof course.instructor === "object"
                  ? course.instructor?.name
                  : course.instructor || "Unknown"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <Card className="p-6 space-y-6">
        <img
          src={course.imageUrl || defaultImage}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md"
        />

        <div>
          <h3 className="font-bold mb-2">Course Includes</h3>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> 10 hours on-demand video
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Downloadable resources
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Access on mobile and TV
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Certificate of completion
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">What you'll learn</h3>
          <ul className="space-y-1 text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500 w-4 h-4" /> Master the basics of React
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500 w-4 h-4" /> Build real-world projects
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500 w-4 h-4" /> State management with hooks
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-blue-500 w-4 h-4" /> Deploy React apps
            </li>
          </ul>
        </div>

        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Enroll Now
        </Button>
      </Card>
    </div>
  );
}
