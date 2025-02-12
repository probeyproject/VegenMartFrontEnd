import React, { useState, useContext, useEffect } from "react";
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
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

// import { loginSuccess } from "../slices/userSlice"; // Action to update Redux store

function Login() {
  const [loginMethod, setLoginMethod] = useState("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isContinue, setIsContinue] = useState(false);

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");
    setCanResend(false);
    setOtpSent(false);
    setIsOtpVerified(false);
    setIsContinue(false);
  };

  // Continue button login page
  const handleContinue = (e) => {
    e.preventDefault();
    if (!email && !mobileNumber) {
      toast.warning("Please enter email or mobile number!");
      return;
    }

    if (mobileNumber) {
      if (!isValidMobileNumber(mobileNumber)) {
        toast.error("Please enter a valid 10-digit mobile number!");
        return;
      }
      setLoginMethod("mobile");

      handleGenerateOtp();
    } else {
      if (!isValidEmail(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }

      setLoginMethod("email");
    }
    setIsContinue(true);
    setTimer(30);
    setCanResend(false);
  };

  //Resend otp timer

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // Decrease the timer every second
      }, 1000);
    } else {
      clearInterval(interval); // Clear the interval when the timer reaches 0
      setCanResend(true); // Enable the resend OTP button when timer reaches 0
    }
    return () => clearInterval(interval); // Cleanup interval when component is unmounted
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(30); // Reset timer when the user clicks resend
    setCanResend(false); // Disable resend until the timer completes
    // Logic to resend OTP goes here

    handleGenerateOtp();
  };

  const { setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this to use Redux actions

  const isValidMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginMethodChange = (e) => {
    setLoginMethod(e.target.value);
    setOtpSent(false);
  };

  const handleGenerateOtp = async () => {
    // if (!mobileNumber) {
    //   toast.warning("Please enter a mobile number!");
    //   return;
    // }

    // if (!isValidMobileNumber(mobileNumber)) {
    //   toast.error("Please enter a valid 10-digit mobile number!");
    //   return;
    // }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: mobileNumber }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: mobileNumber, otp: otp }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      );

      // Save token and user data in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("OTP verified successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    // if (!email || !password) {
    //   toast.warning("Please enter email and password!");
    //   return;
    // }

    // if (!isValidEmail(email)) {
    //   toast.error("Please enter a valid email address!");
    //   return;
    // }

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
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

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

  // forget password otp on mail
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/forgot-password`, {
        email,
      });

      setTimer(30);
      setCanResend(false);
      setOtpSent(true);

      toast.success("OTP sent to email");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();
    // Verify the OTP entered by the user

    try {
      const response = await axios.post(`${baseUrl}/verify-reset-otp`, {
        email,
        otp,
      });
      setIsOtpVerified(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = axios.post(`${baseUrl}/reset-password`, {
        email,
        newPassword,
      });

      setNewPassword("");
      setConfirmPassword("");

      setOtp("");
      setOtpSent(false);
      setEmail("");
      setCanResend(false);
      setIsOtpVerified(false);

      toast.success("Password Reset Successfull");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoogleLogin = async (response) => {
    const idToken = response.credential; // Google ID token

    try {
      const res = await fetch(`${baseUrl}/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
        credentials: "include",
      });

      const data = await res.json();

      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
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
                <div className="log-in-title mb-0  text-center">
                  <img
                    className="img-fluid w-50 h-10"
                    src={logo}
                    alt="vegenmart"
                  />
                </div>

                <h3 className="text-center fw-bold">
                  Delivering Ozone Washed Vegetables and Fruits
                </h3>

                <div className="text-center mt-2 fs-6">Login or Sign Up</div>

                {!isForgotPassword ? (
                  <form className="mt-4">
                    {!isContinue ? (
                      <>
                        <div className="d-flex flex-column flex-md-row gap-2 justify-content-center align-items-center">
                          {/* Mobile number input with +91 */}
                          <div className="input-group w-100 w-md-auto">
                            <span className="input-group-text">+91</span>
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              placeholder="Enter mobile number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              maxLength="10"
                            />
                          </div>
                        </div>

                        {/* <div className="mt-2">
                    <GoogleLogin onSuccess={handleGoogleLogin} />
                  </div> */}

                        <button
                          className="btn btn-animation w-auto py-1 px-3 mx-auto mt-3"
                          onClick={(e) => handleContinue(e)}
                        >
                          Continue
                        </button>

                        {/* Forgot Password Link */}
                        {/* <p className="text-center mt-3">
                          <a href="#" onClick={() => setIsForgotPassword(true)}>
                            Forgot password?
                          </a>
                        </p> */}
                      </>
                    ) : (
                      <div className="mt-3">
                        {/* Back icon */}
                        <div
                          className="d-flex align-items-center mb-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => setIsContinue(false)}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          <span>Back</span>
                        </div>

                        {loginMethod === "mobile" && (
                          <input
                            type="text"
                            className="form-control py-1 w-75 w-md-50 mx-auto"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                          />
                        )}

                        <button
                          type="submit"
                          className="btn btn-animation w-auto px-2 py-1 mx-auto mt-3"
                          onClick={(e) => handleVerifyOtp(e)}
                        >
                          Submit OTP
                        </button>

                        {otpSent &&
                          (canResend ? (
                            <p
                              className="mt-2 mx-auto text-center"
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={handleResendOtp}
                            >
                              Resend OTP
                            </p>
                          ) : (
                            <p className="mt-2 mx-auto text-center">
                              You can resend OTP in {timer} seconds
                            </p>
                          ))}
                      </div>
                    )}
                  </form>
                ) : (
                  /* Forgot Password Form */
                  <div className="mt-4">
                    {!otpSent ? (
                      <>
                        <input
                          type="number"
                          min={0}
                          className="form-control w-75 w-md-50 mx-auto"
                          placeholder="Enter mobile number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          maxLength="10"
                        />

                        <button
                          className="btn btn-animation w-auto px-2 py-1 mx-auto mt-3"
                          onClick={(e) => handleSendOtp(e)}
                        >
                          Send OTP
                        </button>
                      </>
                    ) : !isOtpVerified ? (
                      <>
                        {/* Back icon */}
                        <div
                          className="d-flex align-items-center mb-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => setIsForgotPassword(false)}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          <span>Back</span>
                        </div>

                        <input
                          type="text"
                          className="form-control py-1 w-75 w-md-50 mx-auto"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength="6"
                        />

                        <button
                          className="btn btn-animation w-auto px-2 py-1 mx-auto mt-3"
                          onClick={(e) => handleVerifyEmailOtp(e)}
                        >
                          Verify OTP
                        </button>

                        {otpSent &&
                          (canResend ? (
                            <p
                              className="mt-2 mx-auto text-center"
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={(e) => handleSendOtp(e)}
                            >
                              Resend OTP
                            </p>
                          ) : (
                            <p className="mt-2 mx-auto text-center">
                              You can resend OTP in {timer} seconds
                            </p>
                          ))}
                      </>
                    ) : (
                      <>
                        <input
                          type="password"
                          className="form-control w-75 w-md-50 mx-auto"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <input
                          type="password"
                          className="form-control w-75 w-md-50 mx-auto mt-2"
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                          className="btn btn-animation w-auto px-2 py-1 mx-auto mt-3"
                          onClick={(e) => handleResetPassword(e)}
                        >
                          Reset Password
                        </button>
                      </>
                    )}

                    <p className="text-center mt-3">
                      Remembered your password?{" "}
                      <Link to={"/login"} onClick={handleBackToLogin}>
                        Back to Login
                      </Link>
                    </p>
                  </div>
                )}

                <p
                  className="mt-3 text-muted text-center"
                  style={{ fontSize: "12px" }}
                >
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
