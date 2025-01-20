import React, { useEffect, useState } from "react";
import ProductBox from "../ProductSection/ProductBox";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import Slider from "react-slick";

export const DetailsPageReleventProduct = ({ productId }) => {
  const [revelentProduct, setRevelentProduct] = useState([]);

  // Function to fetch relevant products
  async function fetchComboCategory() {
    try {
      const response = await axios.get(
        `${baseUrl}/simillar-product/${productId}`
      );
      const data = await response?.data;
      setRevelentProduct(data);
    } catch (e) {
      console.error("Relevant Product not found", e);
    }
  }

  useEffect(() => {
    fetchComboCategory();
  }, [productId]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  const settings = {
    dots: false, // Show pagination dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    arrows: true, // Enable arrows for navigation
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay interval to 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <h2 className="mt-2">Relevant Products</h2>
      <span className="title-leaf"></span>
      <div className="row mt-3">
        <Slider {...settings}>
          {revelentProduct?.map((product, index) => {
            // Parse the product_image JSON string to an array
            const images = JSON.parse(product.product_image);

            // Convert the array to an object
            const imageObject = images.reduce((obj, img, idx) => {
              obj[idx] = img;
              return obj;
            }, {});

            return (
              <div
                key={index}
                style={{ width: "200px" }}
                 className="w-75" // Trigger scroll to top when clicked
              >
                <div>
                <ProductBox
                  product_id={product.product_id}
                  imageSrc={imageObject} // Use the first image from the object
                  productName={product.product_name}
                  currentPrice={product.product_price}
                  weight={product.weight}
                  weight_type={product.weight_type}
                  minWeight={product.min_weight}
                  inStock={product.stock_type}
                  discount_price={product.discount_price}
                  compareLink={product.stock}
                  wishlistLink={product.stock}
                  offers={product.offers}
                  onImageClick={scrollToTop}
                />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};
