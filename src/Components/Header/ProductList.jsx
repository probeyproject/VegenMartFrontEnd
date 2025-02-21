import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import Footer from "../Common/Footer";
import NoProduct from "../../assets/images/error.jpg";
import ProductBox from "../ProductSection/ProductBox";
import { baseUrl } from "../../API/Api";
import { BounceLoader } from "react-spinners";
import "./ProductList.css"; // Ensure your CSS is properly responsive

const ProductList = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }

    return () => {
      sessionStorage.removeItem("hasReloaded"); // Reset when leaving
    };
  }, []);

  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/search?q=${query}`);
        // const response = await axios.get(`${baseUrl}/getProductByCategoryName/${query}`);

        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="spinner-container-search-box">
        <BounceLoader color="#D22860" />
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header>
        <HeaderTop />
        <HeaderMiddle />
      </header>
      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="container">
              <h3 className="text-center text-md-start">
                Products related to "{query}"
              </h3>
              <div className="mt-4 text-center">
                {products?.length === 0 ? (
                  <div className="no-products p-3">
                    <div className="message text-center">
                      <h2>No Products Found</h2>
                      <p>
                        We're sorry, but there are no products available at this
                        time.
                      </p>
                    </div>
                    <div className="animation text-center">
                      <img
                        src={NoProduct}
                        alt="No products"
                        className="img-fluid"
                      />
                      <Link to="/" className="btn btn-primary mt-3">
                        Back
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="row g-3 g-md-4 g-lg-5 product-list-section">
                    {products?.products?.map((product, index) => (
                      <div
                        className="col-6 col-md-4 col-lg-3 col-xl-3 mb-4"
                        key={index}
                      >
                        <div className="product-card">
                          <ProductBox
                            productLink={JSON.parse(product.product_image)}
                            imageSrc={JSON.parse(product.product_image)}
                            productName={product.product_name}
                            currentPrice={product.product_price}
                            product_id={product.product_id}
                            inStock={product.stock}
                            productDetails={product.product_details}
                            productType={product.product_type}
                            brand={product.brand}
                            sku={product.sku}
                            weight={product.weight}
                            weight_type={product.weight_type}
                            discount_price={product.discount_price}
                            average_rating={product.average_rating}
                            discountRanges={product.discountRanges}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductList;
