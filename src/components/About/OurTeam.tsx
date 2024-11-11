import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import style from "../../styles/about.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const teamMembers = [
  {
    name: "Nathan Reynolds",
    position: "CEO",
    image: "/assets/images/team/p1.jpg",
    details:
      "Nathan has over 15 years of experience in the automotive industry and has successfully led several major projects, increasing the company's market share significantly.",
  },
  {
    name: "Sophie Thompson",
    position: "Finance Manager",
    image: "/assets/images/team/p2.jpg",
    details:
      "Sophie is a certified accountant with a strong background in financial planning and analysis. She ensures the financial health of the company.",
  },
  {
    name: "Oliver Martinez",
    position: "Sales Manager",
    image: "/assets/images/team/p3.jpg",
    details:
      "With a proven track record in sales, Oliver leads the sales team to meet and exceed sales targets, building strong relationships with clients.",
  },
  {
    name: "Michael Johnson",
    position: "Sales Representative",
    image: "/assets/images/team/p4.jpg",
    details:
      "Michael is passionate about customer service and excels in understanding client needs, ensuring they have the best experience possible.",
  },
  {
    name: "Leah Wilson",
    position: "Marketing Manager",
    image: "/assets/images/team/p5.jpg",
    details:
      "Leah is responsible for developing marketing strategies that effectively promote the company's services and enhance brand awareness.",
  },
  {
    name: "Lily Davis",
    position: "Customer Service Representative",
    image: "/assets/images/team/p6.jpg",
    details:
      "Lily is dedicated to helping customers resolve their issues efficiently and is committed to providing exceptional service at all times.",
  },
  {
    name: "Jack Thompson",
    position: "Mechanic",
    image: "/assets/images/team/p7.jpg",
    details:
      "Jack has over 10 years of experience in automotive repair and is known for his attention to detail and problem-solving skills.",
  },
  {
    name: "Max Johnson",
    position: "Lot Attendant",
    image: "/assets/images/team/p8.jpg",
    details:
      "Max ensures the lot is organized and well-maintained, assisting customers with their vehicles and providing a friendly face to the team.",
  },
];

const OurTeam = () => {
  return (
    <section className={style.ourTeam}>
      <div>
        <div className="text-3xl font-semibold text-primary-700 mb-6">
          <h2>Our Team</h2>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            520: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            770: {
              slidesPerView: 4,
              spaceBetween: 20,
            },

            1020: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          loop={true}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index} className={`${style.swipeSlide}`}>
              <div className={style.memberContainer}>
                <div className={style.memberImageContainer}>
                  <img src={member.image} alt={member.name} />
                  <div className={style.memberLinks}>
                    <a href="/">
                      <FaFacebook />
                    </a>
                    <a href="/">
                      <FaTwitter />
                    </a>
                    <a href="/">
                      <FaInstagram />
                    </a>
                    <a href="/">
                      <FaYoutube />
                    </a>
                  </div>
                </div>
                <div className={style.memberDetailsContainer}>
                  <h3 className={style.memberName}>{member.name}</h3>
                  <p className={style.memberPosition}>{member.position}</p>
                  <p className={style.memberDetails}>{member.details}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurTeam;
