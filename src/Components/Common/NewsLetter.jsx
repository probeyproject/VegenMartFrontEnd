import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../API/Api";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${baseUrl}/create/newsEmail`, { email });
      toast.success("Email successfully subscribed");
    } catch (err) {
      toast.error("This email is already subscribed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <section className="newsletter-section" data-aos="fade-up">
      <div className="container">
        <div
          className="newsletter-box p-4 rounded text-white"
          style={{
            background:
              "url('https://themes.pixelstrap.com/fastkart/assets/images/vegetable/newsletter/1.jpg') center/cover",
            minHeight: "200px", // Increase height here
            display: "flex",
            alignItems: "center", // Center content vertically
          }}
        >
          <div className="row align-items-center w-100">
            {/* Text Section */}
            <div className="col-lg-6 text-center text-lg-start">
              <h2 className="fw-bold text-light">
                Join the Vegenmart Newsletter!
              </h2>
              <h6 className="text-warning fw-bold mt-2">
                Stay updated on the freshest ozone-washed fruits and vegetables.
              </h6>
            </div>

            {/* Input Box */}
            <div className="col-lg-6 mt-3 mt-lg-0">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control border-0 shadow-sm"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-animation px-4 fw-bold"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
