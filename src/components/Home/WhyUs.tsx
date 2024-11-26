const WhyChooseUs = () => {
  return (
    <div className="mt-20 max-w-7xl mx-auto px-5 ">
      <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
        Why choose us
      </h2>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-20">
        {/* Cards Section */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 gap-8">
          {/* Top */}
          <div className="flex justify-center">
            <div className="sm:w-1/2 bg-neutral-200 p-2 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary-700">
                Quality Assurance
              </h3>
              <p className="text-sm text-neutral-700">
                We use only the best products and techniques to give your car
                the care it deserves.
              </p>
            </div>
          </div>

          {/* Middle */}
          <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">
            <div className="sm:w-2/5 bg-neutral-200 p-2 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary-700">
                Experienced Professionals
              </h3>
              <p className="text-sm text-neutral-700">
                Our team is trained and experienced to handle all your car care
                needs.
              </p>
            </div>
            <div className="sm:w-2/5 bg-neutral-200 p-2 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary-700">
                Convenience of Booking
              </h3>
              <p className="text-sm text-neutral-700">
                Easily schedule your service online at a time that works for
                you.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-center">
            <div className="sm:w-1/2 bg-neutral-200 p-2 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary-700">
                Affordable Pricing
              </h3>
              <p className="text-sm text-neutral-700">
                Get top-notch service at a price that fits your budget.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co.com/K0ychDY/Car-wash.png"
            alt="Why Choose Us"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
