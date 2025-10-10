 import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/public/Home";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import MyEnrollments from "./pages/student/MyEnrollments";
import LessonViewer from "./pages/student/LessonViewer";

// Instructor Pages
import AdminDashboard from "./pages/instructor/AdminDashboard";
import ManageLessons from "./pages/instructor/ManageLessons";
import CreateCourse from "./pages/instructor/CreateCourse";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6 mt-20">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/lessons/:id" element={<LessonViewer />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student-only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MyEnrollments />
              </ProtectedRoute>
            }
          />

          {/* Instructor-only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="courses/:id" element={<ManageLessons />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
