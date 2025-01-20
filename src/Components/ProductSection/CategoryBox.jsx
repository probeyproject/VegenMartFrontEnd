import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../API/Api';

// Sample ProductBox component
const ProductBox = ({ imageSrc, productName}) => (
  <Link to='/filter' className="category-box category-dark">
    <div>
      <img src={imageSrc} className="blur-up lazyloaded" alt={productName} style={{aspectRatio: "1:1"}}/>
      <h5>{productName}</h5>
    </div>
  </Link>
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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {data.map((product, index) => (
        <div key={index} className="slick-slide">
          <ProductBox
             // Update these keys based on your data structure
            imageSrc={product.category_url}
            productName={product.category_name}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CategoryBox;
