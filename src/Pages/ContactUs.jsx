import React, { useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import axios from "axios";
import { baseUrl } from "../API/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone Number must be exactly 10 digits.";
    }
    return newErrors;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (value.length <= 10) {
      setPhone(value); // Update state only if the length is <= 10
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post(`${baseUrl}/contact`, {
        firstName,
        lastName,
        email,
        phone,
        message,
      });
      toast.success("Your record has been added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating contact:", error);
      toast.error("Error creating contact. Please try again.");
    }
  };

  return (
    <div className="container-fluid px-0 overflow-hidden">
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

      {/* Form Section */}
      <section className="contact-box-section">
        <div className="container-fluid-lg">
          <div className="row g-lg-5 g-3">
            <div className="col-lg-6 mb-5">
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
                              <p>+9191189 40094</p>
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
                              <p>
                                155/25E Karela Bagh Prayagraj, Uttar Pradesh,
                                India
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="right-sidebar-box mb-2">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xxl-6 col-lg-12 col-sm-6">
                      <div className="mb-md-4 mb-3 custom-form">
                        <label className="form-label">
                          First Name<span className="text-danger">*</span>
                        </label>
                        <div className="custom-input">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <i className="fa-solid fa-user" />
                        </div>
                        {errors.firstName && (
                          <p className="text-danger">{errors.firstName}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-lg-12 col-sm-6">
                      <div className="mb-md-4 mb-3 custom-form">
                        <label className="form-label">
                          Last Name<span className="text-danger">*</span>
                        </label>
                        <div className="custom-input">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <i className="fa-solid fa-user" />
                        </div>
                        {errors.lastName && (
                          <p className="text-danger">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-lg-12 col-sm-6">
                      <div className="mb-md-4 mb-3 custom-form">
                        <label className="form-label">
                          Email Address<span className="text-danger">*</span>
                        </label>
                        <div className="custom-input">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <i className="fa-solid fa-envelope" />
                        </div>
                        {errors.email && (
                          <p className="text-danger">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-xxl-6 col-lg-12 col-sm-6">
                      <div className="mb-md-4 mb-3 custom-form">
                        <label className="form-label">
                          Phone Number<span className="text-danger">*</span>
                        </label>
                        <div className="custom-input">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Phone Number"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={10}
                          />
                          <i className="fa-solid fa-mobile-screen-button" />
                        </div>
                        {errors.phone && (
                          <p className="text-danger">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-md-4 mb-3 custom-form">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          placeholder="Enter Your Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn btn-animation btn-md fw-bold ms-auto"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
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
