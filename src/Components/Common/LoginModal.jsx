import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/userSlice";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/1.png";
import { baseUrl } from "../../API/Api";
import { X } from "lucide-react";
import "./LoginModal.css";

function LoginModal({ isOpen, toggle }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);

  const isValidMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("referralCode");
    if (code) {
      setReferralCode(code);
    }
  }, [location]);

  const handleGenerateOtp = async () => {
    if (!isValidMobileNumber(mobileNumber)) {
      toast.error("Enter a valid 10-digit mobile number!");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = referralCode
        ? `${baseUrl}/signupUserForReferaal`
        : `${baseUrl}/send-otp`;
      const body = referralCode
        ? { phoneNumber: mobileNumber, referralCode }
        : { phoneNumber: mobileNumber };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Network error");

      toast.success("OTP sent successfully!");
      setTimer(30);
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobileNumber, otp }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Invalid OTP");

      const data = await response.json();
      dispatch(login({ user: data.user, token: data.token }));
      toast.success("OTP verified successfully!");
      toggle();
    } catch (error) {
      toast.error("Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <div className="login-modal-container">
        {/* Close Button */}
        <button className="close-btn" onClick={toggle}>
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="text-center">
          <img className="logo" src={logo} alt="Vegenmart" />
        </div>

        <h3 className="text-center fw-bold">
          Delivering Ozone Washed Vegetables and Fruits
        </h3>
        <p className="text-center">
          {otpSent ? "Enter OTP" : "Login or Sign Up"}
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-3">
          <div className="form-group">
            {!otpSent ? (
              <>
                <div className="input-group">
                  <span className="input-group-text">+91</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    maxLength="10"
                  />
                </div>

                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter referral code (optional)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            )}
          </div>

          {/* Resend OTP */}
          {otpSent &&
            (canResend ? (
              <p className="resend-text" onClick={handleGenerateOtp}>
                Resend OTP
              </p>
            ) : (
              <p className="timer-text">
                You can resend OTP in {timer} seconds
              </p>
            ))}

          <button
            className="btn btn-animation mt-3 w-100"
            onClick={otpSent ? handleVerifyOtp : handleGenerateOtp}
            disabled={loading}
          >
            {loading ? "Loading..." : otpSent ? "Verify OTP" : "Generate OTP"}
          </button>
        </form>

        <p className="text-muted mt-3 small-text">
          By continuing, you agree to our <a href="/terms">Terms</a> &{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </Modal>
  );
}

export default LoginModal;
