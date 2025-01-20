import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";

function ShippingPolicy() {
  return (
    <>
      <div className="contain">
        <header className="pb-md-4 pb-0">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </header>
        <h1 className="text-center fs-1">Shipping Policy</h1>
        <p className="text-center text-muted mt-3">
          <strong>Effective Date:</strong> December 12th, 2024
        </p>
        <p className="text-center">
          At Vegenmart, we ensure timely delivery of fresh, ozone-washed
          vegetables and fruits to your doorstep. Please review our shipping
          guidelines below.{" "}
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
                1. Delivery Slots
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
                    Deliveries are scheduled based on the delivery slot selected
                    during checkout.
                  </li>
                  <li>
                    Orders will be delivered within the chosen time frame to
                    ensure freshness and convenience.
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
                2. Shipping Charges
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
                    <strong>Free Shipping:</strong> Orders with a value of ₹99
                    or above are eligible for free delivery.
                  </li>
                  <br />
                  <li>
                    <strong>Shipping Fee:</strong> Orders below ₹99 will incur a
                    delivery charge of ₹50.
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
                3. Delivery Coverage
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
                    We currently deliver to selected cities and areas. To check
                    availability in your location, please use our delivery
                    checker at checkout.
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
                4. Contact Us for Shipping Queries
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
                    For any questions or assistance related to shipping, feel
                    free to contact us at:
                  </li>
                  <br />
                  <li>
                    <strong>Email:</strong>
                    <a href=""> support@vegenmart.com</a>
                  </li>{" "}
                  <br />
                  <li>
                    <strong>Phone:</strong>+91-911 894 0094
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ShippingPolicy;
