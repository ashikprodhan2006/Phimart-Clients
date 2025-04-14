import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Category from "../components/Home/Categories/Category";
import DiscountSection from "../components/Home/Discount/DiscountSection";
import Features from "../components/Home/Features";
import Product from "../components/Products/product";

// import CarouselSlide from "../components/Carousel/CarouselSlide";

const Home = () => {
  return (
    <div>
        {/* <CarouselSlide /> */}
        <HeroCarousel />
        <Features />
        <Category />
        <Product />
        <DiscountSection />
        
    </div>
  );
};

export default Home;