

import PropTypes from "prop-types";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`${className} relative bg-black p-6 flex flex-col items-center`}>
      <div className="w-full max-w-6xl flex justify-between items-start">
        {/* Left Side Image */}
        <div className="relative">
          <img
            src="/public/images/1.png" // Ensure this is a valid image path
            alt="Left Side"
            className="w-80 h-auto object-cover"
          />
        </div>

        {/* Right Side Navigation */}
        <div
          className="flex flex-col items-start gap-4 ml-auto"
          style={{
            opacity: "1", // Keep it visible
          }}
        >
          <ul className="flex flex-wrap gap-10 text-white text-sm">
            <li className="cursor-pointer hover:underline">HOME</li>
            <li className="cursor-pointer hover:underline">SERVICES</li>
            <li className="cursor-pointer hover:underline">COMPANY</li>
            <li className="cursor-pointer hover:underline">DASHBOARD</li>
            <li className="cursor-pointer hover:underline">CONTACT US</li>
            <li className="cursor-pointer hover:underline">BLOGS</li>
          </ul>
        </div>
      </div>

      {/* Subscribe to Newsletter Section */}
      <div className="w-full bg-black text-white py-6">
        <div className="max-w-6xl mx-auto">
          <hr className="w-full border-t border-white" />
          <div className="flex justify-between items-center mt-4">
            {/* Left-Aligned Content */}
            <div>
              <h2 className="text-lg font-semibold text-left">
                Subscribe to our newsletter
              </h2>
              <p className="text-sm mt-2">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>

            {/* Right-Aligned Form */}
            <div className="flex items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-4 py-2 border border-gray-300 rounded-md text-sm text-black"
              />
              <button
                type="submit"
                className="px-6 py-2 text-sm font-semibold uppercase text-white rounded-md"
                style={{ backgroundColor: "rgba(68, 75, 211, 1)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="max-w-6xl mx-auto mt-10">
          <hr className="w-full border-t border-white" />
          <div className="flex justify-between items-center mt-4 text-sm">
            {/* Left Content */}
            <div>© 2024 Dlex, Inc. All rights reserved</div>

            {/* Right Content (Social Icons) */}
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-75">
              <FaFacebook />
              </a>
              <a href="#" className="hover:opacity-75">
              <FaXTwitter />
              </a>
              <a href="#" className="hover:opacity-75">
              <BsInstagram />
              </a>
              <a href="#" className="hover:opacity-75">
              <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
