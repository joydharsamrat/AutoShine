import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2">
            <NavLink to="/" className="flex  items-end mb-4">
              <img
                src="/logo.png"
                className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                alt="Logo"
              />
              <h1 className="logo sm:text-3xl ">AutoShine</h1>
            </NavLink>
            <h3 className="text-xl font-semibold text-secondary-100">
              About AutoShine
            </h3>
            <p className="mt-4 text-neutral-300">
              AutoShine offers premium car wash and detailing services to make
              your car look brand new, inside and out. Quality service, every
              time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-100">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-100">
              Contact Us
            </h2>
            <p className="mt-4 text-neutral-300">
              123 Shine St, Car City, CC 45678
            </p>
            <p className="text-neutral-300 mt-2">+1 (234) 567-8901</p>
            <p className="text-neutral-300 mt-2">info@autoshine.com</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                className="text-secondary-500 hover:text-secondary-700 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-secondary-500 hover:text-secondary-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-secondary-500 hover:text-secondary-700 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-neutral-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400">
            © 2024 AutoShine. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <NavLink
              to="/terms"
              className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="/privacy"
              className="text-neutral-300 hover:text-secondary-300 transition-colors duration-300"
            >
              Privacy Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
