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

  const [comboList, setComboList] = useState();
  const [visibleCount, setVisibleCount] = useState(2); // Initially show 4 combos

  const showMoreCombos = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Show 4 more on each click
  };

  console.log(combos);

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

  useEffect(() => {
    if (!combos || combos.length === 0) return; // Prevent unnecessary API calls

    const fetchComboDetails = async () => {
      try {
        const responses = await Promise.all(
          combos.map((combo) =>
            axios.get(`${baseUrl}/getCombo/${combo.combo_id}`)
          )
        );

        // Extract structured data
        const comboData = responses.map((res) => res.data);

        setComboList(comboData);
      } catch (error) {
        console.error("Error fetching combo details:", error);
      }
    };

    fetchComboDetails();
  }, [combos]);

  console.log(comboList);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCombo(null);
    setSelectedProducts([]);
  };
  const createCart = async (id, price, weight, weight_type) => {
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
        combo_id: id,
        totalPrice: price,
        weight: 1,
        weight_type: weight_type,
        quantity: "1",
        final_price: price,
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
  const handleClickCart = (e, a, id, price, weight, weight_type) => {
    // console.log(a);
    if (!authenticated) {
      // If the user is not authenticated, call handleAuth
      handleAuth(e, a); // Pass event (e) and the argument (a)
    } else {
      // If the user is authenticated, call createCart
      createCart(id, price, weight, weight_type); // Call createCart directly
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
    speed: 100,
    autoPlay: false,
    slidesToShow: 2,
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
    <div className="">
      <div className="container">
        <div className="row">
          {comboList?.slice(0, visibleCount).map((combo) => {
            let totalPrice = combo.products.reduce(
              (sum, product) =>
                sum + Number(product.product_price) * product.quantity,
              0
            );

            const discountedPrice = combo.price;

            return (
              <div
                className="col-12 col-md-6 mb-4"
                key={combo.combo_id}
                data-aos="fade-up"
              >
                <div className="card bg-light p-3 combo-card">
                  {/* Product Images Grid (3x2) */}
                  <div className="row g-1">
                    {combo.products.slice(0, 6).map((product, index) => {
                      let productImages = [];
                      try {
                        productImages = product.product_image
                          ? JSON.parse(product.product_image)
                          : ["default-image.jpg"];
                      } catch (error) {
                        console.error("Error parsing product images:", error);
                        productImages = ["default-image.jpg"];
                      }

                      return (
                        <div
                          key={index}
                          className="col-4 d-flex flex-column align-items-center"
                        >
                          <img
                            src={productImages[0]}
                            className="card-img-top rounded"
                            style={{
                              height: "70px",
                              width: "85px",
                              objectFit: "cover",
                            }}
                            alt={product.product_name}
                          />
                          <p
                            style={{
                              fontSize: "12px",
                              width: "70px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              margin: 0,
                            }}
                          >
                            {product.product_name.length > 12
                              ? product.product_name.slice(0, 12) + "..."
                              : product.product_name}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              width: "70px",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {product.quantity} {product.quantity_type}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Combo details */}
                  <div className="mt-3">
                    <h5 className="card-title fs-6 text-truncate text-capitalize mb-0">
                      {combo.title || `Combo ${combo.combo_id}`}
                    </h5>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    {discountedPrice && discountedPrice < totalPrice && (
                      <p className="fw-bold text-start mb-0">
                        ₹{discountedPrice.toFixed(2)}
                      </p>
                    )}
                    <p className="text-start mb-0 text-decoration-line-through">
                      ₹{totalPrice.toFixed(2)}
                    </p>

                    {discountedPrice && discountedPrice < totalPrice && (
                      <p className="text-muted mb-0 text-danger">
                        {(
                          ((totalPrice - discountedPrice) / totalPrice) *
                          100
                        ).toFixed(0)}
                        % OFF
                      </p>
                    )}
                  </div>

                  {/* Add to cart button */}
                  <button
                    className="btn btn-animation w-100 mt-2"
                    onClick={(e, a) =>
                      handleClickCart(
                        e,
                        a,
                        combo.combo_id,
                        discountedPrice || totalPrice,
                        combo.weight,
                        combo.weight_type
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {visibleCount < comboList?.length && (
          <div className="text-center mt-3 d-flex justify-content-center">
            <button className="btn btn-animation" onClick={showMoreCombos}>
              View More
            </button>
          </div>
        )}
      </div>

      {selectedCombo && (
        <div
          className={`modal fade  ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog  ">
            <div className="modal-content   ">
              <div className="modal-header">
                <p className="modal-title text-capitalize ">
                  {ComboData.title}
                </p>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="modal-body">
                {/* combo cards prodcut */}
                <div className="">
                  {" "}
                  <p className="text-muted font-bold text-capitalize">
                    {ComboData.description}
                  </p>
                </div>
                <div className="combo_cantainer ">
                  {productDetails.map((productArray, index) => {
                    console.log(productArray);

                    const product = productArray;
                    if (!product) return null;

                    const productImages = safeParseJson(product.product_image);

                    return (
                      <div className="combo_card " key={index}>
                        <Link
                          to={`/detail_page/${product.product_id}`}
                          className="card  "
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
                          <div className="card-body  ">
                            <p className="card-title_">
                              {product.product_name}
                            </p>
                            <p className="combo_price">
                              <strong className="combo_price">
                                Price: ₹{product.product_price}
                              </strong>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <div className=" card_info ">
                  <button
                    type="button"
                    className="combo_button"
                    onClick={handleClickCart}
                  >
                    Buy Combo
                  </button>
                  <div className="but_btn d-flex justify-content-center my-3">
                    <p className="">
                      <strong
                        style={{
                          fontSize: "17px",
                          color: "rgb(233, 103, 125)",
                        }}
                        className="combo_pricedet_"
                      >
                        Price: ₹{ComboData.price}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="combo_button "
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
