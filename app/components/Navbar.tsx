export const Navbar: React.FC = () => {
  return (
    <nav className="bg-opacity-80 backdrop-blur-md shadow-md sticky">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-700">
            Report Genius
          </div>
          <div className="space-x-6 text-gray-700">
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
