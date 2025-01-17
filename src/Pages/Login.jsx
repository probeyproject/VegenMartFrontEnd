import React, { useState,useContext } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import logo from "../assets/images/logo/1.png";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../API/Api";
import { UserContext } from "../Context/UserContrxt";
import { useDispatch } from "react-redux"; 
import { login } from "../slices/userSlice"; // Correct import

// import { loginSuccess } from "../slices/userSlice"; // Action to update Redux store


function Login() {
  const [loginMethod, setLoginMethod] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this to use Redux actions

  const isValidMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginMethodChange = (e) => {
    setLoginMethod(e.target.value);
    setOtpSent(false);
  };

  const handleGenerateOtp = async () => {
    if (!mobileNumber) {
      toast.warning("Please enter a mobile number!");
      return;
    }

    if (!isValidMobileNumber(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: mobileNumber }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success("OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.warning("Please enter the OTP!");
      return;
    }
  
    if (otp.length !== 6) {
      toast.error("Invalid OTP. Please enter a 6-digit OTP.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: mobileNumber, otp: otp }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      dispatch(
        login({
          user: data.user,
          token: data.token
        })
      );
  
       // Save token and user data in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  
      toast.success("OTP verified successfully!");
      navigate('/');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoginWithEmail = async () => {
    if (!email || !password) {
      toast.warning("Please enter email and password!");
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed.");
      }
  
      const data = await response.json();
  
      if (data.token) {
        // Dispatch the login action to update Redux state
        dispatch(
          login({
            user: data.user,
            token: data.token,
          })
        );
  
       // Store the token and user info in localStorage
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  
        toast.success("Login successful!");
        navigate("/"); // Redirect to homepage or another authenticated route
      } else {
        toast.error("Token not received. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
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
        {/* Breadcrumb Section */}
      </section>

      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/log-in.png"
                  className="img-fluid"
                  alt="Login"
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title text-center">
                  <h3>Welcome To Vegenmart</h3>
                </div>

                <div className="text-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input "
                      type="radio"
                      name="loginMethod"
                      value="mobile"
                      checked={loginMethod === "mobile"}
                      onChange={handleLoginMethodChange}
                    />
                    <label className="form-check-label">Login with Mobile</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="loginMethod"
                      value="email"
                      checked={loginMethod === "email"}
                      onChange={handleLoginMethodChange}
                    />
                    <label className="form-check-label">Login with Email</label>
                  </div>
                </div>

                <form className="mt-4">
                  {loginMethod === "mobile" ? (
                    <>
                      {!otpSent ? (
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            maxLength="10"
                          />
                        </div>
                      ) : (
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                          />
                        </div>
                      )}
                      <button
                        className="btn btn-animation w-100"
                        onClick={otpSent ? handleVerifyOtp : handleGenerateOtp}
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : otpSent ? (
                          "Verify OTP"
                        ) : (
                          "Generate OTP"
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="input-group mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn btn-animation w-100"
                        onClick={handleLoginWithEmail}
                        disabled={loading}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Log In"
                        )}
                      </button>
                    </>
                  )}
                </form>

                <p className="mt-3 text-muted" style={{ fontSize: "12px" }}>
                  By continuing, you agree to our{" "}
                  <Link href="/terms">Terms of service</Link> &{" "}
                  <Link href="/privacypolicy">Privacy policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;
