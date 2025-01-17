import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import "./CategoryBox.css"; // Add a CSS file for custom styles
import CategoryProductCarousel from "../HomeSection/CategoryProductCarousel";

// Sample ProductBox component
const ProductBox = ({ imageSrc, productName }) => (
  <div className="category-box ">
    <img
      src={imageSrc}
      style={{height:"100px", width:"100px", borderRadius:'5px'}}
      className="blur-up lazyloaded product-image"
      alt={productName}
    />
    <h5 className="product-name">{productName}</h5>
  </div>
);

const CategoryBox = () => {
  const [data, setData] = useState([]);

  async function fetchAllCategory() {
    try {
      const response = await axios.get(`${baseUrl}/getAllCategories`);
      const fetchedData = await response.data;
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  }

  useEffect(() => {
    fetchAllCategory();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for large screens
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767, // Mobile screens
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="category-slider-container">
        <Slider {...settings}>
          {data.map((product, index) => (
            <Link to={"/filter"} key={index} className="slick-slide">
              <ProductBox
                imageSrc={product.category_url}
                productName={product.category_name}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CategoryBox;
