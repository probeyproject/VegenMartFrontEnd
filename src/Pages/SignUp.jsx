import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { baseUrl } from "../API/Api";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "Buyer", // Default role
    termsAccepted: false,
    profilePic: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation logic
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      termsAccepted,
      profilePic,
    } = formData;

    if (!firstName.trim()) return "First Name is required.";
    if (!lastName.trim()) return "Last Name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      return "Invalid email format.";
    if (!phone.match(/^[6-9]\d{9}$/)) return "Invalid phone number.";
    if (password.length < 5)
      return "Password must be at least 5 characters long.";
    if (!termsAccepted) return "You must accept the terms and privacy policy.";
    if (!profilePic) return "Profile picture is required.";

    return null; // No errors
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
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
                <h2>Sign Up</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Sign Up</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-md-5 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/sign-up.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-7  mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Welcome To Fastkart</h3>
                  <h4>Create New Account</h4>
                </div>
                <div className="input-box">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating theme-form-floating">
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                          <label htmlFor="firstName">
                            First Name<span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating theme-form-floating">
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                          <label htmlFor="lastName">
                            Last Name<span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating theme-form-floating">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <label htmlFor="email">
                            Email Address<span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating theme-form-floating">
                          <input
                            type="number"
                            className="form-control"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <label htmlFor="phone">
                            Phone Number<span className="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label htmlFor="password">
                          Password<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating theme-form-floating">
                        <select
                          className="form-control"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="Buyer">Buyer</option>
                          <option value="Seller">Seller</option>
                        </select>
                        <label htmlFor="role">
                          Role<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    </div> 
                    <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="file"
                          className="form-control"
                          name="profilePic"
                          onChange={handleChange}
                        />
                        <label htmlFor="profilePic">
                          Profile Picture<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-check ps-0 m-0 remember-box">
                        <input
                          className="checkbox_animated check-box"
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsAccepted"
                        >
                          I agree with <span>Terms</span> and{" "}
                          <span>Privacy</span>
                        </label>
                      </div>
                    </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-animation w-100" type="submit">
                        {loading ? "Signing Up..." : "Sign Up"}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="other-log-in">
                  <h6>or</h6>
                </div>
                <div className="log-in-button">
                 <div className="row">
                      <div className="col-md-6">
                      <button
                        href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                        className="btn btn-animation w-100"
                      >
                        <img
                          src="../assets/images/inner-page/google.png"
                          alt=""
                        />
                        Sign up with Google
                      </button>
                      </div>
                      <div className="col-md-6">
                      <button
                        href="https://www.facebook.com/"
                        className="btn btn-animation w-100"
                      >
                        <img
                          src="../assets/images/inner-page/facebook.png"
                          alt=""
                        />
                        Sign up with Facebook
                      </button>
                        </div>
                      </div>
                </div>
                <div className="sign-up-box">
                  <h4>Already have an account?</h4>
                  <a href="/login">Log In</a>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6 col-lg-6" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SignUp;
