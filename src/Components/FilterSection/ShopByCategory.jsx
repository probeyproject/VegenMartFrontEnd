import Aos from "aos";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import axios from "axios";
import { baseUrl } from "../../API/Api";

const ShopByCategory = () => {
  const [banner, setBanner] = useState([]);
 
  async function fetchAllCategory() {
    try {
      const response = await axios.get(`${baseUrl}/getAllCarouselBanner`);
      const data = await response.data;
      setBanner(data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }



  useEffect(() => {
    fetchAllCategory();
    Aos.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="container-fluid-lg mt-4 d-none d-lg-block" data-aos="zoom-in"> {/* Added mt-4 for margin-top */}
      <div className="row">
      
        <div className="col-12">
          <Slider {...settings} className="shop-box no-space">
            {banner.map((data, index) => (
              <div key={index} className="product-wrapper">
                <div
                  className="banner-contain-2 hover-effect"
                  style={{
                    backgroundImage: `url(${data.banner_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: "250px", // Reduced height from 300px to 250px
                    width: "100%", // Full width
                  }}
                >  
                
                  <div className="banner-detail mt-4  position-relative shop-banner">
                    <div className="text-white">
                      <h2>{data.heading}</h2>
                      <h3>{data.offer_heading}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;