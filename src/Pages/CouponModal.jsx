import React, { useState } from "react";
import "../CSS/CouponModal.css";

const CouponModal = ({ isModalOpen, setIsModalOpen, coupons, handleCouponClick }) => {
  const [copiedCoupon, setCopiedCoupon] = useState(null); // Store the coupon that was copied

  // Function to handle copying the coupon code
  const handleCopyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode) // Write the coupon code to clipboard
      .then(() => {
        setCopiedCoupon(couponCode); // Set the copied coupon code
        setTimeout(() => {
          setCopiedCoupon(null); // Reset after 2 seconds
        }, 2000);
      })
      .catch(() => {
        alert("Failed to copy the coupon code.");
      });
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Available Coupons</h3>
        <button className="close-modal" onClick={() => setIsModalOpen(false)}>
          &times;
        </button>
        <ul className="coupon-list">
          {coupons.map((coupon, index) => (
            <li key={index} className="coupon-item">
              <div className="coupon-info">
                <span className="coupon-code">{coupon.coupon_code}</span>
                <button
                  className="btn-copy"
                  onClick={() => handleCopyCoupon(coupon.coupon_code)}
                >
                  {copiedCoupon === coupon.coupon_code ? "Copied!" : "Copy"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CouponModal;
