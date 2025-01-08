import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderTop from '../Components/Header/HeaderTop';
import HeaderMiddle from '../Components/Header/HeaderMiddle';
import HeaderBottom from '../Components/Header/HeaderBottom';
import Footer from '../Components/Common/Footer';
import { Link } from 'react-router-dom';

const BusinessTermsConditions = () => {
  return (
    <div className="contain">
        <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <h1 className="text-center fs-1 mb-4">Business Terms and Conditions</h1>
      <p className="text-muted text-center">Effective Date: December 12th, 2024</p>

      <p className="text-center">
        Welcome to Vegenmart! These Business Terms and Conditions outline the rules and regulations for using our platform and services. By accessing our website or placing an order, you agree to comply with these terms. Please read them carefully.
      </p>

      <div className="accordion mb-3" id="businessTermsAccordion">
        {/* Section 1: Acceptance of Terms */}
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
              1. Acceptance of Terms
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>By using Vegenmart, you agree to these Terms and Conditions, including any future amendments.</li>
                <li>If you do not agree with these terms, you may not access or use our platform.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Products and Pricing */}
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
              2. Products and Pricing
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Product descriptions, images, and pricing are subject to change without notice.</li>
                <li>While we strive for accuracy, slight variations in product appearance may occur due to the nature of fresh produce.</li>
                <li>Prices displayed at the time of purchase are final, and promotional discounts are applicable only as specified.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Ordering and Payments */}
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
              3. Ordering and Payments
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>All orders must be placed through our website or mobile application.</li>
                <li>Payments can be made via accepted methods, including credit/debit cards, UPI, and cash on delivery (COD).</li>
                <li>Orders are confirmed only after payment is successfully processed.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Delivery Policy */}
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
              4. Delivery Policy
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Delivery is subject to the availability of delivery slots and serviceable locations.</li>
                <li>Timely delivery is our priority; however, delays may occur due to unforeseen circumstances such as weather or logistical challenges.</li>
                <li>Please review our <Link to="/shippingpolicy">Shipping Policy</Link> for more details.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Cancellation and Refunds */}
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
              5. Cancellation and Refunds
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Customers can cancel their orders as per the guidelines mentioned in our <Link to="/refundAndrewardspolicy">Refund and Returns Policy</Link>.</li>
                <li>Refunds are processed based on the terms outlined in the policy.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Customer Responsibilities */}
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
              6. Customer Responsibilities
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Customers are responsible for ensuring the accuracy of order details, including delivery address, phone number, and items ordered.</li>
                <li>It is the customer’s responsibility to inspect items upon delivery for quality, quantity, and condition.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7: Business Use */}
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
              7. Business Use
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>The platform is intended for personal, non-commercial use unless explicitly stated.</li>
                <li>Bulk orders or reselling of products without prior approval from Vegenmart is prohibited.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 8: Intellectual Property */}
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
              8. Intellectual Property
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="headingEight"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>All content, logos, designs, and trademarks on the website are the property of Vegenmart and protected under applicable intellectual property laws.</li>
                <li>Unauthorized use or reproduction of content is strictly prohibited.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 9: Limitation of Liability */}
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
              9. Limitation of Liability
            </button>
          </h2>
          <div
            id="collapseNine"
            className="accordion-collapse collapse"
            aria-labelledby="headingNine"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Vegenmart is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
                <li>In the event of disputes, our liability is limited to the value of the order in question.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 10: Force Majeure */}
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
              10. Force Majeure
            </button>
          </h2>
          <div
            id="collapseTen"
            className="accordion-collapse collapse"
            aria-labelledby="headingTen"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <p>
                Vegenmart is not responsible for delays or non-performance caused by events beyond our control, including natural disasters, strikes, or government actions.
              </p>
            </div>
          </div>
        </div>

        {/* Section 11: Amendments to Terms */}
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
              11. Amendments to Terms
            </button>
          </h2>
          <div
            id="collapseEleven"
            className="accordion-collapse collapse"
            aria-labelledby="headingEleven"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <p>Vegenmart reserves the right to update or modify these terms at any time. Users will be notified of significant changes via email or website updates.</p>
            </div>
          </div>
        </div>

        {/* Section 12: Governing Law */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwelve">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwelve"
              aria-expanded="false"
              aria-controls="collapseTwelve"
            >
              12. Governing Law
            </button>
          </h2>
          <div
            id="collapseTwelve"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwelve"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <p>
                These terms are governed by the laws of India, and Consumer Act, Any disputes will be subject to the jurisdiction of courts in UP High court, Allahabad.
              </p>
            </div>
          </div>
        </div>

        {/* Section 13: Contact Us */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThirteen">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThirteen"
              aria-expanded="false"
              aria-controls="collapseThirteen"
            >
              13. Contact Us
            </button>
          </h2>
          <div
            id="collapseThirteen"
            className="accordion-collapse collapse"
            aria-labelledby="headingThirteen"
            data-bs-parent="#businessTermsAccordion"
          >
            <div className="accordion-body">
              <p>
                For any questions regarding these Business Terms and Conditions, please contact us:
                <br />
                Email: <a href="mailto:support@vegenmart.com">support@vegenmart.com</a>
                <br />
                Phone: +91-911 894 0094
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BusinessTermsConditions;
