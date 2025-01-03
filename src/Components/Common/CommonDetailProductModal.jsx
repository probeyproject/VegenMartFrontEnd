import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, ModalBody, Button } from "reactstrap";
import { baseUrl } from "../../API/Api";
import LoginModal from "./LoginModal";

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
  const [weightType, setWeightType] = useState(weight_type || "Kg");
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
    if (weightType === "Kg") {
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
      setWarningMsg(""); // Clear the warning if weightType is not recognized or is other than "Kg" or "pieces"
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
        (weightType === "Kg" && numericWeight >= 1) ||
        (weightType === "pieces" && numericWeight >= 5) ||
        weightType === "g"
      ) {
        calculatePrice(numericWeight); // Call the API only if valid
      }
    }
  }, [inputweight, weightType]);

  const calculatePrice = async (numericWeight) => {
    try {
      let unitTypeToSend = weightType;

      // Change unitType to kg if it's grams
      if (weightType === "g") {
        unitTypeToSend = "Kg"; // Change unitType to kg
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
      (weightType === "Kg" && (isNaN(numericWeight) || numericWeight < 0.9)) ||
      (weightType === "g" &&
        (isNaN(numericWeight) || numericWeight < 0.25)) ||
      (weightType === "pieces" && (isNaN(numericWeight) || numericWeight < 5))
    ) {
      toast.warning(`Please enter a valid input for ${weightType}.`);
      return;
    }

    let unitTypeToSend = weightType;

    if (weightType === "g") {
      unitTypeToSend = "Kg"; // Change unitType to kg
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
    <Modal
      isOpen={show}
      toggle={handleClose}
      className="modal-lg modal-fullscreen-sm-down"
    >
      <ModalBody className="position-relative  mt-3 p-2">
        {/* Close button aligned to top-right corner */}
        <button
          type="button"
          className="btn-close position-absolute custom-close-btn"
          style={{
            top: "-17px",
            right: "-1px",
            // backgroundColor: "#00a885",
            // color: "#fff",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          <i className="fa-solid fa-xmark" style={{ fontSize: "18px" }}></i>
        </button>

        <div className="row g-4">
          {/* Image container */}
          <div className="col-md-6">
            <div
              className="slider-image"
              style={{
                width: "300px",
                height: "300px",
                overflow: "hidden",
              }}
            >
              <img
                src={image[0]}
                className="img-fluid rounded object-fit-fill shadow p-4"
                alt={productName}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-sidebar-modal">
              <h5 className="offer-top text-danger mb-2">
                {Math.round(
                  ((discount_price - currentPrice) / discount_price) * 100
                ) === -Infinity
                  ? 0
                  : Math.round(
                      ((discount_price - currentPrice) / discount_price) * 100
                    )}
                % off
              </h5>
              <h5 className="title-name">{productName}</h5>
              {/* <span className="mt-2 mb-2">
                {Math.round(weight)} {weight_type}
              </span> */}
              <h5 className="theme-color price p-2">
                ₹{currentPrice}/{weight_type}{" "}
                <del className="text-content">₹{discount_price}</del>{" "}
              </h5>
              <div className="product-rating mb-3">
                <ul className="rating list-unstyled d-flex">
                  {[...Array(5)].map((_, index) => (
                    <li key={index} className="me-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={index < 4 ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`feather feather-star ${
                          index < 4 ? "fill" : ""
                        }`}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                  ))}
                </ul>
                <span className="ms-2">8 Reviews</span>
              </div>
              <hr style={{ border: "0.1px dashed #b7b7b7" }} />

              <div className="product-detail mb-3">
                <h5>Product Details :</h5>
                <p>{productDetail}</p>
              </div>

              <div className="container mt-4">
                <ul className="d-flex flex-column list-unstyled mb-3 ">
                  <li className="align-items-center d-flex mb-2">
                    <h5 className="mb-1">Brand Name:</h5>
                    <h6 className="text-muted ms-3">{brand_name}</h6>
                  </li>
                  <li className="align-items-center d-flex mb-2">
                    <h5 className="mb-1">SKU Code:</h5>
                    <h6 className="text-muted ms-3">{sku}</h6>
                  </li>
                  <li className="align-items-center d-flex mb-2">
                    <h5 className="mb-1">Product Type:</h5>
                    <h6 className="text-muted ms-3">{productType}</h6>
                  </li>
                </ul>
              </div>
              <hr style={{ border: "0.1px dashed #b7b7b7" }} />
              <div className="select-size mb-2 d-flex align-items-center gap-2">
                <select
                  style={{ width: '100px', height: '30px' }}
                  className="border-1 rounded"
                  onChange={(e) => {
                    setWeightType(e.target.value);
                    setInputWeight(""); // Clear input when weight type changes
                  }}
                  value={weightType} // Control the select with state
                >
                  {weight_type === "pieces" && (
                    <option value="pieces">Pieces</option>
                  )}
                  {(weight_type === "Kg" || weight_type === "g") && (
                    <>
                      <option value="Kg">Kg</option>
                      <option value="g">Gram</option>
                    </>
                  )}
                </select>

                <div className="rounded-1">
                  {weightType === "Kg" && (
                    <input
                      style={{ width: '100px', height: '30px' }}
                      type="number"
                      required
                      placeholder="Weight"
                      className="form-control  border-1"
                      defaultValue={defaultWeight? defaultWeight : inputweight}
                      onChange={handleChange}
                    />
                  )}

                  {weightType === "g" && (
                    <select
                      style={{ width: '100px', height: '30px' }}
                      className="rounded-2"
                      value={inputweight}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option value="0.25">250 g</option>
                      <option value="0.5">500 g</option>
                      <option value="0.75">750 g</option>
                    </select>
                  )}

                  {weightType === "pieces" && (
                    <input
                      style={{ width: '100px', height: '30px' }}
                      type="number"
                      required
                      placeholder="Pieces"
                      className="form-control  border-1"
                      defaultValue={defaultWeight? defaultWeight : inputweight}
                      onChange={handleChange}
                    />
                  )}
                  <div className="text-danger small">{warningMsg}</div>
                </div>
                {finalPrice ? (
                <div className="text-success small">MRP: ₹{finalPrice}</div>
              ) : (
                ""
              )}
              </div>

              <div className="modal-button d-flex gap-2 mb-4">
                <Button
                  // Custom color
                  className="btn btn-animation"
                  onClick={handleClick}
                  disabled={inStock == 0}
                >
                  {inStock == 0 ? "Out of stock" : " Add To Cart"}
                </Button>
                <Button
                  className="btn btn btn-animation"
                  onClick={() =>
                    (window.location.href = `/detail_page/${product_id}`)
                  }
                >
                  View More Details
                </Button>
              </div>
            </div>
          </div>
          <LoginModal isOpen={loginModal} toggle={toggleLoginModal} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CommonDetailProductModal;
