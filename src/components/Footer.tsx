 export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} LMS. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-purple-600 text-sm font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
