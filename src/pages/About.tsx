import { motion } from "framer-motion";
import "animate.css";
import OurTeam from "../components/About/OurTeam";

const values = [
  {
    title: "Quality Service",
    text: "We pride ourselves on delivering unmatched quality to every vehicle we service.",
    delay: 0.3,
  },
  {
    title: "Eco-Friendly",
    text: "Our processes are environmentally conscious, conserving water and using biodegradable products.",
    delay: 0.5,
  },
  {
    title: "Customer Satisfaction",
    text: "Our priority is ensuring every customer leaves with a smile and a sparkling car.",
    delay: 0.7,
  },
];

const About = () => {
  return (
    <div className=" pt-16 x-5">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center mb-12 animate__animated animate__fadeIn px-5"
      >
        <h1 className="text-4xl font-bold text-primary-700 mb-4">
          About AutoShine Car Wash
        </h1>
        <p className="text-lg text-gray-600">
          Your trusted car wash service delivering excellence and shine to your
          ride.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 animate__animated animate__fadeInLeft max-w-7xl mx-auto px-5"
      >
        <h2 className="text-3xl font-semibold text-primary-700 mb-6">
          Our Story
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Founded with the mission of providing a reliable, eco-friendly car
          wash experience, AutoShine has grown from a small neighborhood
          operation to a trusted name in the industry. We believe in a quality
          clean that doesn't just enhance your vehicle's look but also preserves
          its value over time.
        </p>
      </motion.div>

      <div
        className="py-24 bg-center bg-cover bg-no-repeat bg-fixed pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/images/hero2.jpg)",
        }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto px-5">
          {values.map(({ title, text, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay }}
              className="bg-neutral-100 p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp"
            >
              <h3 className="text-xl font-semibold text-primary-700 mb-2">
                {title}
              </h3>
              <p className="text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <OurTeam />
      </div>
    </div>
  );
};

export default About;
