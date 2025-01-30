import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import "./HomeSection.css"; // Import a CSS file for custom styles
import Aos from "aos";

function HomeSection() {
  const [banner, setBanner] = useState([]);
  const [topSide, setTopSide] = useState([]);
  const [bottom, setBottom] = useState([]);
  const navigate = useNavigate();

  const getBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/4`);
    const data = await response.data;
    setBanner(data);
  };

  const getRightSideTopBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/5`);
    const data = await response.data;
    setTopSide(data);
  };

  const getRightSideBottomBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/6`);
    const data = await response.data;
    setBottom(data);
  };

  useEffect(() => {
    getBanner();
    getRightSideTopBanner();
    getRightSideBottomBanner();
    Aos.init({
      duration: 1000, 
      offset: 100, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);

  const gotTOProduct = async () => {
    navigate("/filter");
  };

  return (
    <section className="home-section pt-0" >
      <div className="container-fluid-lg">
        <div className="row ">
          {/* First Card (Left Side) */}
          <div className="col-xl-8 col-lg-6 col-md-6 col-6 ratio_65" data-aos="fade-right">
            {banner.map((data, index) => (
              <div key={index} className="home-contain h-100">
                <div
                  className="h-100 bg-size blur-up lazyloaded"
                  style={{
                    backgroundImage: `url(${data.banner_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    display: "block",
                  }}
                >
                  <img
                    src={data.banner_image}
                    className="bg-img blur-up lazyloaded"
                    alt=""
                    style={{ display: "none" }}
                  />
                </div>
                <div className="home-detail p-center-left w-75">
                  <div>
                    <h6>
                      {data.banner_offer_title}{" "}
                      <span>{data.banner_offer}% Off</span>
                    </h6>
                    <h1 className="text-uppercase">
                      {data.banner_title}
                      <span className="daily">{data.banner_title_small}</span>
                    </h1>
                    <p className="w-75 d-none d-sm-block">{data.banner_desc}</p>
                    <button
                      onClick={gotTOProduct}
                      className="btn btn-animation mt-xxl-4 mt-2 home-button mb-4 mend-auto"
                    >
                      Shop Now <i className="fa-solid fa-right-long icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second and Third Cards (Right Side) */}
          <div className="col-xl-4 col-lg-6 col-md-6 col-6 ratio_65" data-aos="fade-left">
            <div className="row g-2">
              {topSide.map((data, index) => (
                <div key={index} className="col-12 home-contain1">
                  <div
                    className="home-contain1 bg-size blur-up lazyloaded"
                    style={{
                      backgroundImage: `url(${data.banner_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      display: "block",
                      height: "200px", // Adjust height for mobile
                    }}
                  >
                    <img
                      src={data.banner_image}
                      className="bg-img blur-up lazyloaded"
                      alt=""
                      style={{ display: "none" }}
                    />
                    <div className="card-content text-center">
                      <h2 className="text-white">{data.heading}</h2>
                      <h3 className="text-white">{data.offer_heading}</h3>
                      <Link
                        to="/kumbhinfo"
                        className="btn btn-animation mt-2 home-button mend-auto p-1"
                      >
                        Need Info <i className="fa-solid fa-right-long p-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {bottom.map((data, index) => (
                <div key={index} className="col-12 home-contain1" data-aos="fade-left">
                  <div
                    className="home-contain1 bg-size blur-up lazyloaded"
                    style={{
                      backgroundImage: `url(${data.banner_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      display: "block",
                      height: "200px", // Adjust height for mobile
                    }}
                  >
                    <img
                      src={data.banner_image}
                      className="bg-img blur-up lazyloaded"
                      alt="No Images"
                      style={{ display: "none" }}
                    />
                    <div className="card-content text-center">
                      <h2 className="text-white">{data.heading}</h2>
                      <h3 className="text-white">{data.offer_heading}</h3>
                      <Link
                        to="/businessInfo"
                        className="btn-animation mt-2 home-button mend-auto p-1"
                      >
                        B2B Requirment{" "}
                        <i className="fa-solid fa-right-long p-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default HomeSection;
