import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetFeaturedServicesQuery } from "../../redux/features/service/service.api";
import { TService } from "../../types";

export default function FeaturedServices() {
  const { data, isLoading, isError } = useGetFeaturedServicesQuery(undefined);

  if (isLoading) {
    return <div className="text-center">Loading featured services...</div>;
  }

  if (isError || !data?.success) {
    return <div className="text-center">Failed to load featured services.</div>;
  }

  const featuredServices = data?.data || [];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-primary-700 ">
        Featured Services
      </h2>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        spaceBetween={20}
        pagination={true}
        navigation={true}
        style={{
          padding: "50px 0", // Adjust this value for horizontal padding
        }}
        className="w-full max-w-7xl mx-auto "
      >
        {featuredServices.map((service: TService) => (
          <SwiperSlide key={service._id}>
            <div className="flex flex-col items-center justify-center bg-primary-100 rounded-lg shadow-md p-6 text-center ">
              <h3 className="text-2xl font-semibold text-primary-700 mb-2">
                {service.name}
              </h3>
              <p className="text-neutral-700 mb-4">{service.description}</p>
              <p className="text-secondary-700 font-bold mb-2">
                ${service.price} / {service.duration} min
              </p>
              <button className="btn-primary">Book Now</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
