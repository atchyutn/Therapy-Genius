const Navbar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200">
      <nav className="bg-opacity-80 backdrop-blur-md shadow-md sticky">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-700">
              <a
                href="/"
                className="hover:text-indigo-600 transition duration-300 font-bold"
              >
                Therapy Genius
              </a>
            </div>
            <div className="space-x-6 text-gray-700">
              <a
                href="/"
                className="hover:text-indigo-600 transition duration-300 font-bold"
              >
                Home
              </a>
              {/* <a
              href="#"
              className="hover:text-indigo-600 transition duration-300 font-bold"
            >
              Features
            </a> */}
              <a
                href="/pricing"
                className="hover:text-indigo-600 transition duration-300 font-bold"
              >
                Pricing
              </a>
              <a
                href="/about-us"
                className="hover:text-indigo-600 transition duration-300 font-bold"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
