import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import HomeSection from "../Components/HomeSection/HomeSection";
import BannerSection from "../Components/HomeSection/BannerSection";
import ProductSection from "../Components/HomeSection/ProductSection";
import NewsLetter from "../Components/Common/NewsLetter";
import Footer from "../Components/Common/Footer";
import Popupmodal from "../Components/Common/Popupmodal";
import TodayDeal from "../Components/Common/TodayDeal";
import Testimonials from "../Components/HomeSection/Testimonials";
import Testimonial from "../Components/Common/Testimonial";
import ShopByCategory from "../Components/FilterSection/ShopByCategory";

function Index() {


  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <HomeSection />
      <ShopByCategory/>
      <BannerSection/>
      
      <ProductSection/>
      <NewsLetter/>
  
      <Testimonial/>
      <Footer/>

      
     
    </div>
  );
}

export default Index;
