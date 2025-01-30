import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import ProductBox from "../ProductSection/ProductBox"; // Use your existing ProductBox component
import "./CategoryProductCarousel.css"; // Add CSS for styling
import { Link, useNavigate } from "react-router-dom";
import CategoryBox from "../ProductSection/CategoryBox";
import Aos from "aos";
import("../../CSS/ProductSection.css");

const CategoryProductCarousel = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Number of products to show initially
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // selected
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();

  const fetchProductByCategory = async (categoryId) => {
    // selected
    try {
      const response = await axios.get(
        `${baseUrl}/getProductByCategoryName/${categoryId}`
      );
      const fetchedProducts = response.data;
      console.log(fetchedProducts);

      // After fetching, sort the products based on the selected sorting option
      // applySorting(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProductByCategory(categoryId);
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getAllCategories`);
        // console.log(res?.data);
        setCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategory();
  }, []);

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

  useEffect(() => {
    Aos.init({
      duration: 2500,
      offset: 100,
      easing: "ease-in-out",
      // once: true,
    });
  }, []);

  // Show only the first 8 categories
  const visibleCategories = categories.slice(0, 8);

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6); // Increase the number of visible products
  };

  return (
    <div className="category-product-grid">
      <div className="new_order3 p- bg-white">
        <div className="title">
          <h2 className="" style={{color:"#1C1C1C"}}>Browse by Categories</h2>
          <span className="title-leaf"></span>
          <p className="fw-bold">Top Categories Of The Week</p>
        </div>

        <div
          className="category-slider-2 product-wrapper no-arrow slick-initialized slick-slider slick-dotted mb-4 "
          data-aos="fade-right"
        >
          <div className="row p-3">
            {/* Render visible categories */}
            {visibleCategories.map((category) => (
              <div
                className="col-3 card border-0 mx-1 ms-3 rounded-2 shadow-none mb-1 p-2" 
                key={category.category_id}
                data-aos="zoom-in"
                style={{width:"90px", background:"rgb(254, 241, 247)"}}
              >
                <Link
                  to={`/filters/${category.category_name}`}
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "black",
                    backgroundColor:
                      selectedCategory === category.category_id
                        ? "#ebd7e0"
                        : "",
                  }}
                  className="category-card d-flex flex-column align-items-center py-1"
                >
                  <img
                    src={category.category_url}
                    className="img-fluid rounded-1 mb-2"
                    alt="loading.."
                    style={{
                      height: "65px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <p className="mb-0 text-muted text-center fw-semibold" style={{ fontSize: "13px",color:"#1C1C1C" }}>
                    {category.category_name}
                  </p>
                </Link>
              </div>
            ))}

            {/* "View More" card that redirects to /filters */}
            {categories.length > 7 && (
              <div className="col-3 card border-0  mx-2 rounded-0 shadow-none mb-1">
                <div
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "black",
                    width:"80px"
                  }}
                  className="category-card d-flex flex-column align-items-center p-2"
                  onClick={() => navigate("/filter")}
                >
                  <div
                    className="rounded-circle mb-2"
                    style={{

                      height: "50px",
                      width: "50px",
                      backgroundColor: "#D22860",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      color:"white",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </div>
                  <p className="mb-0 fw-semibold text-muted mt-2 text-" style={{ fontSize: "12px", color:"#1C1C1C" }}>
                    View More
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="title me-1 p-3">
        <h2 className="mt-3" style={{color:"#1C1C1C"}}>{categoryId}</h2>
        <span className="title-leaf"> </span>
        <p className="fw-bold" >All Time Top Veggies Of The Week</p>
      </div>
      <div className="product-grid p-2">
        {products.slice(0, visibleProducts).map((product) => (
          <div
            key={product.product_id}
            className="product_view"
            data-aos="zoom-in-down"
          >
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
            />
          </div>
        ))}
      </div>
      {/* Show "View More" button if there are more products to display */}
      {products.length > visibleProducts && (
        <div className="view-more-button d-flex justify-content-center mt-3">
          <Link
            to={`/filters/${categoryId}`}
            className="btn btn-animation mb-3 "
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryProductCarousel;
