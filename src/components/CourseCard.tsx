import { Link } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface CourseProps {
  course: {
    _id: string;
    title: string;
    description: string;
    instructor?: { _id: string; name: string; email: string } | string;
    imageUrl?: string;
  };
}

export default function CourseCard({ course }: CourseProps) {
  return (
    <Card className="flex flex-col h-full">
      {/* Image */}
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-40 object-cover rounded-t-lg mb-3"
        />
      )}

      {/* Text content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 flex-grow">{course.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          By{" "}
          {typeof course.instructor === "object"
            ? course.instructor?.name
            : course.instructor || "Unknown"}
        </p>
      </div>

      {/* Button */}
      <div className="mt-4">
        <Link to={`/courses/${course._id}`}>
          <Button
            variant="primary"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            View Details
          </Button>
        </Link>

      </div>
    </Card>
  );
}
