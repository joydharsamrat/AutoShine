import { FormEvent } from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="bg-neutral-100 py-8 lg:py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-primary-700 text-center mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col justify-center items-center text-center gap-1">
            <FaPhoneAlt className="text-primary-500 text-3xl mb-2" />
            <p className="text-lg font-semibold text-neutral-900">Call Us</p>
            <p className="text-neutral-700">+1 (123) 456-7890</p>
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-1">
            <FaEnvelope className="text-primary-500 text-3xl mb-2" />
            <p className="text-lg font-semibold text-neutral-900">Email Us</p>
            <p className="text-neutral-700">info@autoshine.com</p>
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-1">
            <FaMapMarkerAlt className="text-primary-500 text-3xl mb-2" />
            <p className="text-lg font-semibold text-neutral-900">Visit Us</p>
            <p className="text-neutral-700">123 Shine St, Car City, CC 45678</p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-neutral-700 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-neutral-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-neutral-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
