import Aos from "aos";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/1.png";
import { FaFacebook, FaMeta } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FaPinterestP } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Footer = () => {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <footer style={{ backgroundColor: "#ebd7e0" }}>
      <div className="container-fluid-lg">
        {/* Service Section */}
        <div className="service-section">
          <div className="row g-3">
            <div className="col-12">
              <div className="service-contain">
                {[
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/product.svg",
                    text: "Ozoned Washed Vegies And Fruits",
                  },
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/delivery.svg",
                    text: "Get Extra Cashback on Prepaid Orders",
                  },
                  // {
                  //   imgSrc:
                  //     "https://themes.pixelstrap.com/fastkart/assets/svg/discount.svg",
                  //   text: "Get Discount On Prepaid Orders",
                  // },
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/market.svg",
                    text: "We Offer The Same Price, As Local Market. Guaranteed!",
                  },
                ].map((service, index) => (
                  <div className=" service-box" key={index}>
                    <div className="service-image">
                      <img
                        src={service.imgSrc}
                        style={{ height: "30px" }}
                        className="blur-up lazyloaded"
                        alt=""
                      />
                    </div>
                    <div className="service-detail">
                      <h5>{service.text}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="main-footer section-b-space section-t-space">
          <div className="row ">
            {/* Logo and Contact Section */}
            <div
              className="col-md-4 col-sm-6 d-none d-sm-block"
              data-aos="fade-right"
            >
              <div className="footer-logo">
                <div className="theme-logo">
                  <a href="/">
                    <img
                      src={logo}
                      style={{ height: "70px", width: "250px" }}
                      className="img-fluid blur-up lazyloaded"
                      alt="Web logo"
                    />
                  </a>
                </div>
                <p className="text-content">
                  Delivering Ozone-Washed vegetables and fruits for a healthier,
                  safer lifestyle. Freshness you can trust, convenience you’ll
                  love.
                </p>
                <div className="footer-logo-contain d-flex flex-column gap-1">
                  <div className="address">
                    <div className="text-start d-flex flex-column gap-1">
                      <p className="">
                      <HiOutlineBuildingOffice2 className="fs-5 me-2"  />
                        155/25E Karela Bagh Prayagraj, Uttar Pradesh, India
                      </p>
                      <p className="">
                        <MdOutlineMailOutline className="fs-5 me-2" />
                        <a
                          href="info@vegenmart.com"
                          target="_blank"
                          className="text-muted"
                        >
                          info@vegenmart.com
                        </a>
                      </p>
                      <p className="">
                        <MdOutlinePhoneInTalk className="fs-5 me-2" />
                        +9191189 40094
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-column mt-4 gap-2">
                    <h6 className="text-content">
                      ©2024 Vegenmart All Rights Reserved.
                    </h6>

                    <p className="text-content">
                      "Vegenmart is owned by Vegenmart Tech India Private
                      Limited."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 mt-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="row">
                    {/* Categories Section */}
                    <div className="col-md-6 col-6" data-aos="fade-up">
                      <div className="footer-title">
                        <h4>Categories</h4>
                      </div>
                      <div className="footer-contain">
                        <ul>
                          {[
                            {
                              name: "Exotic Vegetables",
                              link: "/filters/Exotic",
                            },
                            {
                              name: "Leafy Vegetables",
                              link: "/filters/Vegetable",
                            },
                            {
                              name: "Regular Vegetables",
                              link: "/filters/Regular",
                            },
                            {
                              name: "Citrus Fruits",
                              link: "/filters/Citrus Fruits",
                            },
                            { name: "Mushroom", link: "/filters/mushroom" },
                            {
                              name: "Yellow Fruit",
                              link: "/filters/Yellow",
                            },
                            {
                              name: "Green Fruit",
                              link: "/filters/Fruit",
                            },
                            {
                              name: "Tropical Fruit",
                              link: "/filters/Tropical",
                            },
                          ].map((category, index) => (
                            <li key={index}>
                              <a href={category.link} className="text-content">
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Useful Links Section */}
                    <div className="col-md-6 col-6" data-aos="fade-up">
                      <div className="footer-title">
                        <h4>Useful Links</h4>
                      </div>
                      <div className="footer-contain">
                        <ul>
                          {[
                            { name: "Home", link: "/" },
                            { name: "Shop", link: "/pannelpage/Mushroom" },
                            { name: "About Us", link: "/about" },
                            { name: "Blog", link: "/blogsection" },
                            { name: "Contact Us", link: "/contact" },
                          ].map((link, index) => (
                            <li key={index}>
                              <Link to={link.link} className="text-content">
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row ">
                    {/* Help Center Section */}
                    <div className="col-md-6 col-6" data-aos="fade-up">
                      <div className="footer-title">
                        <h4>Help Center</h4>
                      </div>
                      <div className="footer-contain">
                        <ul>
                          {[
                            { name: "Your Order", link: "/myaccount" },
                            { name: "Your Account", link: "/myaccount" },
                            { name: "Track Order", link: "/myaccount" },
                            { name: "Your Wishlist", link: "/mywhishlist" },
                            { name: "FAQ", link: "/faq" },
                          ].map((helpLink, index) => (
                            <li key={index}>
                              <Link to={helpLink.link} className="text-content">
                                {helpLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact Us Section */}
                    <div className="col-md-6 col-6" data-aos="fade-left">
                      <div className="footer-title">
                        <h4>Terms & Conditions</h4>
                      </div>
                      <div className="footer-contain">
                        <ul>
                          {[
                            { name: "Privacy Policy", link: "/privacypolicy" },
                            {
                              name: "Shipping Policy",
                              link: "/shippingpolicy",
                            },
                            {
                              name: "Data Encryption Policy",
                              link: "/dataencryptionpolicy",
                            },
                            {
                              name: "Business Terms & Conditions",
                              link: "/businesstermsconditions",
                            },
                            {
                              name: "Refund And Rewards Policy",
                              link: "/refundAndrewardspolicy",
                            },
                            {
                              name: "Loyalty Rewards Policy",
                              link: "/loyaltyrewardspolicy",
                            },
                          ].map((helpLink, index) => (
                            <li key={index}>
                              <Link to={helpLink.link} className="text-content">
                                {helpLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Logo and Contact Section */}
            <div
              className="col-md-4 col-sm-6 d-block d-lg-none"
              data-aos="fade-right"
            >
              <hr />

              <div className="footer-logo">
                <div className="social-link mt-3">
                  <ul className="list-unstyled d-flex justify-content-center">
                    <li
                      className="bg-light rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <a
                        href="https://www.facebook.com/profile.php?id=61568143989452"
                        target="_blank"
                      >
                        <SlSocialFacebook />
                      </a>
                    </li>

                    <li
                      className="bg-light rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <a href="https://x.com/VegenMart" target="_blank">
                        <FaXTwitter />
                      </a>
                    </li>
                    <li
                      className="bg-light rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <a
                        href="https://www.instagram.com/vegenmart"
                        target="_blank"
                      >
                        <FaInstagram />
                      </a>
                    </li>
                    <li
                      className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                      style={{ height: "40px", width: "40px" }}
                    >
                      <a
                        href="https://in.pinterest.com/vegenmart/"
                        target="_blank"
                      >
                        <FaPinterestP />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="theme-logo d-flex justify-content-center">
                  <a href="/">
                    <img
                      src={logo}
                      className="img-fluid blur-up lazyloaded"
                      style={{ height: "100px", width: "300px" }}
                      alt="Web logo"
                    />
                  </a>
                </div>
                <p className="text-center text-content mb-5">
                  Delivering Ozone-Washed vegetables and fruits for a healthier,
                  safer lifestyle. Freshness you can trust, <br /> convenience
                  you’ll love.
                </p>
                <div className="footer-logo-contain">
                  <div className=" ">
                    <div className="d-flex flex-column justify-content-center">
                      <p className="text-center">
                      <HiOutlineBuildingOffice2 className="fs-5 me-2"  />
                        155/25E Karela Bagh Prayagraj, Uttar Pradesh, India
                      </p>
                      <p className="text-center">
                        <MdOutlineMailOutline className="fs-5 me-2" />

                        <a
                          href="info@vegenmart.com"
                          target="_blank"
                          className="text-muted"
                        >
                          info@vegenmart.com
                        </a>
                      </p>
                      <p className="text-center">
                        <MdOutlinePhoneInTalk className="fs-5 me-2" />
                        +9191189 40094
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-5">
                    <h6 className="text-content text-center mt-3">
                      ©2024 Vegenmart All Rights Reserved.
                    </h6>
                    <h5 className="text-content text-center mt-1 ">
                      "Vegenmart is owned by Vegenmart Tech India Private
                      Limited."
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="sub-footer section-small-space">
          <div className="payment">
            <img
              src="https://themes.pixelstrap.com/fastkart/assets/images/payment/1.png"
              className="blur-up lazyloaded"
              alt=""
            />
          </div>

          <div className="social-link mt-3 d-none d-sm-block">
            <ul className="list-unstyled d-flex justify-content-evenly">
              <li
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ height: "35px", width: "35px" }}
              >
                <a href="https://x.com/VegenMart" target="_blank">
                  <FaXTwitter />
                </a>
              </li>
              <li
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ height: "35px", width: "35px" }}
              >
                <a href="https://www.instagram.com/vegenmart" target="_blank">
                  <FaInstagram />
                </a>
              </li>
              <li
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ height: "35px", width: "35px" }}
              >
                <a href="https://www.facebook.com/vegenmart" target="_blank">
                  <SlSocialFacebook />
                </a>
              </li>
              <li
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ height: "35px", width: "35px" }}
              >
                <a href="https://in.pinterest.com/vegenmart/" target="_blank">
                  <FaPinterestP />
                </a>
              </li>
            </ul>
          </div>

          <h6 className="text-content mt-2">
            Developed and Managed by{" "}
            <a href="https://www.probeyservices.com/" target="_blank">
              Probey Services
            </a>
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
