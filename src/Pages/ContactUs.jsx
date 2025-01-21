import React, { useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import axios from "axios";
import { baseUrl } from "../API/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function ContactUs() {
  const [firstName, setFirstNamae] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/contact`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
      });

      toast.success("Your record add successfully");
      navigate("/")
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error("Error creating contact. Please try again.");
    }
  };

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
                <h2>Contact Us</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Contact Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* foam section  */}

      <section className="contact-box-section">
        <div className="container-fluid-lg">
          <div className="row g-lg-5 g-3">
            <div className="col-lg-6">
              <div className="left-sidebar-box">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="contact-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/contact-us.png"
                        className="img-fluid blur-up lazyloaded"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="contact-title">
                      <h3>Get In Touch</h3>
                    </div>
                    <div className="contact-detail">
                      <div className="row g-4">
                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-phone" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Phone</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>+9118 940094</p>
                              
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-envelope" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Email</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>info@vegenmart.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-location-dot" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Prayagraj Office</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>155/25E Karela Bagh Prayagraj, Uttar Pradesh, India</p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="title d-xxl-none d-block">
                <h2>Contact Us</h2>
              </div>
              <div className="right-sidebar-box mb-2">
                <div className="row">
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlInput"
                        className="form-label"
                      >
                        First Name<span className="text-danger">*</span>
                      </label>
                      <div className="custom-input">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput"
                          placeholder="Enter First Name"
                          onChange={(e) => setFirstNamae(e.target.value)}
                        />
                        <i className="fa-solid fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Last Name<span className="text-danger">*</span>
                      </label>
                      <div className="custom-input">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Last Name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <i className="fa-solid fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="form-label"
                      >
                        Email Address<span className="text-danger">*</span>
                      </label>
                      <div className="custom-input">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="Enter Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="fa-solid fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="form-label"
                      >
                        Phone Number<span className="text-danger">*</span>
                      </label>
                      <div className="custom-input">
                        <input
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput3"
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter Your Phone Number"
                          maxLength={10}
                        />
                        <i className="fa-solid fa-mobile-screen-button" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label
                        htmlFor="exampleFormControlTextarea"
                        className="form-label"
                      >
                        Message<span className="text-danger">*</span>
                      </label>
                      <div className="custom-textarea">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea"
                          placeholder="Enter Your Message"
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          defaultValue={""}
                        />
                        <i className="fa-solid fa-message" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-animation btn-md fw-bold ms-auto" onClick={handleSubmit}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ContactUs;
