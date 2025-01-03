import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import image1 from "../../assets/images/cake/bg.jpg"; // Replace with actual images
import axios from "axios";
// Add your third image

const testimonialsData = [
  {
    img: image1,
    text: "Doccure exceeded my expectations in healthcare. The seamless booking process, coupled with the expertise of the doctors, made my experience exceptional. Their commitment to quality care and convenience truly sets them apart. I highly recommend Doccure for anyone seeking reliable and accessible healthcare services.",
    name: "John Doe",
    location: "New York",
  },
  {
    img: image1,
    text: "My experience with Doccure has been fantastic! The doctors are highly professional and the care I received was top-notch. I appreciate the attention to detail and the seamless experience from start to finish.",
    name: "Jane Smith",
    location: "Los Angeles",
  },
  {
    img: image1,
    text: "I was impressed by the efficiency and friendliness of the staff at Doccure. The online booking made it so easy, and I felt well taken care of during my visit. Definitely a 5-star experience!",
    name: "Emily Johnson",
    location: "Chicago",
  },
  {
    img: image1, // Reuse for demonstration, replace with actual images
    text: "The quality of care I received was beyond my expectations. I felt valued as a patient, and the follow-up after my appointment was greatly appreciated. Highly recommend!",
    name: "Michael Brown",
    location: "Miami",
  },
  {
    img: image1, // Reuse for demonstration, replace with actual images
    text: "I’ve been a patient at Doccure for a while now, and I couldn’t be happier. The staff is always friendly, and the service is prompt. It's comforting to know I have reliable healthcare.",
    name: "Sarah Davis",
    location: "Dallas",
  },
];

const Testimonials = () => {
  



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section className="testimonial-section py-5 mb-4">
      <div className="container">
        <div className="container">
          <h5 className="theme-color text-center mb-2">Testimonials</h5>
          <h2 className="text-center mb-4">What Our Clients Say</h2>
          <Slider {...settings} className="testimonial-slider">
            {testimonial.map((testimonial, index) => (
              <div
                key={index}
                className="row d-flex align-items-center mx-auto"
              >
                <div className="testimonial-img  col-md-3 d-flex justify-content-center mb-2 mb-md-0">
                  <img
                    src={testimonial.testimonial_pic}
                    className="img-fluid rounded-circle"
                    alt={testimonial.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="testimonial-content col-md-8">
                  <p className="testimonial-details text-wrap text-md-start text-center ">
                    {testimonial.message}
                  </p>
                  <h6 className="mt-1 text-md-start text-center ">
                    <strong className="">{testimonial.name}</strong>
                    <br />
                    {testimonial.location}
                  </h6>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
