import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";

const RefundAndRewardsPolicy = () => {
  return (
    <div className="contain">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <h1 className="text-center fs-1">Refund and Returns Policy</h1>
      <p className="text-center text-muted"><strong>Effective Date:</strong> December 12th, 2024</p>
      <p className="text-center">
        At Vegenmart, we are committed to delivering fresh, high-quality produce while ensuring a seamless customer experience. Please review our Refund and Returns Policy below for clarity on cancellations, refunds, and returns.
      </p>

      <div className="accordion mb-3" id="refundPolicyAccordion">
        {/* Cancellation Policy Section */}
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
              1. Cancellation Policy
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#refundPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li><strong>Full Refund:</strong> Orders canceled 4 hours or more before the scheduled delivery slot are eligible for a full refund.</li><br />
                <li><strong>Partial Refund:</strong> Orders canceled within 4 hours of the scheduled delivery slot will incur a 25% deduction of the order value. The remaining amount will be credited to your wallet for future purchases.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Refunds at Delivery Section */}
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
              2. Refunds at Delivery
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#refundPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li><strong>Eligibility for Full Refund:</strong> Customers may reject an order at the time of delivery if the items are damaged, unpacked, or spoiled, or if there are issues with the quality, quantity, or condition of the products.</li><br />
                <li><strong>Customer Responsibility:</strong> It is mandatory to inspect all items upon delivery to ensure satisfaction before accepting the order.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* No Refund Post-Delivery Section */}
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
              3. No Refund Post-Delivery
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#refundPolicyAccordion"
          >
            <div className="accordion-body">
              <p>Once the order has been accepted and delivered, no refund or return requests will be entertained.</p>
            </div>
          </div>
        </div>

        {/* Refund Processing Section */}
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
              4. Refund Processing
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#refundPolicyAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li><strong>Original Payment Method:</strong> For prepaid orders.</li><br />
                <li><strong>Wallet Credit:</strong> For cancellations within 4 hours of the delivery slot.</li><br />
                <li><strong>Refund Completion:</strong> Refunds will be completed within 7-10 business days.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
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
              5. Contact Us
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#refundPolicyAccordion"
          >
            <div className="accordion-body">
              <p>For any questions or concerns regarding refunds or returns, please reach out to our support team:</p>
              <p>Email: <a href="mailto:support@vegenmart.com">support@vegenmart.com</a></p>
              <p>Phone: +91-911 894 0094</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RefundAndRewardsPolicy;
