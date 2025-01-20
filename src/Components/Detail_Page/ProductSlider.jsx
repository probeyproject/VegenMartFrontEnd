import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const ProductSlider = ({ imgSrc }) => {
  const sliderRef = useRef(null);
  const sliderNavRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide index

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNavRef.current,
    afterChange: (current) => setCurrentSlide(current), // Update the current slide index
  };

  const settingsNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: sliderRef.current,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
  };

  return (
    <div className="col-xxl-10 col-lg-12 col-md-10 order-xxl-2 order-lg-1 order-md-2">
      {imgSrc.length === 1 ? (
        <div className="single-image-container">
          <img
            src={imgSrc[0]}
            alt="Single Slide"
            className="img-fluid image_zoom_cls-0 blur-up lazyloaded"
          />
        </div>
      ) : (
        <>
          {/* Main Slider */}
          <div className='slider-for'>
            <Slider ref={sliderRef} {...settingsMain}>
              {imgSrc.map((image, index) => (
                <div key={index} className="slider-image">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="img-fluid image_zoom_cls-0 blur-up lazyloaded"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Navigation Slider */}
          <div className='slider-nav'>
            <Slider ref={sliderNavRef} {...settingsNav}>
              {imgSrc.map((image, index) => (
                <div key={index} className={`slider-image ${currentSlide === index ? 'blur-pagination-active' : 'blur-pagination-noactive'}`}>
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-fluid image_zoom_cls-0 blur-up lazyloaded"
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSlider;
