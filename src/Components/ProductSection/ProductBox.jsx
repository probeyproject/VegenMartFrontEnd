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
  
}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [finalPrice, setFinalPrice] = useState("");
  const [responseWeight, setResponseWeight] = useState("");

  // const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const [weightType, setWeightType] = useState(weight_type || "Kg");
  const [inputweight, setInputWeight] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [isModalDiscount, setIsModalDiscount] = useState(false);
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

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
        (weightType === "Kg" && numericWeight <= 15 && numericWeight >= 1) || // Kg condition
        (weightType === "pieces" &&
          numericWeight >= 5 &&
          numericWeight <= 30) || // pieces condition (numericWeight between 5 and 30)
        weightType === "g" // g condition (no numericWeight restriction)
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
      toast.warning("Please provide valide input & try again.");
    }
  };

  useEffect(() => {
    if (inputweight === "") {
      setFinalPrice("");
    }
  }, [inputweight, setFinalPrice]);

  const createCart = async () => {
    const numericWeight = parseFloat(inputweight);

    // Check if inputWeight is valid based on weightType
    if (
      (weightType === "Kg" &&
        (isNaN(numericWeight) ||
          (numericWeight < 0.9 && numericWeight >= 15))) ||
      (weightType === "g" && (isNaN(numericWeight) || numericWeight < 0.25)) ||
      (weightType === "pieces" && (isNaN(numericWeight) || numericWeight < 5))
    ) {
      if (weightType === "g") {
        toast.warning("Please enter a valid input for Gram");
      } else {
        toast.warning(`Please enter a valid input for ${weightType}`);
      }
      return;
    }

    let unitTypeToSend = weightType;

    if (weightType === "g") {
      unitTypeToSend = "Kg"; // Change unitType to kg
    }

    try {
      const response = await axios.post(`${baseUrl}/create/cart/${userId}`, {
        productId: product_id,
        totalPrice: finalPrice,
        weight: responseWeight,
        weight_type: unitTypeToSend,
      });

      
      toast.success("Your product add to cart successfully");
    } catch (error) {
      console.error("Error creating cart:", error);
      toast.error("Error creating cart. Please try again.");
    }
  };

  return (
    <div>
      <div className="col-12" data-aos="fade-zoom-in">
        <div className={`product-box shadow rounded-3 bg-white ${inStock == 0 ? "out-of-stock" : ""}`} style={{height:"300px"}}>
          <div  >
            <div className="product-image p-0 m-0  img-fluid" style={{height:"120px"}}>
              <div
                className="position-absolute top-0 end-0 z-3"
              >
                <BsInfoCircle
                  id="TooltipExample"
                  onClick={handleDiscountModal}
                  className="cursor-pointer "
                  title="Offers"
                />
              </div>
              <Link to={`/detail_page/${product_id}`}>
                <a>
                  <img
                    src={imageSrc[0]}
                    onClick={onImageClick}
                    className="object-fit-fill blur-up lazyloaded rounded-3"
                    alt={productName}
                  />
                </a>
              </Link>

              <Link>
                <ul className="d-flex align-items-center list-unstyled product-option mb gap-2">
                  <li>
                    <a onClick={toogleModalProduct} className="text-dark">
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
                    </a>
                  </li>
                  <li>
                    <a onClick={handleDiscountModal}>
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
                    </a>
                  </li>

                  <li>
                    <a
                      className={`notifi-wishlist text-dark ml-2 ${
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
                    </a>
                  </li>
                </ul>
              </Link>
            </div>
            <div className="product-detail mt-1">
              <a className="d-flex justify-content-between">
                <h6 className="name m-0" style={{ fontSize: "10px" }}>
                  {productName?.length >= 15
                    ? `${productName.substring(0, 15)}...`
                    : productName}
                </h6>
                <span className="heavyweight">
                  {Math.round(weight)} {weight_type}
                </span>
              </a>
              <h5 className="sold text-content">
                <span className="theme-color price">₹{currentPrice ? Math.floor(currentPrice) : ""}</span>
                <del>
                  {discount_price ? Math.floor(discount_price) : ""}
                </del>{" "}
                <span className="offer-top text-danger mb-2 m-lg-2">
                  {Math.round(
                    ((discount_price - currentPrice) / discount_price) * 100
                  ) === -Infinity
                    ? 0
                    : Math.round(
                        ((discount_price - currentPrice) / discount_price) * 100
                      )}
                  % off
                </span>
              </h5>

              <div className="product-rating d-flex center justify-content-between align-content-center">
                <div className="">
                  <ul className="rating small">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star fill"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star fill"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star fill"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star fill"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="theme-color small" style={{fontSize:"10px"}}>
                    {inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <select
                    id="units"
                    className="border-1 rounded-2"
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
                </div>
                <div className="rounded-1 w-50" style={{ height: "20px" }}>
                  {weightType === "Kg" && (
                    <input
                      type="number"
                      required
                      placeholder="Weight"
                      className="form-control h-50 border-1"
                      defaultValue={defaultWeight ? defaultWeight : inputweight}
                      onChange={handleChange}
                    />
                  )}

                  {weightType === "g" && (
                    <select
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
                  <div className="text-success small">₹{finalPrice}</div>
                ) : (
                  ""
                )}
                <div className="add-to-cart-box w-50">
                  {finalPrice ? (
                    <button
                      className="btn btn-animation btn-md"
                      onClick={handleClick}
                      style={{
                        width: "80px",
                        height: "25px",
                        fontSize: "12px",
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
                        width: "120px",
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
      />
    </div>
  );
};

export default ProductBox;
