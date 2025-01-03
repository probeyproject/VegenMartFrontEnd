import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "../../slices/userSlice";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo/1.png";
import { baseUrl } from "../../API/Api";

function LoginModal({ isOpen, toggle }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [referralCode, setReferralCode] = useState(""); // Referral code is now optional, default to empty string
  const dispatch = useDispatch();
  const location = useLocation(); // Get location outside useEffect

  const userState = useSelector((state) => state.user);
  const referralCodes = userState?.user?.referral_code; // Your referral code

  const isValidMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const handleInputChange = (e) => setMobileNumber(e.target.value);

  const handleOtpChange = (e) => setOtp(e.target.value);

  // Check for referral code in URL when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("referralCode");
    if (code) {
      setReferralCode(code); // Store referral code if it exists in the URL
    }
  }, [location]); // Correct dependency: location

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
      // Check if referral code is present and construct the API URL and body accordingly
      const apiUrl = referralCode
        ? `${baseUrl}/signupUserForReferaal`
        : `${baseUrl}/send-otp`;

      const body = referralCode
        ? { phoneNumber: mobileNumber, referralCode } // Send referral code if present
        : { phoneNumber: mobileNumber }; // Only send phone number if no referral code

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      if (referralCode) {
        const data = await response.json();
        // // Show referral success message if applicable
        // toast.success(`Signup successful! Your referral code is: ${data.referralCode}`);
      } else {
        toast.success("OTP sent successfully!");
      }

      setOtpSent(true); // OTP is sent, now show the OTP input
    } catch (error) {
      toast.error("Failed to send OTP or signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Invalid OTP. Please enter a 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: mobileNumber, otp: otp }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      dispatch(verifyOTP(data)); // Dispatch the user data to Redux
      toast.success("OTP verified successfully!");
      toggle(); // Close modal on successful OTP verification
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <div>
        <div className="card p-2 text-center">
          <div className="mb-1">
            <img src={logo} alt="Company Logo" style={{ width: "80px" }} />
          </div>
          <p className="fw-bold">{otpSent ? "Enter OTP" : "Login or Sign up"}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex flex-column align-items-center">
              <div className="mb-3 w-50">
                {!otpSent ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mobile number"
                      value={mobileNumber}
                      onChange={handleInputChange}
                      maxLength="10"
                      style={{ height: "40px" }}
                    />
                    {/* Referral Code Input */}
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Enter referral code (optional)"
                      value={referralCode} // Automatically fill referralCode from the URL
                      onChange={(e) => setReferralCode(e.target.value)} // Update referral code state if user wants to change it
                      style={{ height: "40px" }}
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength="6"
                  />
                )}
              </div>

              <button
                className="btn btn-animation"
                 // Custom button color
                onClick={otpSent ? handleVerifyOtp : handleGenerateOtp}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : otpSent ? (
                  "Verify OTP"
                ) : (
                  "Generate OTP"
                )}
              </button>
              <p className="mt-4">New user? <Link to="/signup">SignUp</Link> Or <Link to="/login">Login </Link></p>
            </div>
          </form>
          <p className="mt-3 text-muted" style={{ fontSize: "12px" }}>
            By continuing, you agree to our{" "}
            <a href="/terms">Terms of service</a> &{" "}
            <a href="/privacy">Privacy policy</a>.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
