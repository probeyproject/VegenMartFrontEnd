import React, { useEffect, useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import { baseUrl } from "../API/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import easyinvoice from "easyinvoice";
import HomeAddressModal from "../Components/Account/Dashboard/HomeAddressModal";
import EditAddressModal from "../Components/Account/Dashboard/EditAddressModal";
import CouponModal from "./CouponModal";
import { RelevantProducts } from "../Components/Common/RelevantProducts";
import { MdDeleteForever } from "react-icons/md";

import "./Checkout.css";
import { FaHeart, FaPencil } from "react-icons/fa6";

import jsPDF from "jspdf";
import "jspdf-autotable";

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import axios from "axios";
function Checkout() {
  const [carts, setCart] = useState([]);
  const [quantities, setQuantities] = useState();
  const [address, setAddress] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address_id, setAddress_id] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isEditModal, setIsEditModal] = useState(false);
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;
  console.log(userId);

  const phone = userState?.user?.phone;
  const phoneno = phone?.slice(3);
  const [shipping, setShipping] = useState(29);
  const rewards = userState?.rewards;
  const points = rewards?.length > 0 ? rewards[0].points : 0;
  const [calculatedPrice, setCalculatedPrice] = useState();
  const [couponCodes, setCouponCodes] = useState("");
  const [coupons, setCoupons] = useState([]); // State to hold list of available coupons
  const [minDiscountPrice, setMinDiscountPrice] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [isModalOpens, setIsModalOpens] = useState(false); // Modal visibility state
  const [invoiceAddress, setInvoiceAddress] = useState({});
  const [cartItems, setCartItems] = useState([]);
  // console.log(Number(carts?.unit)); // Converts "7" -> 7
  // console.log(carts);
  // const [currentWeight, setCurrentWeight] = useState(1); // Default value
  // const [currentTotalPrice, setCurrentTotalPrice] = useState(1);
  const [currentWeight, setCurrentWeight] = useState(Number(carts?.unit) || 1);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(carts?.price);
  const [reedemedPoints, setReedemedPoints] = useState(0);

  // console.log("points " + rewards, points);

  useEffect(() => {
    carts.map((item, index) => {
      // console.log(item);
    });
  }, [currentWeight]); // Runs only when `carts` changes

  // console.log(currentWeight, currentTotalPrice);

  const AddressModal = () => {
    setIsModalOpen(!isModalOpen);
    getAddress();
  };

  const toggleEditModal = () => {
    setIsEditModal(false);
    getAddress();
  };

  const handleEditModal = (address) => {
    setSelectedAddress(address); // Set the address ID to delete
    setIsEditModal(true); // Open the delete modal
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getAllLocation`);
        setLocations(response.data); // Assuming the response data is an array of locations
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLocations();
  }, []);
  useEffect(() => {
    fetchAllCart();
    getAddress();
  }, []);

  async function fetchAllCart() {
    try {
      const response = await axios.get(
        `${baseUrl}/getAllCartByUserId/${userId}`
      );
      const data = response?.data || [];

      // Ensure quantities is set correctly
      const initialQuantities = {};
      data.forEach((cart) => {
        initialQuantities[cart.cart_id] = cart.unit || 1; // Default to 1
      });

      setCart(data);
      setQuantities(initialQuantities); // Store in state
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  // console.log(quantities);

  const validateCoupon = async (e, selectedCoupan) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // console.log("Hii");

    try {
      const response = await axios.post(`${baseUrl}/coupons/validate`, {
        coupon_code: selectedCoupan,
        user_id: userId,
        total_price: totalPrice,
      });

      setMinDiscountPrice(response.data.coupon.Min_Order_Value);

      setDiscountValue(response.data.coupon.discount_value);
      setResponseMessage(
        `${response.data.message}, Discount Value: ${discountValue}`
      );

      toast.success("Coupan Applied Successfully!");
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );

      if (error.status === 500) {
        toast.error("Invalid Coupan Code");
      }

      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getAddress = async () => {
    const response = await axios.get(`${baseUrl}/getAddressById/${userId}`);
    const data = await response.data;
    setAddress(data);
  };

  // console.log(address);

  const fetchAddressById = async (address_id) => {
    try {
      const res = await axios.get(
        `${baseUrl}/getAddressByAddressId/${address_id}`
      );
      setInvoiceAddress(res.data[0]);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    if (address_id) {
      fetchAddressById(address_id);
    }
  }, [address_id]);

  const getProductsData = () => {
    return carts.map((cart) => ({
      id: cart.id || cart.combo_id,
      product_name: cart.product_name || cart.combo_title,
      product_image: cart.product_image || cart.combo_image,
      product_price: cart.product_price || cart.combo_price, // Assuming this is the unique ID for the product // Retrieve quantity from quantities state
      unit: cart.unit || "1",
      weight_type: cart.weight_type, // Adjust as per your cart data
      price: cart.price, // Assuming this is the price for one unit
    }));
  };

  const handleAddToWishlist = async (product_id) => {
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/addToWishlist`, {
        productId: product_id,
        userId: userId,
      });
      toast.success("Added to wishlist successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.warning("This product is already in your wishlist!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/deleteCartById/${id}`);
      toast.success("Cart removed successfully");
      fetchAllCart();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("There was a problem removing the cart item");
    }
  };

  const handleIncreaseWeight = async (index) => {
    try {
      const product = carts[index];
      if (!product) return;

      const currentWeight = Number(product.unit) || 0; // Ensure it's a number

      const response = await axios.post(
        `${baseUrl}/calculate-price/${product.id}`,
        { weight: currentWeight + 1, unitType: product.weight_type }
      );

      const priceData = response.data;

      // Update the specific item in the state
      setCart((prevCartItems) =>
        prevCartItems.map((item, i) =>
          i === index
            ? {
                ...item,
                unit: priceData.weight, // Update `unit` instead of `weight`
                totalPrice: priceData.final_price,
              }
            : item
        )
      );

      // Update cart in backend
      updateCart(index, priceData.weight, priceData.final_price);
    } catch (error) {
      toast.warning("Weight cannot be increased beyond allowed limits");
    }
  };

  const handleDecreaseWeight = async (index) => {
    try {
      const product = carts[index];
      if (!product || product.weight <= 1) return;

      const response = await axios.post(
        `${baseUrl}/calculate-price/${product.id}`,
        { weight: product.unit - 1, unitType: product.weight_type }
      );

      const priceData = response.data;

      // Update only the specific item in the cartItems state
      setCart((prevCartItems) =>
        prevCartItems.map((item, i) =>
          i === index
            ? {
                ...item,
                weight: priceData.weight,
                totalPrice: priceData.final_price,
              }
            : item
        )
      );

      // Call updateCart with the updated values
      updateCart(index, priceData.weight, priceData.final_price);
    } catch (error) {
      toast.warning("Minimum weight limit reached");
    }
  };
  // console.log(currentWeight);

  const updateCart = async (index, newWeight, newTotalPrice) => {
    try {
      const product = carts[index];
      if (!product) {
        toast.error("Cart data is missing");
        return;
      }

      await axios.put(`${baseUrl}/cart/${userId}/${product.id}`, {
        totalPrice: newTotalPrice,
        cartStatus: "updated",
        weight: newWeight,
        weight_type: product.weight_type,
      });

      fetchAllCart(); // Refresh cart after update
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  // console.log(carts);

  const totalAmount = carts?.reduce((acc, cart) => {
    const quantity = quantities?.[cart.cart_id] ?? 1; // Default to 1
    const price = parseFloat(cart.product_price) || 0; // Ensure price is a number
    return acc + quantity * price;
  }, 0);

  useEffect(() => {
    // Calculate shipping based on totalAmount (before discount)
    const shippingCharge = totalAmount >= 200 ? 0 : 29;
    setShipping(shippingCharge);

    // Update total price and calculated price
    setTotalPrice(totalAmount);
    setCalculatedPrice(totalAmount + shippingCharge);
  }, [totalPrice, totalAmount]); // Removed unnecessary dependencies

  useEffect(() => {
    if (totalPrice >= 500) {
      if (discountValue === 0) {
        const maxRedeemablePoints = Math.min(
          points,
          Math.floor(totalPrice / 2)
        ); // Limit to 50% of total price
        setReedemedPoints(maxRedeemablePoints);
      }
    } else {
      setReedemedPoints(0); // No redemption allowed for orders below ₹500
    }
  }, [reedemedPoints, totalPrice, points, discountValue]);

  useEffect(() => {
    // Apply discount but keep shipping based on totalAmount

    if (totalPrice < minDiscountPrice) setDiscountValue(0);

    if (discountValue > 0) setReedemedPoints(0);

    let amountAfterDiscount = totalPrice - (discountValue || 0); // Subtract the discount
    amountAfterDiscount -= reedemedPoints;

    // console.log("amount after " + amountAfterDiscount);
    const finalAmount = amountAfterDiscount + (totalPrice >= 200 ? 0 : 29);

    setCalculatedPrice(finalAmount);
    setSavedAmount(totalPrice - finalAmount);
  }, [totalAmount, discountValue, totalPrice, reedemedPoints]);

  useEffect(() => {
    const products = getProductsData(); // Store product data in a variable

    // Set quantities based on the length of the products array
    setQuantity((prev) => ({
      ...prev,
      quantity: products.length, // Set quantity to the length of products
    }));
  }, [carts, quantities]);

  // Payment Function

  const order_status = "Pending";
  const paymentData = {
    products: getProductsData(),
    quantity,
    address_id,
    totalPrice: calculatedPrice,
    pointsUsed: reedemedPoints,
    deliveryDate,
    deliveryTimeSlot: selectedSlot,
    payment_mode: paymentMode,
    orderStatus: order_status,
    shipping_cost: shipping,
  };

  const handlePayment = async () => {
    // Check for required fields
    if (!address_id) {
      toast.warning("Please select an address.");
      return;
    }

    if (!paymentMode) {
      toast.warning("Please select a Payment Option.");
      return;
    }

    setPaymentLoading(true);

    try {
      if (paymentMode === "Cash On Delivery") {
        const response = await axios.post(
          `${baseUrl}/create/order/${userId}`,
          paymentData
        );

        // console.log("Order Response:", response);

        if (response?.data?.orderId) {
          await generateAndUploadInvoice(response.data.orderId, userId);
          toast.success("Order created successfully with Cash On Delivery!");
          navigate("/order", { state: { orderId: response.data.orderId } });
        } else {
          console.error("Order creation failed:", response.data);
          toast.error("Order creation failed. Please try again.");
        }

        return; // Ensure no further execution
      }

      if (paymentMode === "online") {
        const options = {
          key: "rzp_test_y06V2AOq27a4Lt",
          amount: calculatedPrice * 100,
          currency: "INR",
          name: "Vegenmart",
          description: "Product Purchases",
          handler: async (paymentResponse) => {
            toast.success("Payment Successful!");

            try {
              const orderData = {
                ...paymentData,
                totalPrice: finalPrice,
                pointsUsed: maxRedeemablePoints,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                payment: paymentResponse.razorpay_payment_id,
              };

              const finalResponse = await axios.post(
                `${baseUrl}/create/order/${userId}`,
                orderData
              );
              // console.log("Final Order Response:", finalResponse);

              if (finalResponse.data.orderId) {
                await // Get userId from state
                generateAndUploadInvoice(finalResponse.data.orderId, userId);

                navigate("/order", {
                  state: { orderId: finalResponse.data.orderId },
                });
              }
            } catch (error) {
              console.error("Error during order creation:", error);
              toast.error("Error during order creation. Please try again.");
            }
          },
          theme: { color: "#0da487" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      console.error(
        "Error creating order:",
        error?.response?.data?.message.split(" ").slice(0, 4).join(" ")
      );

      // toast.error(data.message);
      toast.error(
        error?.response?.data?.message.split(" ").slice(0, 4).join(" ")
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // Function to Generate and Upload Invoice
  const convertImageToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Convert to Base64
      reader.readAsDataURL(blob);
    });
  };

  const generateAndUploadInvoice = async (orderId, userId) => {
    try {
      const doc = new jsPDF();

      // Add Logo from Cloudinary
      const logoUrl =
        "https://res.cloudinary.com/dlcpvi1mh/image/upload/v1739483687/VegenMart-Logo-03_o6afrr.png";
      const logoBase64 = await convertImageToBase64(logoUrl);
      doc.addImage(logoBase64, "PNG", 15, 10, 40, 13);

      // Add Title & Company Info
      doc.setFontSize(18);
      doc.text("VegenMart Tech India Pvt. Ltd", 200, 20, { align: "right" });

      doc.setFontSize(12);
      doc.text("155/25E Karela Bagh, Prayagraj, Uttar Pradesh, India", 100, 30);

      // Invoice Details
      doc.text(`Invoice No: ${orderId}`, 15, 45);
      doc.text(`Date: ${new Date().toISOString().split("T")[0]}`, 15, 55);

      const name = userState?.user?.name || "Customer";

      const customerName = name.split(" ")[0];

      doc.text(`Customer: ${customerName}`, 15, 65);

      const address = `Address: ${invoiceAddress?.name} (${invoiceAddress?.phone}) ${invoiceAddress?.address_type}, ${invoiceAddress?.area}, ${invoiceAddress?.flat}, ${invoiceAddress?.floor}, ${invoiceAddress?.landmark}, (${invoiceAddress?.postal_code}), ${invoiceAddress?.state}`;

      const wrappedAddress = doc.splitTextToSize(address, 180);
      doc.text(wrappedAddress, 15, 75);

      // Get the last Y position (for dynamic spacing)
      const lastY = doc.lastAutoTable ? doc.lastAutoTable.finalY : 75;
      const marginBelowAddress = 15; // Space between address and table

      // Set the starting Y position of the table with margin
      const tableStartY = lastY + marginBelowAddress;

      // Add Product Table
      const tableData = paymentData.products.map((product) => [
        product.product_name,
        `${product.unit} ${product.weight_type}`, // Include unit and weight type in quantity
        `${parseFloat(product.product_price).toFixed(2)}`,
        `${(parseFloat(product.unit) * parseFloat(product.product_price)).toFixed(2)}`,
      ]);

      doc.autoTable({
        startY: tableStartY, // Ensure margin between address and table
        head: [["Product Name", "Quantity", "Price", "Total"]],
        body: tableData,
      });

      let finalY = doc.lastAutoTable.finalY + 10;

      // Payment Details
      doc.text(`Shipping Cost: ${shipping}`, 15, finalY);
      doc.text(`Payment Method: ${paymentMode}`, 15, finalY + 10);
      doc.text(`Discount Applied: ${discountValue || 0}`, 15, finalY + 20);
      doc.text(`Total Amount: ${calculatedPrice}`, 15, finalY + 30);

      // Bottom Notice
      doc.text("Thank you for shopping with VegenMart!", 15, finalY + 50);
      // Convert PDF to Blob
      const pdfBlob = doc.output("blob");

      // Prepare FormData
      // Prepare FormData
      const formData = new FormData();
      formData.append("orderId", String(orderId)); // Ensure it's a string
      formData.append("userId", String(userId)); // Ensure it's a string
      formData.append("invoice", pdfBlob, `invoice_${orderId}.pdf`);

      // Send to Backend
      const response = await axios.post(`${baseUrl}/upload-invoice`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.cloudinary_url) {
        toast.success("Invoice uploaded successfully!");
        window.open(response.data.cloudinary_url, "_blank"); // Open invoice link
      } else {
        toast.error("Invoice uploaded but no download link available.");
      }
    } catch (error) {
      console.error("Invoice Generation Error:", error);
      toast.error("Failed to generate invoice.");
    }
  };

  // Fetch all available coupons (this could come from your API)
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllCoupon`);
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons(); // Fetch available coupons when component mounts
  }, []);

  const handleCouponClick = (e, couponCode) => {
    setCouponCode(couponCode);

    setIsModalOpens(false); // Close the modal after selection

    validateCoupon(e, couponCode);
  };
  console.log(carts);
  return (
    <div className="container-fluid px-0 overflow-hidden ">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      {carts.length === 0 ? (
        <section className="breadcrumb-section pt-0">
          <div className="empty-cart text-center">
            <h3>Your cart is empty</h3>
            <p>It looks like you haven't added anything to your cart yet.</p>
            <Link
              to={"/"}
              className="d-flex justify-content-center align-items-center"
            >
              <button className="btn btn-animation">
                Continue to Shopping
              </button>
            </Link>
          </div>

          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-contain">
                  <h2>Checkout</h2>
                  <nav>
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa-solid fa-house" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active">Checkout</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="checkout-section-2 section-b-space">
          <div className="container-fluid-lg">
            <div className="row g-sm-4 g-3">
              <div className="col-lg-4">
                {/* <button
                onClick={() => (window.location.href = "/order")}
                className="btn theme-bg-color mb-2 text-white btn-md w-100 mt-4 fw-bold"
              >
                Place Order
              </button> */}
                <div className="right-side-summery-box">
                  <div className="summery-box-2">
                    <div className="summery-header">
                      <h3>Order Summary</h3>
                    </div>
                    <ul className="summery-contain">
                      {carts.map((cart, index) => (
                        <li key={cart.cart_id}>
                          {/* {console.log(cart)} */}
                          <img
                            src={JSON.parse(cart.product_image)[0]}
                            className="img-fluid blur-up lazyloaded checkout-image"
                            alt={cart.product_name}
                          />
                          <div className="cart_qty qty-box open w-50">
                            <div className="input-group">
                              {/* Decrease button */}
                              <button
                                type="button"
                                className="qty-left-minus"
                                onClick={() => handleDecreaseWeight(index)}
                              >
                                <i className="fa fa-minus" />
                              </button>

                              <input
                                className="form-control input-number qty-input"
                                type="text"
                                name="quantity"
                                value={cart.unit}
                                readOnly
                              />

                              {/* Increase button */}
                              <button
                                type="button"
                                className="qty-right-plus"
                                onClick={() => handleIncreaseWeight(index)}
                              >
                                <i className="fa fa-plus" />
                              </button>
                            </div>
                          </div>
                          <h4 className="price">₹{cart.price}</h4>
                          <Link onClick={() => handleDelete(cart.cart_id)}>
                            <MdDeleteForever className="text-danger fs-3 ms-3" />
                          </Link>
                          <Link onClick={() => handleAddToWishlist(cart.id)}>
                            <FaHeart className="text-danger fs-4 ms-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white mt-2 rounded-4 summery-contain p-2">
                      <div className="coupon-cart">
                        <h6 className="text-content mb-2">Coupon Apply</h6>
                        <div className="coupon-box input-group">
                          <input
                            type="text" // Use "text" for coupon code
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Coupon Code Here..."
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)} // Correctly handle state update
                            required
                          />
                          <button
                            className="btn-apply btn-apply-input  px-2"
                            type="submit"
                            onClick={(e) => validateCoupon(e, couponCode)}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Loading...
                              </>
                            ) : (
                              "Apply"
                            )}
                          </button>
                          <button
                            className="btn-apply view-coupon-cart-btn"
                            onClick={() => setIsModalOpens(true)}
                          >
                            View Coupons
                          </button>
                        </div>
                        {/* <p className="text-content">
                          {responseMessage && <p>{responseMessage}</p>}
                        </p> */}

                        <p>
                          {discountValue > 0 && (
                            <p
                              onClick={() => {
                                setDiscountValue(0);
                                setCouponCode("");
                              }}
                            >
                              {" "}
                              Remove Coupan
                            </p>
                          )}
                        </p>
                      </div>
                      <ul>
                        <li>
                          <h4>Your Points </h4>
                          <h4 className="price">{points}</h4>
                        </li>

                        <li>
                          <h4>Subtotal</h4>
                          <h4 className="price">₹{totalAmount.toFixed(2)}</h4>
                        </li>
                        <li>
                          <h4>Points Used </h4>
                          <h4 className="price">{reedemedPoints}</h4>
                        </li>
                        {/* <li>
                        <h4>Actual Amount</h4>
                        <h4 className="price">₹00.00</h4>
                      </li> */}
                        <li>
                          <h4>Coupon Discount</h4>
                          <h4 className="price">
                            ₹{discountValue ? discountValue : "---"}
                          </h4>
                        </li>

                        <li className="align-items-start">
                          <h4>Shipping Cost</h4>
                          <h4 className="price text-end">
                            {shipping === 0 ? "Free" : shipping}
                          </h4>
                        </li>
                        <li>
                          <h4>Total Cost</h4>
                          <h4 className="price">₹{calculatedPrice}</h4>
                        </li>
                      </ul>
                    </div>
                    <ul className="summery-total">
                      <li className="list-total border-top-0">
                        <h4>Total (INR)</h4>
                        <h4 className="price theme-color">
                          ₹{calculatedPrice}
                        </h4>{" "}
                        {/* Add shipping to total */}
                      </li>

                      <li>
                        <p>
                          Your total saving ₹{" "}
                          {savedAmount < 0 ? 0 : savedAmount}
                        </p>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="checkout-offer">
                    <div className="offer-title">
                      <div className="offer-icon">
                        <img
                          src="../assets/images/inner-page/offer.svg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="offer-name">
                        <h6>Available Offers</h6>
                      </div>
                    </div>
                    <ul className="offer-detail">
                      <li>
                        <p>
                          Combo: BB Royal Almond/Badam Californian, Extra Bold
                          100 gm...
                        </p>
                      </li>
                      <li>
                        <p>
                          Combo: Royal Cashew Californian, Extra Bold 100 gm +
                          BB Royal Honey 500 gm
                        </p>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-8">
                <div className="left-sidebar-checkout">
                  <div className="checkout-detail-box">
                    <ul>
                      <li>
                        <div className="checkout-icon">
                          <lord-icon
                            target=".nav-item"
                            src="https://cdn.lordicon.com/ggihhudh.json"
                            trigger="loop-on-hover"
                            colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                            className="lord-icon"
                          ></lord-icon>
                        </div>
                        <div className="checkout-box">
                          <div className="checkout-title">
                            <h4>Delivery Address</h4>
                          </div>

                          <div className="checkout-detail">
                            <Link onClick={handleToggleModal}>
                              <div className="d-flex gap-2 center mt-2">
                                <div>
                                  <GoPlus />
                                </div>
                                <div>Add new address</div>
                              </div>
                            </Link>
                            <div
                              className="overflow-auto"
                              style={{ maxHeight: "400px" }}
                            >
                              <div className="checkout-detail ">
                                <div className="col-12 d-flex flex-row gap-2">
                                  {address?.map((data, index) => (
                                    <div
                                      key={index}
                                      className=" align-items-center bg-white custom-accordion d-flex justify-content-between rounded-4 mb-4"
                                    >
                                      <div className="card p-3 border-0">
                                        <div className=" d-flex">
                                          <div className="form-check">
                                            <input
                                              className="form-check-input mt-1"
                                              type="radio"
                                              name="jack"
                                              id="flexRadioDefault1"
                                              value={data.address_id}
                                              onChange={(e) =>
                                                setAddress_id(e.target.value)
                                              }
                                            />
                                          </div>
                                          <div className="d-flex justify-content-between align-items-top gap-lg-5 ">
                                            <div className="badge bg-dangeer">
                                              <p className="p-1 rounded bg-danger">
                                                {data.address_type}
                                              </p>
                                            </div>
                                            <div>
                                              <Link>
                                                <div
                                                  onClick={() =>
                                                    handleEditModal(data)
                                                  }
                                                >
                                                  <FaPencil />
                                                </div>
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className="delivery-address-detail list-unstyled">
                                          <li>
                                            <h6 className="">{data.name}</h6>
                                          </li>
                                          <li>
                                            <p className="text-content">
                                              <span className="text-title">
                                                Address:{" "}
                                              </span>
                                              {data.flat}, {data.floor},{" "}
                                              {data.area}, {data.landmark},
                                              {data.state},
                                            </p>
                                          </li>
                                          <li>
                                            <h6 className="text-content">
                                              <span className="text-title">
                                                Pin Code:{" "}
                                              </span>
                                              {data.postal_code},
                                            </h6>
                                          </li>
                                          <li>
                                            <h6 className="text-content p-1">
                                              <span className="text-title">
                                                Phone:{" "}
                                              </span>{" "}
                                              {data.phone}
                                            </h6>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="checkout-icon">
                          <lord-icon
                            target=".nav-item"
                            src="https://cdn.lordicon.com/oaflahpk.json"
                            trigger="loop-on-hover"
                            colors="primary:#0baf9a"
                            className="lord-icon"
                          ></lord-icon>
                        </div>
                      </li>

                      <div className="checkout-container">
                        <div className="row justify-content-center">
                          {/* Time & Date Section */}
                          <div className="col-md-6 mb-2">
                            <div className="card checkout-card">
                              <div className="card-body">
                                <h2 className="text-center fw-bold">
                                  Choose a Time & Date
                                </h2>

                                <div className="slot-options">
                                  <input
                                    type="date"
                                    id="datePicker"
                                    className="form-control w-75 my-2"
                                    min={(() => {
                                      const tomorrow = new Date();

                                      // Set the date to tomorrow
                                      tomorrow.setDate(tomorrow.getDate() + 1);

                                      // Ensure that the date is adjusted to IST (Indian Standard Time: UTC +5:30)
                                      const offset = 5.5 * 60; // IST offset in minutes
                                      const istTime = new Date(
                                        tomorrow.getTime() + offset * 60000
                                      ); // Adjusting for IST

                                      // Set time to midnight to ensure it’s tomorrow at midnight IST
                                      istTime.setHours(0, 0, 0, 0);

                                      // Return the date in 'YYYY-MM-DD' format for the min attribute
                                      return istTime
                                        .toISOString()
                                        .split("T")[0];
                                    })()}
                                    onChange={(e) =>
                                      setDeliveryDate(e.target.value)
                                    }
                                  />
                                  {[
                                    "6 AM - 8 AM",
                                    "8 AM - 10 AM",
                                    "10 AM - 12 PM",
                                    "12 PM - 2 PM",
                                  ].map((slot, index) => (
                                    <div
                                      className="form-check mb-1"
                                      key={index}
                                    >
                                      <input
                                        className="form-check-input mx-2"
                                        type="radio"
                                        name="timeSlot"
                                        id={`slot${index}`}
                                        value={slot}
                                        checked={selectedSlot === slot}
                                        onChange={handleSlotChange}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`slot${index}`}
                                      >
                                        {slot}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Payment Options Section */}
                          <div className="col-md-6">
                            <div className="card checkout-card">
                              <div className="card-body">
                                <h2 className="text-center fw-bold my-2">
                                  Payment Option
                                </h2>
                                <div className="payment-options">
                                  <div className="form-check mb-2">
                                    <input
                                      className="form-check-input mx-2"
                                      type="radio"
                                      name="paymentMode"
                                      id="online"
                                      value="online"
                                      checked={paymentMode === "online"}
                                      onChange={(e) =>
                                        setPaymentMode(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="online"
                                    >
                                      Online Payment
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input mx-2"
                                      type="radio"
                                      name="paymentMode"
                                      id="cash"
                                      value="Cash On Delivery"
                                      checked={
                                        paymentMode === "Cash On Delivery"
                                      }
                                      onChange={(e) =>
                                        setPaymentMode(e.target.value)
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="cash"
                                    >
                                      Cash On Delivery
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="text-center mt-3">
                          <Link
                            className="btn theme-bg-color mb-2 text-white btn-md w-100 mt-4 fw-bold"
                            onClick={handlePayment}
                          >
                            {paymentLoading ? (
                              <span>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Processing...
                              </span>
                            ) : (
                              "Proceed to Checkout"
                            )}
                          </Link>
                        </div>
                      </div>

                      <li>
                        <div className="checkout-icon">
                          <lord-icon
                            target=".nav-item"
                            src="https://cdn.lordicon.com/qmcsqnle.json"
                            trigger="loop-on-hover"
                            colors="primary:#0baf9a,secondary:#0baf9a"
                            className="lord-icon"
                          ></lord-icon>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <RelevantProducts />
              </div>
            </div>
          </div>
        </section>
      )}

      <HomeAddressModal
        locations={locations}
        isOpen={isModalOpen}
        toggle={handleToggleModal}
        userId={userId}
        phone={phoneno}
        onClose={AddressModal}
      />

      <EditAddressModal
        locations={locations}
        isOpen={isEditModal}
        toggle={() => setIsEditModal(false)}
        data={selectedAddress}
        userId={userId}
        onClose={toggleEditModal}
      />

      <Footer />
      <CouponModal
        isModalOpen={isModalOpens}
        setIsModalOpen={setIsModalOpens}
        coupons={coupons}
        handleCouponClick={handleCouponClick}
      />
    </div>
  );
}

export default Checkout;
