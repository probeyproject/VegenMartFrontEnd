import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/Api";
import AOS from "aos";

function OfferBanner() {
  const [coupon, setCoupon] = useState([]);
  const navigate = useNavigate();

  const getCouponBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/10`);
    const data = await response.data;
    setCoupon(data);
  };

  useEffect(() => {
    getCouponBanner();
    AOS.init({
      duration: 1000, // Duration of the animation in milliseconds
      easing: "ease-in-out", // Type of easing for the animation
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  const gotToProduct = async () => {
    navigate("/filter");
  };

  return (
    <>
      {coupon.map((data, index) => (
        <div key={index} className="py-3">
          <div
            className="banner-contain bg-size blur-up lazyloaded"
            data-aos="fade-left"
            style={{
              backgroundImage: `url(${data.banner_image})`,
              height: "150px",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              display: "block",
            }}
          >
            <img
              src={data.banner_image}
              className="bg-img blur-up lazyload"
              alt=""
              style={{ display: "none" }}
            />
            <div className="banner-details p-center p-3 text-white text-center">
              <div>
                <h3 className="lh-base fw-bold offer-text">
                  {data.banner_offer_title}
                </h3>
                <p>This Offer Is Valid For First Order</p>
                <h6 className="coupon-code">Use Code : {data.banner_title}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OfferBanner;
