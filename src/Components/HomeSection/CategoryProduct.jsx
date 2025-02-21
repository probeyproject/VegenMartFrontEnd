import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import ProductBox from "../ProductSection/ProductBox"; // Use your existing ProductBox component
import "./CategoryProductCarousel.css"; // Add CSS for styling
import { Link } from "react-router-dom";
import CategoryBox from "../ProductSection/CategoryBox";

const CategoryProduct = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Number of products to show initially

  // Fetch products for the given category
  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/getProductByCategoryName/${categoryId}`
      );
      const fetchedProducts = response.data;
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryId]);

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6); // Increase the number of visible products
  };

  return (
    <div className="category-product-grid ">
      <div className="title me-1 p-3">
        <h2 className="mt-3">{categoryId}</h2>
        <span className="title-leaf"> </span>
        <p className="fw-bold">All Time Top Seller of The Week</p>
      </div>
      <div className="product-grid p-1">
        {products.slice(0, visibleProducts).map((product) => (
          <div key={product.product_id} className="product_view">
            <ProductBox
              style={{ height: "250px" }}
              imageSrc={JSON.parse(product.product_image || '""')}
              productName={product.product_name}
              currentPrice={product.product_price}
              product_id={product.product_id}
              inStock={product.stock}
              productDetails={product.product_details}
              productType={product.product_type}
              brand_name={product.brand_name}
              sku={product.sku}
              weight={product.weight}
              weight_type={product.weight_type}
              min_weight={product.min_weight}
              discount_price={product.discount_price}
              average_rating={product.average_rating}
              offers={product.offers}
              discountRanges={product.discountRanges}
            />
          </div>
        ))}
      </div>
      {/* Show "View More" button if there are more products to display */}
      {products.length > visibleProducts && (
        <div className="view-more-button d-flex justify-content-center mt-1">
          <Link
            to={`/pannelpage/${categoryId}`}
            className="btn btn-animation mb-2 "
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
