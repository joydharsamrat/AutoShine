// Import Swiper and required modules in your FeaturedServices.tsx file
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function FeaturedServices() {
  const services = [
    {
      id: 1,
      name: "Premium Wash",
      description:
        "Get a thorough cleaning for your car with our premium wash service.",
      image: "/assets/images/hero.webp",
    },
    {
      id: 2,
      name: "Interior Detailing",
      description:
        "Complete detailing of the interior to keep your car fresh and clean.",
      image: "/assets/images/hero.webp",
    },
    {
      id: 3,
      name: "Engine Cleaning",
      description:
        "Ensure your engine is clean and running efficiently with our service.",
      image: "/assets/images/hero.webp",
    },
    // Add more services as needed
  ];

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Services</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {service.description}
                </p>
                <button className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
