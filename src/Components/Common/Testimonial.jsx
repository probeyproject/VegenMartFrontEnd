import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { baseUrl } from "../../API/Api";

function Testimonial() {
  const [testimonial, setTestimonisal] = useState([]);

  const getTestimonials = async () => {
    const response = await axios.get(
      `${baseUrl}/getAllTestimonials`
    );
    const data = await response.data;
    setTestimonisal(data);
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // For tablets and larger devices (breakpoint for tablets)
        settings: {
          slidesToShow: 2, // Show 2 slides on tablet
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600, // For mobile devices (breakpoint for mobile)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          slidesToScroll: 1,
          initialSlide: 0, // Start from the first slide
        },
      },
    ],
  };
  
  return (
    <section className="review-section section-lg-space">
      <div className="container-fluid p-md-0 p-3">
        <div className="about-us-title text-center">
          <h4 className="text-content">Latest Testimonial</h4>
          <h2 className="center">What people say</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="slider-4-half product-wrapper slick-initialized slick-slider slick-dotted">
              <div className="slick-list draggable">
                <Slider {...settings}>
                  {testimonial.map((data) => {
                    return (
                      <div className="reviewer-box">
                        <i className="fa-solid fa-quote-right" />
                        <div className="product-rating">
                          <ul className="rating">
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star fill"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star fill"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star fill"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star fill"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </li>
                            <li>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-star"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </li>
                          </ul>
                        </div>
                        <h3>{data.title}</h3>
                        <p>
                          "{data.message}"
                        </p>
                        <div className="reviewer-profile">
                          <div className="reviewer-image">
                            <img
                              src={data.testimonial_pic}
                              className="blur-up lazyloaded"
                              alt="Image"
                            />
                          </div>
                          <div className="reviewer-name">
                            <h4>{data.name}</h4>
                            <h6>{data.city}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
