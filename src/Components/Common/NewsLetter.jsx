import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from '../../API/Api'

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    // Prepare the data to send to the API
    const data = { email};

    try {
      // Make the API POST request using Axios
      const response = await axios.post(`${baseUrl}/create/newsEmail`, data);
      

      // Handle success response
      setSuccess(true);
      toast.success("Email Successfully subscribed")
    } catch (err) {
      // Handle error response
      console.error('Error:', err);
      toast.error("This Email already subscribed")
    } finally {
      // Set loading to false after API call finishes (success or error)
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 700, // Duration of the animation in milliseconds
      easing: "ease-in-out", // Type of easing for the animation
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);


  return (
    <section className="newsletter-section section-b-space" data-aos="fade-up">
      <div className="container-fluid-lg">
        <div
          className="newsletter-box newsletter-box-2"
          style={{
            background:
              "url('https://themes.pixelstrap.com/fastkart/assets/images/vegetable/newsletter/1.jpg')",
          }}
        >
          <div className="newsletter-contain py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xxl-4 col-lg-5 col-md-7 col-sm-9 offset-xxl-2 offset-md-1">
                  <div className="newsletter-detail">
                    <h2>Join our newsletter and get...</h2>
                    <h5>₹20 discount for your first order</h5>
                    <div className="input-box">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                      />
                      <i className="fa-solid fa-envelope arrow" />
                      <button
                        type="submit"
                        className="sub-btn btn-animation"
                        disabled={loading} // Disable the button while loading
                      >
                        {loading ? (
                          <i className="fa-solid fa-spinner fa-spin icon" /> // Loading spinner icon
                        ) : (
                          <>
                            <span className="d-sm-block d-none" onClick={handleSubmit}>Subscribe</span>
                            <i className="fa-solid fa-arrow-right icon" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
