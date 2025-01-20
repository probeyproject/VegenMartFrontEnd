import React, { useState } from "react";

const RedeemPoints = () => {
  const [redeemEnabled, setRedeemEnabled] = useState(false); // React state to track if points redemption is enabled
  const [rewardPoints, setRewardPoints] = useState(50); // Initial points (could be fetched dynamically)

  return (
    <div className="container py-2">
      {" "}
      {/* Reduced container padding for compactness */}
      <div className="card shadow-sm">
        <div className="card-body p-2">
          {" "}
          {/* Reduced padding for the card body */}
          <h6 className="card-title text-center mb-3">Your Rewards Points</h6>
          {/* Section 1: Reward Points */}


          <div className="d-flex justify-content-between">
          <div>
            <div className="mb-2">
              <h6>Your current reward points:</h6>
              <span className="text-primary fs-5">{rewardPoints}</span>
            </div>

            {/* Section 2: Redeem Switch */}
            <div className="d-flex align-items-center mb-2">
              <h6 className="form-check-label me-2 mb-0">Redeem reward:</h6>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="redeemSwitch"
                  onChange={() => setRedeemEnabled(!redeemEnabled)} // Toggle the switch logic
                />
                <label className="form-check-label" htmlFor="redeemSwitch">
                  {redeemEnabled ? "Enabled" : "Disabled"}
                </label>
              </div>
            </div>
          </div>
          {/* Section 3: Apply Points Button */}
          <div className="">
            <button
              className={`btn btn-animation ${redeemEnabled && rewardPoints >= 20 ? "" : "disabled"}`}
              style={{ height: "35px", fontSize: "14px" }} // Smaller height and font size
              onClick={() => {
                if (redeemEnabled) {
                  if (rewardPoints >= 20) {
                    setRewardPoints(rewardPoints - 20);
                    alert("You have redeemed 20 points!");
                  } else {
                    // Redeem based on points available
                    const redeemValue = rewardPoints / 4;
                    setRewardPoints(0);
                    alert(
                      `You have redeemed all your points! Value: ${redeemValue}`
                    );
                  }
                } else {
                  alert("Please enable the reward redemption toggle.");
                }
              }}
            >
              Apply Reward Points
            </button>
          </div>
          {/* Information Alert */}
          </div>
          <div className="alert alert-info mb-0 h-25 w-50">
            <strong>Note:</strong> Redeem 20 points to get a reward or ₹5 discount.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemPoints;
