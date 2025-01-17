import React from "react";
import BlogBox from "./BlogBox";
import Slider from "react-slick";
import HeaderTop from "../Header/HeaderTop";
import HeaderMiddle from "../Header/HeaderMiddle";
import HeaderBottom from "../Header/HeaderBottom";
import Footer from "../Common/Footer";
import NewsLetter from "../Common/NewsLetter";

function BlogSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // For tablets and larger devices (breakpoint for tablets)
        settings: {
          slidesToShow: 3, // Show 2 slides on tablet
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600, // For mobile devices (breakpoint for mobile)
        settings: {
          slidesToShow: 2, // Show 1 slide on mobile
          slidesToScroll: 1,
          initialSlide: 0, // Start from the first slide
        },
      },
    ],
  };
  return (
    <>
      <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <div className="container card bg-light p-3 mb-3">
        <div className="title">
          <h2>Featured Blog</h2>
          <span className="title-leaf"></span>
          <p>A virtual assistant collects the products from your list</p>
        </div>
        <Slider {...settings}>
          {Array(8)
            .fill()
            .map((_, index) => {
              return (
                <div key={index} className="">
                  <BlogBox
                    imageUrl="https://media.istockphoto.com/id/174429248/photo/fresh-vegetables.jpg?s=612x612&w=0&k=20&c=fxlgOIET7gKa8M3rwkV974aUfB0gVpWiJQwUoxA4dtQ="
                    blogLink="#"
                    date="20 March, 2022"
                    title="Fresh Vegetable Online"
                  />
                </div>
              );
            })}
        </Slider>
        </div>
        <NewsLetter/>
        <Footer/>
      </div>
    </>
  );
}

export default BlogSection;
