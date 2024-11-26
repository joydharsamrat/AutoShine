import toast from "react-hot-toast";
import { FaMailBulk } from "react-icons/fa";

const Newsletter = () => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
      <div className="w-full lg:w-2/5">
        <img
          src="https://i.ibb.co.com/gJVWbvL/Newsletter.webp"
          alt="newsletter"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-full lg:w-2/5 flex flex-col justify-center items-start gap-6">
        <div className="flex items-center gap-4">
          <p className="text-4xl text-primary-700">
            <FaMailBulk />
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900">
            Subscribe to Our Newsletter
          </h2>
        </div>
        <p className="text-sm text-neutral-600">
          Stay updated with the latest news, exclusive offers, and car care
          tips! Join our newsletter today.
        </p>
        <div>
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you.");
              const form = e.target as HTMLFormElement;
              form.reset();
            }}
          >
            <input
              required
              name="email"
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-4 py-3 h-11 sm:h-12 w-full rounded-l-md bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-0 focus:ring-secondary-500"
            />
            <button className="px-2 sm:px-6 py-3 rounded-r-md bg-secondary-500 text-white font-semibold hover:bg-secondary-700 transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
