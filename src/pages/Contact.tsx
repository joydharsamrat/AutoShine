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
    <section className="bg-neutral-100 pt-8 lg:pt-16 ">
      <div className="container mx-auto max-w-4xl px-5">
        <h2 className="text-3xl font-bold text-primary-700 text-center mb-8">
          Contact Us
        </h2>

        {/* Contact Info */}
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

        {/* Contact Form */}
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
      {/* Map Section */}
      <div className="mt-20">
        <div className="w-full h-96 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.662006842907!2d-0.12953152434189094!3d51.51941660982664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b323093d307%3A0x2fb199016d5642a7!2sThe%20British%20Museum!5e0!3m2!1sen!2sbd!4v1732671197552!5m2!1sen!2sbd"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
