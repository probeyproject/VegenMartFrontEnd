import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, ModalBody, Button } from "reactstrap";
import { baseUrl } from "../../API/Api";
import LoginModal from "./LoginModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { addToCart } from "../../slices/userSlice";

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
  discountRanges,
  minWeight,
}) => {
  // const [weights, setWeights] = useState([]);
  const [weightType, setWeightType] = useState(weight_type || "kg");
  const [inputweight, setInputWeight] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [responseWeight, setResponseWeight] = useState("");

  const authenticated = useSelector((state) => state?.user?.authenticated);
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;
  const dispatch = useDispatch();
  const toggle = () => setModal(!modal);

  const toggleLoginModal = () => setLoginModal(!loginModal);

  const handleChange = (e) => {
    let value = parseFloat(e.target.value); // Convert input to number
    setInputWeight(value);

    // If input is empty or invalid, clear warning and exit
    if (!value || isNaN(value)) {
      setWarningMsg("");
      return;
    }

    console.log(
      "Input:",
      value,
      "Min Weight:",
      minWeight,
      "Weight Type:",
      weightType
    );

    // Convert minWeight to correct format
    const minWeightKg = minWeight / 1000; // Convert min grams to kg
    const minWeightGram = minWeight; // Keep min grams as is

    // **Fix: Proper validation for grams and kg**
    if (weightType === "kg") {
      if (value < minWeightKg || value > 100) {
        setWarningMsg(`Enter between ${minWeightKg} Kg to 100 Kg`);
        return;
      }
    } else if (weightType === "pieces") {
      if (value < 5) {
        setWarningMsg(`Enter at least 5 pieces`);
        return;
      } else if (value > 300) {
        setWarningMsg("Maximum 300 pieces allowed.");
        return;
      }
    } else if (weightType === "gram") {
      const valueInGrams = value * 1000; // Convert input kg to grams for comparison
      if (valueInGrams < minWeightGram) {
        setWarningMsg(`Select minimum ${minWeightGram} grams`);
        return;
      }
    }

    setWarningMsg(""); // Clear warning if valid
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

      let finalPrice = response.data.final_price;
      const responseWeight = response.data.weight;

      console.log(finalPrice, responseWeight);

      console.log(discountRanges);

      // Apply discount if weight falls within any range
      const applicableDiscount = discountRanges.find(
        (range) =>
          responseWeight >= range.quantityFrom &&
          responseWeight <= range.quantityTo
      );

      if (applicableDiscount) {
        const discountPercentage = applicableDiscount.discountPercentage;
        const discountAmount = (finalPrice * discountPercentage) / 100;
        finalPrice -= discountAmount; // Apply discount
      }

      // Update state with the new final price and weight
      setFinalPrice(finalPrice);
      setResponseWeight(responseWeight);
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
    e.preventDefault();

    // Correctly prevent the default action

    if (authenticated) {
      navigate(a); // Navigate if authenticated
    } else {
      toggleLoginModal(); // Open login modal if not authenticated
    }
  };

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
    const numericWeight = parseFloat(inputweight); // Convert input to a number

    // If input is empty or invalid, show warning and exit
    if (!numericWeight || isNaN(numericWeight)) {
      toast.warning(`Please enter a valid input for ${weightType}`);
      return;
    }

    // Convert minWeight to correct format
    const minWeightKg = minWeight / 1000; // Convert grams to kg for comparison
    const minWeightGram = minWeight; // Keep grams as is

    let unitTypeToSend = weightType;
    let responseWeight = numericWeight;
    let quantityToSend = numericWeight;

    // **Fix: Validate weight correctly for grams and kg**
    if (weightType === "kg") {
      if (numericWeight < minWeightKg || numericWeight > 100) {
        toast.warning(`Enter between ${minWeightKg} Kg to 100 Kg`);
        return;
      }
    } else if (weightType === "pieces") {
      if (numericWeight < 5) {
        toast.warning(`Enter at least 5 pieces`);
        return;
      } else if (numericWeight > 300) {
        toast.warning("Maximum 300 pieces allowed.");
        return;
      }
    } else if (weightType === "gram") {
      const valueInGrams = numericWeight * 1000; // Convert kg input to grams for comparison
      if (valueInGrams < minWeightGram) {
        toast.warning(`Select minimum ${minWeightGram} grams`);
        return;
      }
      unitTypeToSend = "kg"; // Convert grams to kg for backend
      responseWeight = numericWeight; // Convert grams to kg
      quantityToSend = 1; // Always send "1" for grams
    } else {
      toast.warning("Invalid weight type");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/create/cart/${userId}`, {
        productId: product_id,
        totalPrice: finalPrice,
        weight: responseWeight, // Actual weight in kg for backend
        weight_type: unitTypeToSend,
        quantity: quantityToSend, // 1 for grams, actual for kg & pcs
      });

      dispatch(addToCart(response.data));
      toast.success("Your product was added to cart successfully");
    } catch (error) {
      console.error("Error creating cart:", error);
      toast.error("Error creating cart. Please try again.");
    }
  };

  const calculateOriginalPrice = (data) => {
    let price = Number(currentPrice) || 0;
    let weightValue = Number(weight) || 1;
    let weightType = weight_type?.toLowerCase() || "";

    if (weightType === "kg") {
      return (price * weightValue).toFixed(2);
    } else if (weightType === "gram") {
      return ((price / 1000) * weightValue).toFixed(2);
    } else {
      return (price * weightValue).toFixed(2);
    }
  };

  const calculateFinalPrice = () => {
    let price = Number(currentPrice);
    let weightValue = Number(weight);
    let weightType = weight_type?.toLowerCase();
    let discountPerKg = Number(discount_price);

    let basePrice = 0;
    let discountAmount = 0;

    // Adjust price & discount based on weight type
    if (weightType === "kg") {
      basePrice = price * weightValue;
      discountAmount = discountPerKg * weightValue;
    } else if (weightType === "gram") {
      basePrice = (price / 1000) * weightValue;
      discountAmount = (discountPerKg / 1000) * weightValue;
    } else {
      basePrice = price * weightValue; // Default for "pieces"
      discountAmount = data.discount_price; // No discount for pieces
    }

    return (basePrice - discountAmount).toFixed(2);
  };
  return (
    show && (
      <div
        className="modal-overlay d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1100,
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
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h5 className="text-danger mb-2">
                {Math.round((discount_price / currentPrice) * 100)}% off
              </h5>
              <h5 className="fw-bold">{productName}</h5>
              <h3 className="theme-color price">
                ₹{calculateFinalPrice()} / {Math.trunc(Number(weight))}{" "}
                {weight_type}{" "}
                <del className="text-content">₹{calculateOriginalPrice()}</del>
              </h3>

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
                    {(weight_type === "kg" || weight_type === "gram") && (
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
              <div className="text-danger small">{warningMsg}</div>

              {finalPrice && (
                <div className="text-success small">
                  ₹{Math.round(finalPrice).toFixed(2)}
                </div>
              )}

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
                  onClick={() =>
                    (window.location.href = `/detail_page/${product_id}`)
                  }
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
