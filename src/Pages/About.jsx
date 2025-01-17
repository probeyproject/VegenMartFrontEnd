import React, { useState } from "react";
import "./About.css";
import Footer from "../Components/Common/Footer";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Teams from "../Components/Common/Teams";
import Testimonial from "../Components/Common/Testimonial";
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="container-fluid px-0 overflow-hidden ">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <section className="breadcrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-contain">
                <h2>About Us</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active">About Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* main sectin  */}

      <section className="fresh-vegetable-section section-lg-space">
        <div className="container-fluid-lg">
          <div className="row gx-xl-5 gy-xl-0 g-3 ratio_148_1">
            <div className="col-xl-6 col-12">
              <div className="row g-sm-4 g-2">
                <div className="col-6">
                  <div className="fresh-image-2">
                    <div
                      className="bg-size blur-up lazyloaded"
                      style={{
                        backgroundImage:
                          'url("https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/2.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                      }}
                    >
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/2.jpg"
                        className="bg-img blur-up lazyloaded"
                        alt=""
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="fresh-image">
                    <div
                      className="bg-size blur-up lazyloaded"
                      style={{
                        backgroundImage:
                          'url("https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/1.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                      }}
                    >
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/1.jpg"
                        className="bg-img blur-up lazyloaded"
                        alt=""
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-12">
              <div className="fresh-contain p-center-left">
                <div>
                  <div className="review-title">
                    <h4>About Us</h4>
                    <h2>We make Organic Food In Market</h2>
                  </div>

                  {/* Tabs */}
                  <ul
                    className="nav nav-tabs justify-content-start mb-4"
                    role="tablist"
                  >
                    <li className="nav-item ">
                      <button
                        className={`nav-link ${activeTab === "mission" ? "active" : ""} `}
                        onClick={() => setActiveTab("mission")}
                      >
                        Mission
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "vision" ? "active" : ""}`}
                        onClick={() => setActiveTab("vision")}
                      >
                        Vision
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "origin" ? "active" : ""}`}
                        onClick={() => setActiveTab("origin")}
                      >
                        Origin
                      </button>
                    </li>
                  </ul>

                  {/* Tab Content */}
                  <div className="tab-content">
                    {activeTab === "mission" && (
                      <div className="tab-pane fade show active p-3">
                        <h2>Mission</h2>
                        <p>
                          To deliver fresh, ozone-washed, and chemical-free
                          vegetables and fruits directly to every home, ensuring
                          health, safety, and convenience. We aim to empower
                          individuals to make healthier choices while fostering
                          a sustainable and nutritious lifestyle for communities
                          everywhere.
                        </p>
                      </div>
                    )}
                    {activeTab === "vision" && (
                      <div className="tab-pane fade show active p-3">
                        <h2>Vision</h2>
                        <p>
                          To be the most trusted and innovative platform for
                          delivering fresh, chemical-free produce, setting a
                          benchmark for quality and convenience while inspiring
                          healthier and more sustainable living globally.
                        </p>
                      </div>
                    )}
                    {activeTab === "origin" && (
                      <div className="tab-pane fade show active p-3">
                        <h2>Origin</h2>
                        <p className="text-content">
                          Vegenmart was founded by Amit and Vaibhav, two friends
                          united by their concern for the quality of produce
                          available in the market. Both coming from corporate
                          backgrounds, they recognized the need for a healthier
                          alternative to pesticide-laden vegetables and fruits.
                        </p>
                        <p className="text-content">
                          Vegenmart is driven by their passion for wellness and
                          sustainability, they created Vegenmart—a platform
                          committed to providing fresh, ozone-washed produce
                          that is free from harmful chemicals, ensuring safety
                          and nutrition for every household.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* <div className="delivery-list">
                    <p className="text-content">
                      Just a few seconds to measure your body temperature. Up to
                      5 users! The battery lasts up to 2 years. There are many
                      variations of passages of Lorem Ipsum available.We started
                      in 2019 and haven't stopped smashing it since. A global
                      brand that doesn't sleep, we are 24/7 and always bringing
                      something new with over 100 new products dropping on the
                      monthly, bringing you the latest looks for less.
                    </p>
                    <ul className="delivery-box">
                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/svg/3/delivery.svg"
                              className="blur-up lazyloaded"
                              alt=""
                            />
                          </div>
                          <div className="delivery-detail">
                            <h5 className="text">
                              Free delivery for all orders
                            </h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/svg/3/leaf.svg"
                              className="blur-up lazyloaded"
                              alt=""
                            />
                          </div>
                          <div className="delivery-detail">
                            <h5 className="text">Only fresh foods</h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/svg/3/delivery.svg"
                              className="blur-up lazyloaded"
                              alt=""
                            />
                          </div>
                          <div className="delivery-detail">
                            <h5 className="text">
                              Free delivery for all orders
                            </h5>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="delivery-box">
                          <div className="delivery-icon">
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/svg/3/leaf.svg"
                              className="blur-up lazyloaded"
                              alt=""
                            />
                          </div>
                          <div className="delivery-detail">
                            <h5 className="text">Only fresh foods</h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fresh-vegetable-section section-lg-space">
        <div className="container-fluid-lg">
          <div className="row gx-xl-5 gy-xl-0 g-3 ratio_148_1">

          <div className="col-xl-6 col-12">
            {/* About Us Section */}
            <div className="about-us">
              <p className="text-center">
                <strong className="display-6" style={{ fontWeight: "600" }}>
                  Health. Purity. Convenience.
                </strong>
              </p>
              <p className="text-content fs-6">
                Vegenmart is your trusted partner for fresh, ozone-washed, and
                chemical-free vegetables and fruits. Founded by two passionate
                individuals, Amit and Vaibhav, Vegenmart was born out of the
                shared vision to offer healthier and safer produce to families
                everywhere.
              </p>
              <p className="text-content fs-6">
                After experiencing the challenges of finding clean and
                nutritious vegetables in the market, Amit and Vaibhav left their
                corporate careers to create a solution that combines innovation,
                sustainability, and health. Using advanced ozone-washing
                technology, we ensure that every fruit and vegetable delivered
                to your doorstep is free from harmful pesticides and bacteria.
              </p>
              <p className="text-content fs-6">
                At Vegenmart, we believe in transforming grocery shopping into a
                seamless, personalized experience while making health and
                wellness accessible to all. Whether you’re looking for everyday
                essentials or curated combo packs, we are here to provide
                farm-fresh produce that supports your lifestyle.
              </p>
              <p className="text-content fs-6">
                Join us in embracing a future of cleaner, healthier living. One
                delivery at a time.
              </p>
            </div>

            </div>
            <div className="col-xl-6 col-12">
              <div className="row g-sm-4 g-2">
                <div className="col-6">
                  <div className="fresh-image-2">
                    <div
                      className="bg-size blur-up lazyloaded"
                      style={{
                        backgroundImage:
                          'url("https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/2.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                      }}
                    >
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/2.jpg"
                        className="bg-img blur-up lazyloaded"
                        alt=""
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="fresh-image">
                    <div
                      className="bg-size blur-up lazyloaded"
                      style={{
                        backgroundImage:
                          'url("https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/1.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        display: "block",
                      }}
                    >
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/about-us/1.jpg"
                        className="bg-img blur-up lazyloaded"
                        alt=""
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

     

      <section className="client-section section-lg-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="about-us-title text-center">
                <h4>What We Do</h4>
                <h2 className="center">We are Trusted by Clients</h2>
              </div>
              <div className="slider-3_1 product-wrapper slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      width: 1083,
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <div
                      className="slick-slide slick-current slick-active"
                      data-slick-index={0}
                      aria-hidden="false"
                      style={{ width: 361 }}
                      tabIndex={0}
                    >
                      <div className="clint-contain">
                        <div className="client-icon">
                          <img
                            src="https://themes.pixelstrap.com/fastkart/assets/svg/3/work.svg"
                            className="blur-up lazyloaded"
                            alt=""
                          />
                        </div>
                        <h2>10</h2>
                        <h4>Business Years</h4>
                        <p>
                        Vegenmart, founded by Amit and Vaibhav, has delivered fresh, ozone-washed, and chemical-free produce for 2 business years. Committed to quality and sustainability, it has become a trusted name, offering healthier alternatives to pesticide-laden fruits and vegetables while prioritizing customer well-being and convenience.
                        </p>
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-active"
                      data-slick-index={1}
                      aria-hidden="false"
                      style={{ width: 361 }}
                      tabIndex={0}
                    >
                      <div className="clint-contain">
                        <div className="client-icon">
                          <img
                            src="https://themes.pixelstrap.com/fastkart/assets/svg/3/buy.svg"
                            className="blur-up lazyloaded"
                            alt=""
                          />
                        </div>
                        <h2>80 K+</h2>
                        <h4>Products Sales</h4>
                        <p>
                        Vegenmart has sold thousands of products, providing fresh, ozone-washed, and chemical-free vegetables and fruits. Each product meets high-quality standards, ensuring safety and nutrition. Direct home delivery empowers customers to make healthier, sustainable choices effortlessly.
                        </p>
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-active"
                      data-slick-index={2}
                      aria-hidden="false"
                      style={{ width: 361 }}
                      tabIndex={0}
                    >
                      <div className="clint-contain">
                        <div className="client-icon">
                          <img
                            src="https://themes.pixelstrap.com/fastkart/assets/svg/3/user.svg"
                            className="blur-up lazyloaded"
                            alt=""
                          />
                        </div>
                        <h2>90%</h2>
                        <h4>Happy Customers</h4>
                        <p>
                        Vegenmart’s happy customers trust its chemical-free, ozone-washed produce for safety and nutrition. The company’s focus on healthier lifestyles and sustainability has inspired communities, earning loyalty and making it a preferred choice for fresh, high-quality produce.


                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Teams />
      <Testimonial />

      <Footer />
    </div>
  );
}

export default About;
