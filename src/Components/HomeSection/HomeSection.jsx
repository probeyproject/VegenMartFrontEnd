import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../API/Api";

function HomeSection() {
  const [banner, setBanner] = useState([]);
  const [topSide, setTopSide] = useState([]);
  const [bottom, setBottom] = useState([]);
  const navigate = useNavigate();

  const getBanner = async () => {
    const response = await axios.get(
      `${baseUrl}/getBannerById/4`
    );
    const data = await response.data;
    setBanner(data);
  };

  const getRightSideTopBanner = async () => {
    const response = await axios.get(
      `${baseUrl}/getBannerById/5`
    );
    const data = await response.data;
    setTopSide(data);
  };

  const getRightSideBottomBanner = async () => {
    const response = await axios.get(
      `${baseUrl}/getBannerById/6`
    );
    const data = await response.data;
    setBottom(data);
  };

  useEffect(() => {
    getBanner();
    getRightSideTopBanner();
    getRightSideBottomBanner();
  }, []);
  
  const gotTOProduct = async () => {
    navigate('/filter');
  }

  return (
    <section className="home-section pt-2 " data-aos="fade">
      <div className="container-fluid-lg">
        <div className="row g-4">
          <div className="col-xl-8 ratio_65">
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
                      {/* Stay home &amp; delivered your{" "} */}
                      {data.banner_title}
                      <span className="daily">{data.banner_title_small}</span>
                    </h1>
                    <p className="w-75 d-none d-sm-block">{data.banner_desc}</p>
                    <button
                      onClick={gotTOProduct} 
                      className="btn btn-animation mt-xxl-4 mt-2 home-button mend-auto"
                    >
                      Shop Now <i className="fa-solid fa-right-long icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-xl-4 ratio_65">
            <div className="row g-4">
              {topSide.map((data, index) => (
                <div key={index} className="col-xl-12 col-md-6">
                  <div
                    className="home-contain bg-size blur-up lazyloaded"
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
                    <Link
                      to="/kumbhinfo"
                      className="btn btn-animation mt-xxl-4 mt-2 home-button mend-auto  p-1"
                      style={{
                        position: "fixed",
                        bottom: "47px",
                        right: "184px",
                        height:"35px"
                      }}
                    >
                      Need Info <i className="fa-solid fa-right-long p-2" />
                    </Link>
                  </div>
                </div>
              ))}

              {bottom.map((data, index) => (
                <div key={index} className="col-xl-12 col-md-6">
                  <div
                    className="home-contain bg-size blur-up lazyloaded"
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
                      alt="No Images"
                      style={{ display: "none" }}
                    />
                    <Link
                      to="/businessInfo"
                      className="btn-animation m-3 mt-xxl-4 mt-2 home-button mend-auto p-1"
                      style={{
                        position: "fixed",
                        bottom: "45px",
                        right: "154px",
                      }}
                    >
                      B2B Requirment <i className="fa-solid fa-right-long p-2" />
                    </Link>
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
