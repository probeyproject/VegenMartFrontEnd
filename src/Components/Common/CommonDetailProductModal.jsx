import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, ModalBody, Button } from "reactstrap";
import { baseUrl } from "../../API/Api";
import LoginModal from "./LoginModal";
import 'bootstrap/dist/css/bootstrap.min.css';

const CommonDetailProductModal = ({
  show,
  handleClose,
  productDetail,
  image,
  inStock,
  product_id,
  oldPrice,
  currentPrice,
  productName,
  productType,
  brand_name,
  sku,
  weight,
  weight_type,
  average_rating,
  defaultWeight,
  defaultWeightType,
  discount_price,
}) => {

  
  // const [weights, setWeights] = useState([]);
  const [weightType, setWeightType] = useState(weight_type || "kg");
  const [inputweight, setInputWeight] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [modal, setModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [responseWeight, setResponseWeight] = useState("");
  
  const authenticated = useSelector((state) => state?.user?.authenticated)
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;

  const toggle = () => setModal(!modal)

  const toggleLoginModal = () => setLoginModal(!loginModal)

  const handleChange = (e) => {
    const value = e.target.value;
    setInputWeight(value);

    // Check if the input value is empty or null
    if (!value) {
      setWarningMsg(""); // Clear the warning message if the input is empty
      return; // Exit the function early
    }

    // Proceed with checking the weightType only if value is not empty
    if (weightType === "kg") {
      if (Number(value) < 1 || Number(value) > 15) {
        setWarningMsg("Enter 1 to 15 Kg");
      } else {
        setWarningMsg(""); // Clear the warning if the condition is met
      }
    } else if (weightType === "pieces") {
      if (Number(value) < 5) {
        setWarningMsg("Enter 5 pieces or above.");
      } else if (Number(value) > 30) {
        setWarningMsg("Maximum 30 pieces allowed.");
      } else {
        setWarningMsg(""); // Clear the warning if the condition is met
      }
    } else {
      setWarningMsg(""); // Clear the warning if weightType is not recognized or is other than "kg" or "pieces"
    }
  };

  const numericWeight = Number(inputweight);

  // Optional: If weight_type can change dynamically, update weightType accordingly
  useEffect(() => {
    setWeightType(weight_type || "kg"); // Update weightType if weight_type changes
  }, [weight_type]);

  useEffect(() => {
    // Convert inputweight to a number

    if (numericWeight && weightType) {
      // Check weight conditions based on weight type
      if (
        (weightType === "kg" && numericWeight >= 1) ||
        (weightType === "pieces" && numericWeight >= 5) ||
        weightType === "gram"
      ) {
        calculatePrice(numericWeight); // Call the API only if valid
      }
    }
  }, [inputweight, weightType]);

  const calculatePrice = async (numericWeight) => {
    try {
      let unitTypeToSend = weightType;

      // Change unitType to kg if it's grams
      if (weightType === "gram") {
        unitTypeToSend = "kg"; // Change unitType to kg
      }

      const response = await axios.post(
        `${baseUrl}/calculate-price/${product_id}`,
        {
          weight: numericWeight, // Use the already calculated weight
          unitType: unitTypeToSend, // Send kg if it was grams
        }
      );

      setFinalPrice(response.data.final_price);
      setResponseWeight(response.data.weight);
    } catch (error) {
      console.error("Error:", error);
      
    }
  };


  useEffect(() => {
    if (inputweight === "") {
      setFinalPrice("");
    }
  }, [inputweight, setFinalPrice]);

  const handleAuth = (e, a) => {
    e.preventDefault()

    // Correctly prevent the default action

    if (authenticated) {
      navigate(a) // Navigate if authenticated
    } else {
      toggleLoginModal() // Open login modal if not authenticated
    }
  }

  const handleClick = (e, a) => {
    if (!authenticated) {
      // If the user is not authenticated, call handleAuth
      handleAuth(e, a); // Pass event (e) and the argument (a)
    } else {
      // If the user is authenticated, call createCart
      createCart(); // Call createCart directly
    }
  };

  const createCart = async () => {
    const numericWeight = parseFloat(inputweight);

    // Check if inputWeight is valid based on weightType
    if (
      (weightType === "kg" && (isNaN(numericWeight) || numericWeight < 0.01)) ||
      (weightType === "gram" &&
        (isNaN(numericWeight) || numericWeight < 0.05)) ||
      (weightType === "pieces" && (isNaN(numericWeight) || numericWeight < 5))
    ) {
      toast.warning(`Please enter a valid input for ${weightType}.`);
      return;
    }

    let unitTypeToSend = weightType;

    if (weightType === "gram") {
      unitTypeToSend = "kg"; // Change unitType to kg
    }

    try {
      const response = await axios.post(
        `${baseUrl}/create/cart/${userId}`,
        {
          productId: product_id,
          totalPrice: finalPrice,
          weight: responseWeight,
          weight_type: unitTypeToSend,
        }
      );

      
      toast.success("Your product add to cart successfully");
    } catch (error) {
      console.error("Error creating cart:", error);
      toast.error("Error creating cart. Please try again.");
    }
  };

 return (
    show && (
      <div
        className="modal-overlay d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1050,
        }}
      >
        <div
          className="card modal-content-container p-3"
          style={{
            width: "90%",
            maxWidth: "700px",
            backgroundColor: "#fff",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            className="btn-close position-absolute"
            style={{ top: "10px", right: "10px", cursor: "pointer" }}
            onClick={handleClose}
          ></button>

          <div className="row g-4">
            {/* Image Section */}
            <div className="col-md-6 text-center">
              <div className="slider-image">
                <img
                  src={image[0]}
                  className="img-fluid rounded shadow p-2"
                  alt={productName}
                  style={{ width: "100%", maxHeight: "250px", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h5 className="text-danger mb-2">
                {Math.round(((discount_price - currentPrice) / discount_price) * 100) || 0}% off
              </h5>
              <h5 className="fw-bold">{productName}</h5>
              <h5 className="theme-color price p-2">
                ₹{currentPrice}/{weight_type}{" "}
                <del className="text-muted">₹{discount_price}</del>
              </h5>

              {/* Rating */}
              <div className="product-rating mb-3 d-flex align-items-center">
                <ul className="rating list-unstyled d-flex mb-0">
                  {[...Array(5)].map((_, index) => (
                    <li key={index} className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={index < 4 ? "gold" : "none"}
                        stroke="gold"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                  ))}
                </ul>
                <span className="ms-2 small">8 Reviews</span>
              </div>

              <hr />

              {/* Product Details */}
              {/* <h6 className="fw-bold">Product Details:</h6>
              <p className="small text-muted">{productDetail}</p> */}

              {/* <div className="container mt-3">
                <ul className="list-unstyled d-flex flex-column">
                  <li><strong>Brand:</strong> {brand_name}</li>
                  <li><strong>SKU Code:</strong> {sku}</li>
                  <li><strong>Product Type:</strong> {productType}</li>
                </ul>
              </div> */}

             

              {/* Weight Selection */}
              <div className="d-flex justify-content-evenly">
                              <div>
                                <select
                                  id="units"
                                  className="border-1 rounded-2 p-1"
                                  onChange={(e) => {
                                    setWeightType(e.target.value);
                                    setInputWeight(""); // Clear input when weight type changes
                                  }}
                                  value={weightType} // Control the select with state
                                >
                                  {weight_type === "pieces" && (
                                    <option value="pieces">Pieces</option>
                                  )}
                                 {weight_type === "pieces" && (
                                              <option value="pieces">Pieces</option>
                                            )}
                                            {(weight_type === "kg" ||
                                              weight_type === "gram") && (
                                              <>
                                                <option value="kg">Kg</option>
                                                <option value="gram">Gram</option>
                                              </>
                                            )}
                                </select>
                              </div>
                              <div className="rounded-1 w-50 " style={{ height: "20px" }}>
                                {weightType === "kg" && (
                                  <input
                                    type="number"
                                    required
                                    placeholder="Weight"
                                    className="form-control border-1 p-1"
                                    defaultValue={defaultWeight ? defaultWeight : inputweight}
                                    onChange={handleChange}
                                  />
                                )}
              
                                {weightType === "gram" && (
                                  <select
                                    className="rounded-2 p-1"
                                    value={inputweight}
                                    onChange={handleChange}
                                  >
                                    <option>Select</option>
                                    <option value="0.05">50 g</option>
                                    <option value="0.1">100 g</option>
                                    <option value="0.25">250 g</option>
                                    <option value="0.5">500 g</option>
                                    <option value="0.75">750 g</option>
                                  </select>
                                )}
              
                                {weightType === "pieces" && (
                                  <input
                                    type="number"
                                    required
                                    placeholder="Pieces"
                                    className="form-control h-50 border-1"
                                    defaultValue={defaultWeight ? defaultWeight : inputweight}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                            </div>

              <div className="text-danger small mt-2">{warningMsg}</div>

              {/* Buttons */}
              <div className="d-flex gap-2 mt-3">
                <Button
                  className="btn btn-animation"
                  onClick={handleClick}
                  disabled={inStock === 0}
                >
                  {inStock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  className="btn btn-animation"
                  onClick={() => (window.location.href = `/detail_page/${product_id}`)}
                >
                  View More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CommonDetailProductModal;
