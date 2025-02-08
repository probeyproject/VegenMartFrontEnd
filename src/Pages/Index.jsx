import React, { useEffect } from "react";
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
import MobileViewCards from "../Components/ProductSection/MobileViewCards";
import { checkAuthentication } from "../slices/userSlice";
import { useDispatch } from "react-redux";


function Index() {

  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(checkAuthentication())
        .unwrap()
        .then(() => {
          console.log('User is authenticated');
        })
        .catch((error) => {
          console.error('Error on app initialization:', error);
        });
    }, []);

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <HomeSection />
      <ShopByCategory/>
      <BannerSection/>
      <MobileViewCards/>
      <ProductSection/>
      <NewsLetter/>
  
      <Testimonial/>
      <Footer/>

      
     
    </div>
  );
}

export default Index;
