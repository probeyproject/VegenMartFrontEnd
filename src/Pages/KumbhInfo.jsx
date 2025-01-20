import React, { useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../API/Api";

function KumbhInfo() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    objective : ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/create/kumb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success("Kumbh Info Submitted Successful");
      navigate("/")

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
                <h2>Kumbh Info</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="fa-solid fa-house" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Kumbh Info</li>
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
                  src="https://media.mahakumbh.in/media/2023/10/29183251/Ultimate-Guide-Maha-Kumbh.webp"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3 className="text-center">Welcome To Kumbh</h3>
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
                          id="middleName"
                          placeholder="Middle Name"
                          value={formData.middleName}
                          onChange={handleChange}
                        />
                        <label htmlFor="middleName">Middle Name</label>
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
                        <textarea
                          type="text"
                          className="form-control"
                          id="objective"
                          placeholder="enter your enquiry"
                          value={formData.objective}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="phone">
                          Objective.
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-animation w-100" type="submit" disabled={loading}>
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

export default KumbhInfo;
