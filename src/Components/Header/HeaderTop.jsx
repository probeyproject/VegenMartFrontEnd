import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaXTwitter } from "react-icons/fa6"; // Existing Twitter icon
import {   FaPinterest,FaInstagram } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";

import {
  Dropdown,
  DropdownToggle,
 
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import { MdOutlineSupportAgent } from "react-icons/md";
import SupportChatModal from "../Common/SupportChatModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderTop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerAds, setHeaderAds] = useState([]);
  const [supportChat, setSupportChat] = useState(false);
  const authenticated = useSelector((state) => state.user.authenticated);


  const handleSupportChat = () => {
    setSupportChat(true);
  };

  const handleLogout = async () => {
    try {
      // Make the API call using axios
      const response = await axios.get(`${baseUrl}/logout`, {
        withCredentials: true, // To include cookies in the request
      });

      if (response.status === 200) {
        // If successful, you can perform additional tasks (e.g., redirect, state reset)
        console.log("Logged out successfully");
        window.location.reload();
        // Reload the current page
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      // Handle errors appropriately
      console.error("Error during logout:", error);
    }
  };



  const fetchHeadersAds = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getAllHeaderAds`
      );
      setHeaderAds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHeadersAds();
  }, []);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,  
  };

  return (
    <div className="header-top">
      <div className="container-fluid-lg">
        <div className="row d-flex justify-content-between">
        

          <div className="col-xxl-6 col-lg-9 d-lg-block d-none">
            <div className="header-offer d-flex justify-content-between">
            <div className="timer-notification d-flex">
                <div className="mx-2">
                  <a
                    href="https://x.com/VegenMart"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter style={{ fontSize: "20px", color: "white" }} />
                  </a>
                </div>
                <div className="mx-2">
                  <a
                    href="https://in.pinterest.com/vegenmart/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPinterest style={{ fontSize: "20px", color: "white" }} />
                  </a>
                </div>
                <div className="mx-2">
                  <a
                    href="https://www.instagram.com/vegenmart"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram style={{ fontSize: "20px", color: "white" }} />
                  </a>
                </div>
                <div className="mx-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61568143989452"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LuFacebook style={{ fontSize: "20px", color: "white" }} />
                  </a>
                </div>
                <div className="mx-2">
                  <a
                    onClick={handleSupportChat}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdOutlineSupportAgent  style={{ fontSize: "22px", color: "white", cursor : 'pointer' }} />
                  </a>
                </div>
              </div>

              <div>
                <Slider {...settings}>
                  {headerAds?.map((ads, index) => (
                    <div key={index} className="timer-notification">
                      <h6 className="text-center">{ads.ad_description}</h6>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <ul className="about-list right-nav-about">
              
              <li className="right-side onhover-dropdown">
                      <div className="delivery-login-box">
                        {authenticated && (
                          <div className="delivery-icon">
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
                              className="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx={12} cy={7} r={4} />
                            </svg>
                          </div>
                        )}
                      </div>

                      {!authenticated && (
                        <li className="product-box-contain">
                          <i />
                          <Link to ="/login" className="text-light">Login</Link>
                        </li>
                      )}
                      {authenticated && (
                        <div className="onhover-div onhover-div-login">
                          <ul className="user-box-name">
                            <li className="product-box-contain">
                              <Link to={`/myaccount`}>My Dashboard</Link>
                            </li>
                           
                            <li className="product-box-contain">
                              <i />
                              <Link onClick={handleLogout}>Logout</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
            </ul>
          </div>
        </div>
      </div>
      <SupportChatModal
        isOpen={supportChat}
        toggle={() => setSupportChat(false)}
      />
    </div>
  );
}

export default HeaderTop;
