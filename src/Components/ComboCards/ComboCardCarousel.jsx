import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ComboCard.css"; // Custom CSS for enhanced styling
import LoginModal from "../Common/LoginModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
export default function ComboCardCarousel() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [ComboData, setComboData] = useState({});

  const [inputweight, setInputWeight] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [weight_type, setWeight_type] = useState("");
  const [weightType, setWeightType] = useState(weight_type || "Kg");
  const [loginModal, setLoginModal] = useState(false);
  const authenticated = useSelector((state) => state?.user?.authenticated);
  const userState = useSelector((state) => state?.user?.user);
  const userId = userState?.id;
  const userStates = useSelector((state) => state?.user);
  const cart = userStates?.cart;

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
    AOS.init({
      duration: 500, // Duration of the animation in milliseconds
      easing: "ease-in-out", // Type of easing for the animation
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
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

  const handleComboClick = (id) => {
    const getParentCombo = async (id) => {
      try {
        const res = await axios.get(`${baseUrl}/getparentCombo/${id}`);
        setComboData(res?.data[0]);
        setInputWeight(res?.data[0]?.Gross_weight);
        setWeightType(res?.data[0]?.Gross_weight_type);
      } catch (error) {
        console.log(error);
      }
    };
    getParentCombo(id);
    axios
      .get(`${baseUrl}/getCombo/${id}`)
      .then((response) => {
        // Save the combo details
        setSelectedCombo(response.data);

        // Map through the response data to get product details and call the next API for each product
        const productRequests = response.data.map((comboItem) => {
          return axios.get(`${baseUrl}/getProductById/${comboItem.product_id}`);
        });

        // Wait for all the API calls to resolve
        Promise.all(productRequests)
          .then((results) => {
            const productDetails = results.map((res) => res.data);
            const flattenedProductDetails = productDetails.flat();

            flattenedProductDetails.forEach((detail) => {
              // console.log(detail);
              setProductDetails(flattenedProductDetails);
            });

            // console.log(productDetails);

            setShowModal(true);
          })
          .catch((error) => {
            console.error("Error fetching additional product details:", error);
            setError("Failed to fetch additional product details");
          });

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
  const createCart = async () => {
    const numericWeight = parseFloat(inputweight);

    // Check if inputWeight is valid based on weightType
    // if (
    //   (weightType === "Kg" && (isNaN(numericWeight) || numericWeight < 0.9)) ||
    //   (weightType === "g" && (isNaN(numericWeight) || numericWeight < 0.25)) ||
    //   (weightType === "pieces" && (isNaN(numericWeight) || numericWeight < 5))
    // ) {
    //   toast.warning(`Please enter a valid input for ${weightType}.`);
    //   return;
    // }

    // let unitTypeToSend = weightType;

    // if (weightType === "g") {
    //   unitTypeToSend = "Kg"; // Change unitType to kg
    // }

    try {
      const response = await axios.post(`${baseUrl}/create/cart/${userId}`, {
        // productId: id,
        combo_id: ComboData?.combo_id,
        totalPrice: ComboData?.price,
        weight: inputweight,
        weight_type: weightType,
        quantity: "1",
        final_price: ComboData?.price,
      });

      toast.success("Your product add to cart successfully");
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  const toggleLoginModal = () => setLoginModal(!loginModal);

  const handleAuth = (e, a) => {
    e.preventDefault();

    // Correctly prevent the default action

    if (authenticated) {
      navigate(a); // Navigate if authenticated
    } else {
      toggleLoginModal(); // Open login modal if not authenticated
    }
  };

  ``;
  const handleClickCart = (e, a) => {
    // console.log(a);
    if (!authenticated) {
      // If the user is not authenticated, call handleAuth
      handleAuth(e, a); // Pass event (e) and the argument (a)
    } else {
      // If the user is authenticated, call createCart
      createCart(); // Call createCart directly
    }
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
    speed: 5000,
    autoPlay: true,
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
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="p-2">
      <Slider {...sliderSettings}>
        {combos.map((combo) => {
          // const productImages = safeParseJson(combo.product_image);

          return (
            <div
              className="card combo-card"
              key={combo.id}
              onClick={() =>
                handleComboClick(
                  combo.combo_id,
                  safeParseJson(combo.product_id)
                )
              }
              data-aos="fade-up"
            >
              {/* {console.log(combo)} */}
              <img
                src={JSON.parse(combo.product_image)}
                className="card-img-top rounded-top"
                alt={combo.title}
              />{" "}
              {/* {console.log(combo)} */}
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
                <span>
                  {/* {inputweight}
                  {weightType} */}
                </span>
                <h5 className="modal-title">{ComboData.title}</h5>
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
                <p>{ComboData.description}</p>

                <div className="but_btn d-flex justify-content-end mb-3">
                  <p className="fw-bold text-danger">
                    <strong style={{ fontSize: "20px" }}>
                      Price: ₹{ComboData.price}
                    </strong>
                  </p>
                </div>
                <div className="row">
                  {productDetails.map((productArray, index) => {
                    // console.log(productArray);

                    const product = productArray;
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
                              <strong>
                                Item Price: ₹{product.product_price}
                              </strong>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-animation"
                    onClick={handleClickCart}
                  >
                    Buy Combo
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-animation btn-sm "
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <LoginModal isOpen={loginModal} toggle={toggleLoginModal} />
    </div>
  );
}
