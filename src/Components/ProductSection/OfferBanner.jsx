import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/Api";


function OfferBanner() {

  const [coupon, setCoupon] = useState([]);
  const navigate = useNavigate();


  const getCouponBanner = async () => {
    const response = await axios.get(
      `${baseUrl}/getBannerById/10`
    );
    const data = await response.data;
    setCoupon(data);
  };

  useEffect(() => {
    getCouponBanner();
  }, []);

  const gotToProduct = async () => {
    navigate('/filter')
  }

  return (
    <>
      {coupon.map((data, index) => (
        <div key={index} className="section-t-space">
          <div
            className="banner-contain bg-size blur-up lazyloaded"
            style={{
              backgroundImage:
                `url(${data.banner_image})`,
                height:"120px",
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
