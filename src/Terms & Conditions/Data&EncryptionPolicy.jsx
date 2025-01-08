import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import HeaderTop from '../Components/Header/HeaderTop';
import HeaderMiddle from '../Components/Header/HeaderMiddle';
import HeaderBottom from '../Components/Header/HeaderBottom';
import Footer from '../Components/Common/Footer';

const DataEncryptionPolicy = () => {
  return (
    <div className="contain">
        <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <h1 className="text-center fs-1 mb-4">Data & Encryption Policy</h1>
      <p className="text-muted text-center">Effective Date: December 12th, 2024</p>

      <p className="text-justify">
        At Vegenmart, we are committed to protecting your personal information and ensuring transparency in how we collect, use, and store your data. By using our website and services, you agree to the following terms related to data usage:
      </p>

      <div className="accordion mb" id="dataPolicyAccordion">
        {/* Section 1: Data Collection */}
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
              1. Data Collection
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <strong>Personal Information:</strong> We collect personal information such as your name, contact details, delivery address, and payment information to process orders and improve your experience.
                </li>
                <li>
                  <strong>Non-personal Information:</strong> Non-personal information, such as browsing patterns, device type, and location data, may be collected for analytics and service optimization.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Purpose of Data Usage */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              2. Purpose of Data Usage
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>To process and fulfill your orders.</li>
                <li>To communicate updates, offers, and notifications about your orders.</li>
                <li>To improve website functionality and user experience.</li>
                <li>To analyze customer preferences and optimize our services.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Data Sharing */}
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
              3. Data Sharing
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Your data will not be sold or rented to third parties.</li>
                <li>We may share your data with trusted service providers (e.g., payment processors, delivery partners) strictly to fulfill your orders.</li>
                <li>Data may also be shared if required by law or to protect Vegenmart's rights and users.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Data Security */}
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
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>We implement stringent security measures to protect your data from unauthorized access or misuse.</li>
                <li>However, no system is 100% secure, and we encourage users to maintain strong, confidential passwords for their accounts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: User Rights */}
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
              5. User Rights
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>You have the right to access, update, or delete your personal information by logging into your account.</li>
                <li>You can also request changes or deletions by contacting our support team at <a href="mailto:support@vegenmart.com">support@vegenmart.com</a>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Cookies */}
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
              6. Cookies
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <p>
                Our website uses cookies to enhance your browsing experience. By using our platform, you consent to the use of cookies.
              </p>
            </div>
          </div>
        </div>

        {/* Section 7: Changes to Data Terms */}
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
              7. Changes to Data Terms
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <p>
                Vegenmart reserves the right to update these terms at any time. Any significant changes will be communicated to users via email or notifications on the website.
              </p>
            </div>
          </div>
        </div>

        {/* Section 8: Contact Us */}
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
              8. Contact Us
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="headingEight"
            data-bs-parent="#dataPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li><strong>Email:</strong> <a href="mailto:support@vegenmart.com">support@vegenmart.com</a></li>
                <li><strong>Phone:</strong> +91-911 894 0094</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DataEncryptionPolicy;
