import FeaturedServices from "../components/Home/FeaturedServices";
import HeroSection from "../components/Home/Hero";
import ReviewSection from "../components/Home/Review";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedServices />
      <ReviewSection />
    </div>
  );
};

export default Home;
