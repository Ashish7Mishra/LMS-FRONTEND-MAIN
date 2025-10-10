 import { Routes, Route } from "react-router-dom";

// Public Pages
 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/public/Home";
import Courses from "./pages/public/Courses";
import CourseDetails from "./pages/public/CourseDetails";
//import LessonViewer from "./pages/public/LessonViewer"; <Route path="/lessons/:id" element={<LessonViewer />} />

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import MyEnrollments from "./pages/student/MyEnrollments";

// Instructor/Admin Pages
import AdminDashboard from "./pages/instructor/AdminDashboard";
import MyCourses from "./pages/instructor/MyCourses";
import CreateCourse from "./pages/instructor/CreateCourse";
import EditCourse from "./pages/instructor/EditCourse";
import ManageLessons from "./pages/instructor/ManageLessons";
import CourseLessons from "./pages/instructor/CourseLessons";
import AllLessons from "./pages/instructor/AllLessons";
import CreateLesson from "./pages/instructor/CreateLesson";
import EditLesson from "./pages/instructor/EditLesson";

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
                <AdminDashboard handleLogout={() => console.log("Logout")} />
              </ProtectedRoute>
            }
          />

          {/* Instructor - Courses */}
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/create"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <EditCourse />
              </ProtectedRoute>
            }
          />

          {/* Instructor - Lessons */}
          <Route
            path="/admin/courses/:id"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <ManageLessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/:id/add-lesson"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateLesson />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lessons/:id/edit"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <EditLesson />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lessons"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <AllLessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/:id/lessons"
            element={
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CourseLessons />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
