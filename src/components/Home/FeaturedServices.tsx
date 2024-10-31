import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetFeaturedServicesQuery } from "../../redux/features/service/service.api";
import { TService } from "../../types";
import { useNavigate } from "react-router-dom";
import FeaturedServiceSkeleton from "../Shared/Loaders/Skeleton/FeaturedserviceSckeleton";

export default function FeaturedServices() {
  const { data, isLoading } = useGetFeaturedServicesQuery(undefined);
  const navigate = useNavigate();

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
          padding: "50px 0",
        }}
        className="w-full max-w-7xl mx-auto "
      >
        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <FeaturedServiceSkeleton key={index} />
            ))}
          </div>
        ) : (
          featuredServices.map((service: TService) => (
            <SwiperSlide key={service._id}>
              <div className="flex flex-col items-center justify-center bg-neutral-200 rounded-lg shadow-md p-6 text-center ">
                <h3 className="text-2xl font-semibold text-primary-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-neutral-700 mb-4">{service.description}</p>
                <div className="sm:flex mb-2 font-bold gap-5">
                  <p className="text-secondary-700">Price: ${service.price}</p>
                  <p className="text-primary-700">
                    Duration: {service.duration} min
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="btn-primary"
                >
                  Book Now
                </button>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}
