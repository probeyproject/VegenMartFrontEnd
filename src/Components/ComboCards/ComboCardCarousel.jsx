import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ComboCard.css"; // Custom CSS for enhanced styling

export default function ComboCardCarousel() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/getAllCombos`)
      .then((response) => {
        setCombos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const safeParseJson = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  };

  const handleComboClick = (id, productIds) => {
    axios
      .get(`${baseUrl}/getCombo/${id}`)
      .then((response) => {
        setSelectedCombo(response.data);
        fetchProductDetails(productIds);
        setShowModal(true);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch combo details");
      });
  };

  const fetchProductDetails = (productIds) => {
    const productPromises = productIds.map((id) =>
      axios.get(`${baseUrl}/getProductById/${id}`)
    );

    Promise.all(productPromises)
      .then((responses) => {
        const productData = responses.map((response) => response.data);
        setSelectedProducts(productData);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch product details");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCombo(null);
    setSelectedProducts([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <Slider {...sliderSettings}>
        {combos.map((combo) => {
          const productImages = safeParseJson(combo.product_image);

          return (
            <div
              className="card combo-card shadow-sm"
              key={combo.id}
              onClick={() =>
                handleComboClick(combo.id, safeParseJson(combo.product_id))
              }
            >
              <img
                src={
                  productImages.length > 0
                    ? productImages[0]
                    : "default-image.jpg"
                }
                className="card-img-top rounded-top"
                alt={combo.title}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-truncate">{combo.title}</h5>
                <p className="card-text text-muted small">
                  {combo.description}
                </p>
                <p className="fw-bold">Price: ₹{combo.price}</p>
                <button className="btn btn-animation w-100 mt-2">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </Slider>

      {selectedCombo && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCombo.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* <img
                  src={
                    selectedCombo.product_image === "0"
                      ? "default-image.jpg"
                      : safeParseJson(selectedCombo.product_image)[0]
                  }
                  alt={selectedCombo.title}
                /> */}
                <p>{selectedCombo.description}</p>
                
                <div className="but_btn d-flex justify-content-between mb-3">
                <p className="fw-bold text-danger ms-4">
                  <strong>Price: ₹{selectedCombo.price}</strong>
                </p>
                  <button
                    type="button"
                    className="btn btn-animation"
                    // onClick={handleOrderCombo}
                  >
                    Buy Combo
                  </button>
                </div>
                <div className="row">
                  {selectedProducts.map((productArray, index) => {
                    const product = productArray[0];
                    if (!product) return null;

                    const productImages = safeParseJson(product.product_image);

                    return (
                      <div
                        className="col-lg-3 col-md-4 col-sm-6 mb-3"
                        key={index}
                      >
                        <Link
                          to={`/detail_page/${product.product_id}`}
                          className="card"
                        >
                          <img
                            src={
                              productImages.length > 0
                                ? productImages[0]
                                : "default-image.jpg"
                            }
                            className="card-img-top"
                            alt={product.product_name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {product.product_name}
                            </h5>
                            <p>
                              <strong>Price: ₹{product.product_price}</strong>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer ">
                <button
                  type="button"
                  className="btn btn-danger btn-md"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
