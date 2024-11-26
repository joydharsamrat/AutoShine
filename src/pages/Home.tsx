import FeaturedServices from "../components/Home/FeaturedServices";
import HeroSection from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import Newsletter from "../components/Home/Newsletter";
import ReviewSection from "../components/Home/Review";
import WhyChooseUs from "../components/Home/WhyUs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedServices />
      <WhyChooseUs />
      <HowItWorks />
      <ReviewSection />
      <Newsletter />
    </div>
  );
};

export default Home;
