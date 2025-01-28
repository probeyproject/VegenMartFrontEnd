import React, { useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../API/Api";

function BusinessInfo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    product_image: null, // Initialize productImage
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      product_image: e.target.files, // Save the selected files
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "product_image" && formData[key] instanceof FileList) {
        for (const file of formData[key]) {
          data.append("product_image", file); // Append each file
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${baseUrl}/createBusiness`, {
        method: "POST",
        body: data, // Do not set Content-Type manually
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      toast.success("Submission successful");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
        product_image: null, 
      });
        document.getElementById("formFile").value = ""
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <section className="breadcrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-contain">
                <h2>Business Info</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="fa-solid fa-house" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Business Info</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img
                  src="https://img.freepik.com/premium-vector/b2b-marketing-concept-vector-b2b-factory-corporate-buildings-shaking-their-hands_70921-1793.jpg?w=740"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3 className="text-center">Enter Your B2B Requirement</h3>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={handleSubmit}>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="firstName">
                          First Name<span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="form-floating theme-form-floating mt-4">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="lastName">
                          Last Name<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">
                          Email Address<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Phone no."
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="phone">
                          Phone no.<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Enter Your Address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="phone">
                          Address.<span className="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating">
                        <textarea
                          className="form-control"
                          id="message"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="4"
                        ></textarea>
                        <label htmlFor="message">
                          Message.
                        </label>
                      </div>
                    </div>
                    <div className="card mt-3">
                      <div className="card-body">
                        <div className="input-box">
                          <h6>
                            Images<span className="text-danger">*</span>
                          </h6>
                          <input
                            type="file"
                            id="formFile"
                            multiple
                            name="productImage"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-animation w-100"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6 col-lg-6" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BusinessInfo;
