import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";

function LoyaltyRewardsPolicy() {
  return (
    <>
      <div className="contain">
        <header className="pb-md-4 pb-0">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </header>
        <h1 className="text-center fs-1">Loyalty Rewards Policy</h1>
        <p className="text-center text-muted mt-3">
          <strong>Effective Date:</strong> December 12th, 2024
        </p>
        <p className="text-center">
          At Vegenmart, we value our customers and believe in rewarding your
          loyalty. Our Loyalty Rewards Program is designed to make every
          purchase more rewarding.
        </p>

        <div className="accordion mb-3" id="loyaltyPolicyAccordion">
          {/* Earning Reward Points Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="true"
                aria-controls="collapseSix"
              >
                1. Earning Reward Points
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse show"
              aria-labelledby="headingSix"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <ul>
                  <li>
                    <strong>Standard Rewards:</strong> Earn 10% reward points
                    for every order worth ₹500 or more.
                  </li><br />
                  <li>
                    <strong>Prepaid Bonus Rewards:</strong> Earn an additional
                    10% reward points for prepaid orders of ₹500 or more.
                  </li><br />
                  <li>
                    <strong>Special Promotions:</strong> Bonus reward points may
                    be offered during special events or on specific products.
                    Stay tuned!
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Redeeming Reward Points Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                2. Redeeming Reward Points
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              aria-labelledby="headingSeven"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <ul>
                  <li>
                    <strong>Reward points:</strong> Can be redeemed during your
                    next purchase.
                  </li><br />
                  <li>
                    <strong>Redemption:</strong> Use up to 50% of the total
                    value of reward points in a single order.
                  </li><br />
                  <li>
                    <strong>Automatic Redemption:</strong> Points will be
                    applied automatically at checkout for eligible orders.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Points Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEight">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
                aria-expanded="false"
                aria-controls="collapseEight"
              >
                3. Additional Points
              </button>
            </h2>
            <div
              id="collapseEight"
              className="accordion-collapse collapse"
              aria-labelledby="headingEight"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <ul>
                  <li>
                    <strong>First Order Bonus:</strong> Receive an additional
                    100 reward points on your first purchase.
                  </li><br />
                  <li>
                    <strong>Referral Rewards:</strong> Earn 50 reward points for
                    each successful referral. The referred friend will also
                    receive 50 points on their first order.
                  </li><br />
                  <li>
                    <strong>Special Day Rewards:</strong> Get bonus points on
                    birthdays, anniversaries, or during special promotions.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingNine">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseNine"
                aria-expanded="false"
                aria-controls="collapseNine"
              >
                4. Terms and Conditions
              </button>
            </h2>
            <div
              id="collapseNine"
              className="accordion-collapse collapse"
              aria-labelledby="headingNine"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <ul>
                  <li>
                    <strong>Non-transferable:</strong> Reward points cannot be
                    transferred or exchanged for cash.
                  </li><br />
                  <li>
                    <strong>Expiration:</strong> Points expire after 6 months
                    from the date of issue unless stated otherwise.
                  </li><br />
                  <li>
                    <strong>Minimum Order:</strong> Redemption requires a
                    minimum order value of ₹500.
                  </li><br />
                  <li>
                    <strong>Combination:</strong> Points cannot be combined with
                    other promotional offers unless explicitly mentioned.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tracking Your Rewards Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTen">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTen"
                aria-expanded="false"
                aria-controls="collapseTen"
              >
                5. Tracking Your Rewards
              </button>
            </h2>
            <div
              id="collapseTen"
              className="accordion-collapse collapse"
              aria-labelledby="headingTen"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <p>
                  Customers can view their earned and available reward points in
                  the "My Account" section.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEleven">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEleven"
                aria-expanded="false"
                aria-controls="collapseEleven"
              >
                6. Contact Us for Assistance
              </button>
            </h2>
            <div
              id="collapseEleven"
              className="accordion-collapse collapse"
              aria-labelledby="headingEleven"
              data-bs-parent="#loyaltyPolicyAccordion"
            >
              <div className="accordion-body">
                <p>
                  For queries regarding reward points, feel free to reach out to
                  us:
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:support@vegenmart.com">
                    support@vegenmart.com
                  </a>
                </p>
                <p>Phone: +91-911 894 0094</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LoyaltyRewardsPolicy;
