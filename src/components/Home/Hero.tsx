import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { NavLink } from "react-router-dom";
import styles from "../../styles/home/Hero.module.css";

export default function Hero() {
  return (
    <div className="relative h-screen sm:h-[80vh] w-full">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        effect="fade"
        className="absolute inset-0 h-full w-full"
      >
        <SwiperSlide>
          <img
            src="/assets/images/hero.webp"
            alt="Shiny car 1"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/assets/images/hero2.jpg"
            alt="Shiny car 2"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/assets/images/hero3.jpg"
            alt="Shiny car 3"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-70 z-10 px-5">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Shine Bright with AutoShine!
        </h1>
        <p className="text-lg sm:text-2xl mb-6">
          Premium car wash and detailing services to keep your car looking as
          good as new.
        </p>
        <div className="my-6 flex justify-center md:justify-start space-x-4">
          <NavLink to="/services" className="btn-primary">
            Explore Services
          </NavLink>
          <NavLink to="/about" className="btn-outline-neutral">
            Learn More
          </NavLink>
        </div>

        {/* scroll sign */}
        <div className={`${styles.scroll}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="60"
            viewBox="0 0 24 60"
            fill="none"
          >
            <path
              opacity="0.8"
              d="M12 24L1.6077 6L22.3923 6L12 24Z"
              fill="white"
            />
            <path
              className={`${styles.hidden1}`}
              opacity="0.3"
              d="M12 36L1.6077 18L22.3923 18L12 36Z"
              fill="white"
            />
            <path
              className={`${styles.hidden2}`}
              opacity="0.08"
              d="M12 48L1.6077 30L22.3923 30L12 48Z"
              fill="white"
            />
            <path
              className={`${styles.hidden3}`}
              opacity="0.01"
              d="M12 60L1.6077 42L22.3923 42L12 60Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
