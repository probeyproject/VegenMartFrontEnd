
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../API/Api";
import './BannerSection.css'

const BannerSection = () => {
  const [product, setProducts] = useState([]);

  async function fetchAllProduct() {
    const response = await axios.get(`${baseUrl}/product-banner`);
    const data = await response.data;
    console.log(data);
    
    setProducts(data);
  }

  useEffect(() => {
    fetchAllProduct();
    AOS.init({
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets and small desktop screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Mobile screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="banner-section d-none d-lg-block ratio_60 wow" data-aos="fade-left">
      <div className="container-fluid-lg">
        <Slider {...settings}>
          {product.map((data, index) => (
            <div key={index}>
              
              <Link to={`/detail_page/${data.product_id}`}>
                <div
                  className="banner-contain hover-effect bg-size blur-up img-fluid lazyloaded"
                  style={{
                    background: `url(${JSON.parse(data.product_image)[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    // overflow: "hidden",
                    height: "140px",
                    width: "90%",
                  }}
                >
                  
                  <div className="banner-details">
                    <div className="banner-box">
                  
                      <h6 style={{fontSize : '10px'}}>{data.product_name}</h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerSection;