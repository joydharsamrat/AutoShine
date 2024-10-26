import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-primary-700">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className=" flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-500 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex-1 flex items-center justify-between px-2">
                <NavLink to="/" className="flex-shrink-0 flex  items-end">
                  <img
                    src="/logo.png"
                    className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                    alt="Logo"
                  />
                  <h1 className="logo sm:text-3xl">AutoShine</h1>
                </NavLink>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/home"
                      className="text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/services"
                      className="text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Services
                    </NavLink>
                    <NavLink
                      to="/booking"
                      className="text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Booking
                    </NavLink>
                    <NavLink
                      to="/about"
                      className="text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="/contact"
                      className="text-white hover:bg-primary-500 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </NavLink>
                  </div>
                </div>
                <div>
                  <NavLink to="/login" className="btn-outline-neutral">
                    Login
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <DisclosureButton
                as={NavLink}
                to="/home"
                className="block text-white hover:bg-primary-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </DisclosureButton>
              <DisclosureButton
                as={NavLink}
                to="/services"
                className="block text-white hover:bg-primary-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </DisclosureButton>
              <DisclosureButton
                as={NavLink}
                to="/booking"
                className="block text-white hover:bg-primary-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Booking
              </DisclosureButton>
              <DisclosureButton
                as={NavLink}
                to="/about"
                className="block text-white hover:bg-primary-500 px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </DisclosureButton>
              <DisclosureButton
                as={NavLink}
                to="/contact"
                className="block text-white hover:bg-primary-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
