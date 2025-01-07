import Aos from "aos";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/1.png";

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
    <footer className="section-t-space" style={{ backgroundColor: "#ebd7e0" }}>
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
                    text: "Every Fresh Products",
                  },
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/delivery.svg",
                    text: "Free Delivery For Order Over ₹499",
                  },
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/discount.svg",
                    text: "Daily Mega Discounts",
                  },
                  {
                    imgSrc:
                      "https://themes.pixelstrap.com/fastkart/assets/svg/market.svg",
                    text: "Best Price On The Market",
                  },
                ].map((service, index) => (
                  <div className="service-box" key={index}>
                    <div className="service-image">
                      <img
                        src={service.imgSrc}
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
          <div className="row g-md-4 g-3">
            {/* Logo and Contact Section */}
            <div className="col-xl-3 col-lg-4 col-sm-6" data-aos="fade-right">
              <div className="footer-logo">
                <div className="theme-logo">
                  <a href="/">
                    <img
                      src={logo}
                      className="img-fluid blur-up lazyloaded"
                      alt="Web logo"
                    />
                  </a>
                </div>
                <div className="footer-logo-contain">
                  <p>
                  Delivering ozone-washed vegetables and fruits for a healthier, safer lifestyle. Freshness you can trust, convenience you’ll love.
                  </p>
                  <ul className="address">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <a href="#">1418 Riverwood Drive, CA 96052, US</a>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-mail"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <a href="#">support@vegenmart.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6"
              data-aos="fade-up"
            >
              <div className="footer-title">
                <h4>Categories</h4>
              </div>
              <div className="footer-contain">
                <ul>
                  {[
                    { name: "Vegetables & Fruit", link: "/filters/Vegetables" },
                    { name: "Beverages", link: "/filters/Beverages" },
                    { name: "Meats & Seafood", link: "/filters/Meat" },
                    {name:"Frozen Foods", link:"/filters/Food"},
                  {name:"Biscuits & Snacks", link:"/filters/Biscuits"},
                    {name:"Grocery & Staples",link:"/filters/Grocery"},
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
            <div className="col-xl-2 col-lg-2 col-sm-6" data-aos="fade-up">
              <div className="footer-title">
                <h4>Useful Links</h4>
              </div>
              <div className="footer-contain">
                <ul>
                  {[
                    { name: 'Home', link: '#' },
                    { name: 'Shop', link: '#' },
                    { name: 'About Us', link: '/about' },
                    { name: 'Blog', link: '#' },
                    { name: 'Contact Us', link: '/contact' },
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

            {/* Help Center Section */}
            <div className="col-xl-2 col-sm-6" data-aos="fade-up">
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
            <div className="col-xl-3 col-lg-4 col-sm-6" data-aos="fade-left">
              <div className="footer-title">
                <h4>Contact Us</h4>
              </div>
              <div className="footer-contact">
                <ul>
                  <li>
                    <div className="footer-number">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-phone"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <div className="contact-number">
                        <h6 className="text-content">Hotline 24/7 :</h6>
                        <h5>+91 888 104 2340</h5>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="footer-number">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-mail"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <div className="contact-number">
                        <h6 className="text-content">Email Address :</h6>
                        <h5>
                          <a href="mailto:vegenmart@gmail.com">
                            vegenmart@gmail.com
                          </a>
                        </h5>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="sub-footer section-small-space">
          <div className="reserve">
            <h6 className="text-content">
              ©2024 vegenmart All rights reserved
            </h6>
          </div>
          <div className="reserve">
            <h6 className="text-content">
              Developed by{" "}
              <a href="https://www.probeyservices.com/" target="_blank">
                Probey Services
                </a>
            </h6>
          </div>
          <div className="payment">
            <img
              src="https://themes.pixelstrap.com/fastkart/assets/images/payment/1.png"
              className="blur-up lazyloaded"
              alt=""
            />
          </div>
          <div className="social-link">
            <h6 className="text-content">Stay connected :</h6>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61568143989452"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li className="me-3">
                <a href="https://x.com/VegenMart" target="_blank">
                  <i className="fa-brands fa-twitter" />
                </a>
              </li>
              <li className="me-3">
                <a href="https://www.instagram.com/vegenmart" target="_blank">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://in.pinterest.com/vegenmart/" target="_blank">
                  <i className="fa-brands fa-pinterest-p" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

