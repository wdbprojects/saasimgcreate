import FeaturedProducts from "@/modules/components/home/featured-products";
import HeroSection from "@/modules/components/home/hero";
import { productsData } from "@/lib/data";

const HomePage = () => {
  return (
    <div className="py-4">
      <HeroSection />
      <FeaturedProducts products={productsData} />
    </div>
  );
};

export default HomePage;
