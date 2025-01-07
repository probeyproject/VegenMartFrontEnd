import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="container-fluid my-5">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <h2 className="text-center mb-4">Privacy Policy</h2>
      <p className="text-muted text-center">Effective Date: December 12th, 2024</p>

      <p>
        Vegenmart is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read it carefully.
      </p>

      <div className="accordion mb-3" id="privacyPolicyAccordion">
        {/* Section 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              1. Information We Collect
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li style={{fontSize:"15px"}}>
                  <strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment details when you register or place an order.
                </li>
                <li style={{fontSize:"15px"}}>
                  <strong>Non-Personal Information:</strong> Browser type, device information, and browsing patterns for analytics.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="accordion-item ">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              2. How We Use Your Information
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li style={{fontSize:"15px"}}>To process orders and manage your account.</li><br />
                <li style={{fontSize:"15px"}}>To improve user experience and website functionality.</li><br />
                <li style={{fontSize:"15px"}}>To send updates about orders, promotions, and offers (with your consent).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              3. Sharing Your Information
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <p style={{fontSize:"18px"}}>We do not sell or rent your personal information. We may share your information:</p>
              <ul>
                <li style={{fontSize:"15px"}}>With trusted third-party service providers for payment processing and delivery.</li> <br />
                <li style={{fontSize:"15px"}}>To comply with legal obligations or enforce our Terms and Conditions.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              4. Data Security
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <p style={{fontSize:"15px"}}>
                We implement advanced security measures to protect your data. <br />However, no online service can guarantee 100% security. Please safeguard your account credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              5. Cookie Policy
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <p style={{fontSize:"15px"}}>
                Our website uses cookies to improve your browsing experience. For more details, refer to our <a href="/cookie-policy">Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              6. Your Choices
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li style={{fontSize:"15px"}}>You can update your account information anytime.</li> <br />
                <li style={{fontSize:"15px"}}>Opt-out of promotional communications by clicking “unsubscribe” in our emails.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7 */}
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
              7. Contact Us
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#privacyPolicyAccordion"
          >
            <div className="accordion-body">
              <p>If you have questions about our Privacy Policy or data practices, contact us at:</p>
              <ul>
                <li style={{fontSize:"15px"}}>
                  <strong>Email:</strong> support@vegenmart.com
                </li>
                <br />
                <li style={{fontSize:"15px"}}>
                  <strong>Phone:</strong> +91-911 894 0094
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

