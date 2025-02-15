import React, { useState } from "react";
import { FaShareAlt, FaShoppingBag, FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";

const Referral = () => {
  const userState = useSelector((state) => state.user);
  const referralCode = userState?.user?.referral_code; // Your referral code
  const referralLink = `https://vegenmart.com/?referralCode=${referralCode}`;

  const [showAlert, setShowAlert] = useState(false);

  // Function to copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => setShowAlert(true))
      .catch((err) => console.error("Error copying to clipboard: ", err));

    // Auto-hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="container mt-4 p-4 shadow-sm bg-white rounded">
      <h3 className="text-center mb-3"> Manage Referrals</h3>
      <h4 className="mt-4">How it works</h4>

      <div className="row mt-4">
        <div className="col-auto d-flex flex-column align-items-center">
          <FaShareAlt size={18} className="text-primary mb-2" />
          <div
            style={{ height: "40px", width: "2px", backgroundColor: "#ddd" }}
          ></div>
          <FaShoppingBag size={18} className="text-success mb-2" />
          <div
            style={{ height: "40px", width: "2px", backgroundColor: "#ddd" }}
          ></div>
          <FaRupeeSign size={18} className="text-warning" />
        </div>

        <div className="col d-flex flex-column justify-content-center gap-4">
          <p>
            <strong>Share the referral link</strong> with your friends & family.
          </p>
          <p>
            Once they <strong>sign up</strong>, you{" "}
            <strong>earn 50 points</strong>.
          </p>
          <p>
            Use rewards to <strong>get discounts</strong> on your orders!
          </p>
        </div>
      </div>

      <h4 className="text-center mt-5 mb-2">🚀 Share Your Referral Code</h4>
      <p className="text-center text-muted">
        Invite friends to join and earn exciting rewards!
      </p>

      {/* Show alert when link is copied */}
      {showAlert && (
        <div className="alert alert-success text-center py-2">
          ✅ Referral link copied!
          <span
            className="close float-end"
            onClick={() => setShowAlert(false)}
            style={{ cursor: "pointer" }}
          >
            &times;
          </span>
        </div>
      )}

      {/* Referral Code Display */}
      <div className="text-center my-4">
        <h5 className="d-inline-block px-3 py-2 bg-light rounded">
          <span className="text-info fw-bold">{referralCode}</span>
        </h5>
      </div>

      {/* Copy Link Input Group */}
      <div className="input-group mb-4 shadow-sm rounded">
        <input
          type="text"
          className="form-control rounded-start"
          value={referralLink}
          readOnly
        />
        <button
          className="btn btn-animation px-3 rounded-end"
          onClick={handleCopyLink}
        >
          Copy Link
        </button>
      </div>

      {/* Social Media Share Buttons */}
      <div className="d-flex justify-content-center gap-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-info btn-lg rounded-circle"
          role="button"
        >
          <img
            src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png"
            alt="Facebook Icon"
            style={{ width: "25px" }}
          />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-info btn-lg rounded-circle"
          role="button"
        >
          <img
            src="https://img.icons8.com/?size=100&id=yoQabS8l0qpr&format=png"
            alt="Twitter Icon"
            style={{ width: "25px" }}
          />
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this referral link: ${referralLink}`)}`}
          target="_blank"
          className="btn btn-success btn-lg rounded-circle"
          role="button"
        >
          <img
            src="https://img.icons8.com/?size=100&id=16713&format=png"
            alt="WhatsApp Icon"
            style={{ width: "25px" }}
          />
        </a>

        <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-danger btn-lg rounded-circle"
          role="button"
        >
          <img
            src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png"
            alt="Instagram Icon"
            style={{ width: "25px" }}
          />
        </a>
      </div>
    </div>
  );
};

export default Referral;
