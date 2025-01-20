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

function HeaderTop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [headerAds, setHeaderAds] = useState([]);
  const [supportChat, setSupportChat] = useState(false);
 

  const handleSupportChat = () => {
    setSupportChat(true);
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
              
              <li className="right-nav-list">
                <div className="dropdown theme-form-select">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="select-dollar"
                    data-bs-toggle="dropdown"
                  >
                    <span>INR</span>
                  </button>
                </div>
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
