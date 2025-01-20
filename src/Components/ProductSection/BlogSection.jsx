import React from "react";
import BlogBox from "./BlogBox";
import Slider from "react-slick";
import Index from "../../Pages/Index";

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
    <>
      <div class="title section-t-space">
        <h2>Featured Blog</h2>
        <span class="title-leaf">
        </span>
        <p>A virtual assistant collects the products from your list</p>
      </div>

      <Slider {...settings}>
        {
          Array(8).fill().map((_,index)=>{
            return(
              <BlogBox
          imageUrl="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/blog/3.jpg"
          blogLink="#"
          date="20 March, 2022"
          title="Fresh Vegetable Online"
        />
            )
          })
        }
      </Slider>
    </>
  );
}

export default BlogSection;
