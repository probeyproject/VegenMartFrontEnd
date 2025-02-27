import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CommonDetailProductModal from "../Common/CommonDetailProductModal";
import { useDispatch, useSelector } from "react-redux";
import DiscountModal from "../Common/DiscountModal";
import { BsInfoCircle } from "react-icons/bs";
import { baseUrl } from "../../API/Api";
import LoginModal from "../Common/LoginModal";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import "./ProductBox.css";
import { addToCart } from "../../slices/userSlice";

const ProductBox = ({
  product_id,
  productType,
  productDetails,
  imageSrc,
  productName,
  currentPrice,
  inStock,
  brand_name,
  sku,
  weight,
  weight_type,
  discount_price,
  offers,
  average_rating,
  defaultWeight,
  defaultWeightType,
  onImageClick,
  discountRanges,
  minWeight,
}) => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 100,
  //     easing: "ease-in-out",
  //     once: true,
  //     mirror: false,
  //   });
  // }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [finalPrice, setFinalPrice] = useState("");
  const [responseWeight, setResponseWeight] = useState("");

  // const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const [weightType, setWeightType] = useState(weight_type || "kg");
  const [inputweight, setInputWeight] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [isModalDiscount, setIsModalDiscount] = useState(false);
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [calcultedDis ,setCalculateDis] = useState(null);

  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state?.user?.authenticated);
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;
  const wishlist = userState?.wishlists;

  const toggle = () => setModal(!modal);

  const toggleLoginModal = () => setLoginModal(!loginModal);

  function wishlistHandler() {
    userState.useDispatch(wishlist + 1);
  }

  const handleDiscountModal = () => {
    setIsModalDiscount(true);
  };

  const toggleDiscountModal = () => {
    setIsModalDiscount(false);
  };

  const toogleModalProduct = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const handleWishlist = (e, a) => {
    e.preventDefault(); // Prevent the default behavior, like form submission or page refresh

    if (!authenticated) {
      // If the user is not authenticated, call handleAuth
      handleAuth(e, a); // Pass event (e) and the argument (a) for authentication
    } else {
      // If the user is authenticated, call handleAddToWishlist
      handleAddToWishlist(); // Add to wishlist logic here
      wishlistHandler(); // Call wishlistHandler after adding to the wishlist
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const data = {
        productId: product_id,
        userId: userId, // Adjust this according to your user management
      };

      const response = await axios.post(`${baseUrl}/addToWishlist`, data);

      setIsInWishlist(true);

      toast.success("Add to wishlist Successful");
    } catch (error) {
      console.error("Error:", error);
      toast.warning("This product already in your wishlist!");
    }
  };

  const handleChange = (e) => {
    let value = parseFloat(e.target.value); // Convert input to a number
    setInputWeight(value);

    // If input is empty or null, clear warning and exit
    if (!value) {
      setWarningMsg("");
      return;
    }

    // Convert minWeight to the correct format
    const minWeightKg = minWeight / 1000; // Convert grams to kg
    const minWeightGram = minWeight; // Keep grams as is

    // Adjust value for grams selection
    if (weightType === "gram" && value < 1) {
      value = value * 1000; // Convert fraction kg to grams
    }

    // Check if input is below minimum allowed weight
    if (weightType === "kg" && value < minWeightKg) {
      setWarningMsg(`Select minimum ${minWeight} grams (${minWeightKg} Kg)`);
      return;
    }

    if (weightType === "gram" && value < minWeightGram) {
      setWarningMsg(`Select minimum ${minWeightGram} grams`);
      return;
    }

    // Validation based on weight type
    if (weightType === "kg") {
      if (value < minWeightKg || value > 100) {
        setWarningMsg(`Enter between ${minWeightKg} Kg to 100 Kg`);
      } else {
        setWarningMsg(""); // Clear warning if valid
      }
    } else if (weightType === "pieces") {
      if (value < 5) {
        setWarningMsg(`Enter at least ${5} pieces`);
      } else if (value > 300) {
        setWarningMsg("Maximum 300 pieces allowed.");
      } else {
        setWarningMsg(""); // Clear warning if valid
      }
    } else if (weightType === "gram") {
      if (value < minWeightGram) {
        setWarningMsg(`Select minimum ${minWeightGram} grams`);
      } else {
        setWarningMsg(""); // Clear warning if valid
      }
    } else {
      setWarningMsg(""); // Clear warning if weightType is not recognized
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
        (weightType === "kg" && numericWeight <= 100 && numericWeight >= 1) || // Kg condition
        (weightType === "pieces" &&
          numericWeight >= 5 &&
          numericWeight <= 300) || // pieces condition (numericWeight between 5 and 30)
        weightType === "gram" // g condition (no numericWeight restriction)
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

      // Apply discount if weight falls within any range
      const applicableDiscount = discountRanges.find(
        (range) =>
          responseWeight >= range.quantityFrom &&
          responseWeight <= range.quantityTo
      );

      if (applicableDiscount) {
        const discountPercentage = applicableDiscount.discountPercentage;
        setCalculateDis(discountPercentage)
        const discountAmount = (finalPrice * discountPercentage) / 100;
        finalPrice -= discountAmount; // Apply discount
      }

      // Update state with the new final price and weight
      setFinalPrice(finalPrice);
      setResponseWeight(responseWeight);
    } catch (error) {
      console.error("Error:", error);
      toast.warning("Please provide valid input & try again.");
    }
  };

  useEffect(() => {
    if (inputweight === "") {
      setFinalPrice("");
    }
  }, [inputweight, setFinalPrice]);

  const createCart = async () => {
    const numericWeight = parseFloat(inputweight);

    // If input is empty or invalid, show warning and exit
    if (!numericWeight || isNaN(numericWeight)) {
      toast.warning(`Please enter a valid input for ${weightType}`);
      return;
    }

    console.log(
      "Cart Input:",
      numericWeight,
      "Min Weight:",
      minWeight,
      "Weight Type:",
      weightType
    );

    // Convert minWeight to correct format
    const minWeightKg = minWeight / 1000; // Convert grams to kg
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
        toast.warning(`Enter at least ${5} pieces`);
        return;
      } else if (numericWeight > 300) {
        toast.warning("Maximum 300 pieces allowed.");
        return;
      }
    } else if (weightType === "gram") {
      if (numericWeight * 1000 < minWeightGram) {
        // Convert kg input to grams for comparison
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

  return (
    <div>
      <div className="col-12">
        <div
          className={`product-box shadow rounded-3 bg-white ${inStock == 0 ? "out-of-stock" : ""}`}
          style={{ height: "309px" }}
        >
          <div>
            <div
              className="product-image p-0 m-0  img-fluid"
              style={{ height: "128px" }}
            >
              <div className="position-absolute top-1 end-0 z-1">
                {/* <BsInfoCircle
                  id="TooltipExample"
                  onClick={handleDiscountModal}
                  className="cursor-pointer "
                  title="Offers"
                /> */}
              </div>
              <Link to={`/detail_page/${product_id}`}>
                <img
                  src={imageSrc[0]}
                  onClick={onImageClick}
                  className="object-fit-fill blur-up lazyloaded rounded-3"
                  style={{ height: "120px" }}
                  alt={productName}
                />
              </Link>

              <Link>
                <div
                  className={`notifi-wishlist text-dark ms-2 product-option d-sm-none ${
                    isInWishlist ? "text-danger" : ""
                  }`}
                  onClick={handleWishlist}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={
                      isInWishlist ||
                      wishlist.some((item) => item.product_id === product_id)
                        ? "red"
                        : "none"
                    } // Either isInWishlist or product_id in wishlist
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-heart"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <ul className="d-flex align-items-center list-unstyled product-option mb gap-1 d-none d-sm-block">
                  <li className="me-1">
                    <div onClick={toogleModalProduct} className="text-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                  </li>
                  {/* <li>
                    <div onClick={handleDiscountModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-info"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="16" />
                        <line x1="12" y1="8" x2="12" y2="8" />
                      </svg>
                    </div>
                  </li> */}

                  <li className="mx-1">
                    <div
                      className={`notifi-wishlist text-dark ms-2 ${
                        isInWishlist ? "text-danger" : ""
                      }`}
                      onClick={handleWishlist}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={
                          isInWishlist ||
                          wishlist.some(
                            (item) => item.product_id === product_id
                          )
                            ? "red"
                            : "none"
                        } // Either isInWishlist or product_id in wishlist
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-heart"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                  </li>
                </ul>
              </Link>
            </div>
            <div className="product-detail">
              <a className="d-flex justify-content-between">
                <h6
                  className="name m-0 text-start"
                  style={{ fontSize: "14px" }}
                >
                  {productName?.length >= 10
                    ? `${productName.substring(0, 13)}...`
                    : productName}
                </h6>
                {/* <span className="heavyweight">
                  {Math.round(weight)} {weight_type}
                </span> */}
              </a>
              <h5 className="sold text-content text-start mb-0">
                <span className="theme-color price">
                  ₹
                  {currentPrice
                    ? Math.floor(currentPrice - discount_price)
                    : ""}
                </span>
                <del>{currentPrice ? Math.floor(currentPrice) : ""}</del>{" "}
                <span className="offer-top text-danger m-lg-2">
                  {Math.round((discount_price / currentPrice) * 100) ===
                  -Infinity
                    ? 0
                    : Math.round((discount_price / currentPrice) * 100)}
                  % off
                </span>
              </h5>

              <div className="d-flex  justify-content-between align-content-center">
                  <div>
                 {calcultedDis &&    <p style={{fontSize:"11px"}}>Extra {calcultedDis}% OFF</p>}
                  </div>
                <div className="d-flex " >
                  <p className="theme-color small " style={{ fontSize: "10px" }}>
                    {inStock ? "In Stock" : "Out of Stock"}
                  </p>  
                </div>
              
              </div>

              <div className="d-flex justify-content-between">
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
                      <option value="pieces" className="">Pieces</option>
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

              <div className="d-flex justify-content-between align-content-center center p-1 mt-1">
                {finalPrice ? (
                  <div className="text-success small">
                    ₹{finalPrice.toFixed(2)}
                  </div>
                ) : (
                  ""
                )}
                <div className="add-to-cart-box">
                  {finalPrice ? (
                    <button
                      className="btn btn-animation btn-md"
                      onClick={handleClick}
                      style={{
                        width: "70px",
                        height: "25px",
                        fontSize: "11px",
                      }}
                      disabled={inStock == 0}
                    >
                      {inStock == 0 ? "Out of stock" : "Add To Cart"}
                    </button>
                  ) : (
                    <button
                      className="btn btn-animation btn-md"
                      onClick={handleClick}
                      style={{
                        width: "100px",
                        height: "25px",
                        fontSize: "12px",
                      }}
                      disabled={inStock == 0}
                    >
                      {inStock == 0 ? "Out of stock" : "Add To Cart"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={loginModal} toggle={toggleLoginModal} />
      <DiscountModal
        isOpen={isModalDiscount}
        toggle={() => setIsModalDiscount(false)}
        onClose={toggleDiscountModal}
        offers={offers}
      />

      <CommonDetailProductModal
        image={imageSrc}
        inStock={inStock}
        currentPrice={currentPrice}
        productName={productName}
        product_id={product_id}
        productDetail={productDetails}
        productType={productType}
        brand_name={brand_name}
        average_rating={average_rating}
        discount_price={discount_price}
        sku={sku}
        show={isModalOpen}
        defaultWeightType={defaultWeightType}
        defaultWeight={defaultWeight}
        weight={weight}
        weight_type={weight_type}
        handleClose={toogleModalProduct}
        discountRanges={discountRanges}
        minWeight={minWeight}
      />
    </div>
  );
};

export default ProductBox;
