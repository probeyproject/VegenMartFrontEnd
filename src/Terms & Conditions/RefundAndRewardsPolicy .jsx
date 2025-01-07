import React from "react";

const RefundAndRewardsPolicy = () => {
  return (
    <div className="container mt-5">
      <h1>Refund and Returns Policy</h1>
      <p><strong>Effective Date:</strong> December 12th, 2024</p>
      <p>
        At Vegenmart, we are committed to delivering fresh, high-quality produce while ensuring a seamless customer experience. Please review our Refund and Returns Policy below for clarity on cancellations, refunds, and returns.
      </p>

      <div className="accordion" id="refundPolicyAccordion">
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
                <li><strong>Full Refund:</strong> Orders canceled 4 hours or more before the scheduled delivery slot are eligible for a full refund.</li>
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
                <li><strong>Eligibility for Full Refund:</strong> Customers may reject an order at the time of delivery if the items are damaged, unpacked, or spoiled, or if there are issues with the quality, quantity, or condition of the products.</li>
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
                <li><strong>Original Payment Method:</strong> For prepaid orders.</li>
                <li><strong>Wallet Credit:</strong> For cancellations within 4 hours of the delivery slot.</li>
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

      <hr className="my-5" />

      <h1>Loyalty Rewards Policy</h1>
      <p><strong>Effective Date:</strong> December 12th, 2024</p>
      <p>
        At Vegenmart, we value our customers and believe in rewarding your loyalty. Our Loyalty Rewards Program is designed to make every purchase more rewarding.
      </p>

      <div className="accordion" id="loyaltyPolicyAccordion">
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
                <li><strong>Standard Rewards:</strong> Earn 10% reward points for every order worth ₹500 or more.</li>
                <li><strong>Prepaid Bonus Rewards:</strong> Earn an additional 10% reward points for prepaid orders of ₹500 or more.</li>
                <li><strong>Special Promotions:</strong> Bonus reward points may be offered during special events or on specific products. Stay tuned!</li>
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
                <li><strong>Reward points:</strong> Can be redeemed during your next purchase.</li>
                <li><strong>Redemption:</strong> Use up to 50% of the total value of reward points in a single order.</li>
                <li><strong>Automatic Redemption:</strong> Points will be applied automatically at checkout for eligible orders.</li>
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
                <li><strong>First Order Bonus:</strong> Receive an additional 100 reward points on your first purchase.</li>
                <li><strong>Referral Rewards:</strong> Earn 50 reward points for each successful referral. The referred friend will also receive 50 points on their first order.</li>
                <li><strong>Special Day Rewards:</strong> Get bonus points on birthdays, anniversaries, or during special promotions.</li>
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
                <li><strong>Non-transferable:</strong> Reward points cannot be transferred or exchanged for cash.</li>
                <li><strong>Expiration:</strong> Points expire after 6 months from the date of issue unless stated otherwise.</li>
                <li><strong>Minimum Order:</strong> Redemption requires a minimum order value of ₹500.</li>
                <li><strong>Combination:</strong> Points cannot be combined with other promotional offers unless explicitly mentioned.</li>
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
              <p>Customers can view their earned and available reward points in the "My Account" section.</p>
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
              <p>For queries regarding reward points, feel free to reach out to us:</p>
              <p>Email: <a href="mailto:support@vegenmart.com">support@vegenmart.com</a></p>
              <p>Phone: +91-911 894 0094</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundAndRewardsPolicy;
