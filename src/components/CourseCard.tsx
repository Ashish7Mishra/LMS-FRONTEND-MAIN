 import React from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  featured?: boolean;
}

const API_BASE_URL = "http://localhost:5000"; // backend URL

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={
          course.image
            ? `${API_BASE_URL}/${course.image}`
            : "https://via.placeholder.com/600x400"
        }
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-sm text-gray-600">{course.description}</p>
        <span className="mt-2 inline-block bg-green-500 text-white px-2 py-1 text-xs rounded">
          {course.category}
        </span>
      </div>
    </div>
  );
}
