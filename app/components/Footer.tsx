import React from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-8 rounded-3xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Therapy Genius</h3>
            <p className="mb-4">
              Revolutionizing report writing for therapy with AI-powered
              solutions.
            </p>
            <p>© {currentYear} Therapy Genius. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-pink-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                {/* <a href="#" className="hover:text-pink-300 transition-colors">
                  Features
                </a> */}
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-pink-300 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className="hover:text-pink-300 transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">123 AI Street, Tech City, 12345</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p>Email: info@therapygenius.tech</p>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-pink-500 px-4 py-2 rounded-r-md hover:bg-pink-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        {/* <div className="mt-8 pt-8 border-t border-white/30 flex justify-center space-x-6">
          <a href="#" className="hover:text-pink-300 transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            <FaLinkedinIn size={24} />
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
