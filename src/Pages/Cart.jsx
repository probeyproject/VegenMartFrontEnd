import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import Footer from "../Components/Common/Footer";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { GoPlus } from "react-icons/go";
import HomeAddressModal from "../Components/Account/Dashboard/HomeAddressModal";
import EditAddressModal from "../Components/Account/Dashboard/EditAddressModal";
import { FaPencil } from "react-icons/fa6";
import CartRow from "../Components/Common/CartRow";
import { RelevantProducts } from "../Components/Common/RelevantProducts";
import { baseUrl } from "../API/Api";
import RedeemPoints from "../Components/Common/RedeemPoints";
import CouponModal from "./CouponModal";
import "../CSS/CouponModal.css";
import easyinvoice from "easyinvoice";
import image from "../../public/Image/VegenMart-Logo-03.png";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
// import fs from "fs";
// const logoPath = "public/Image/VegenMart-Logo-03.png"; // Update with the correct relative path
// const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath, {
//   encoding: "base64",
// })}`;
function Cart() {
  const [carts, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [address, setAddress] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [discountValue, setDiscountValue] = useState("");
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
  const phone = userState?.user?.phone;
  const phoneno = phone?.slice(3);
  const [shipping, setShipping] = useState(29);
  const rewards = userState?.rewards;
  const points = rewards?.length > 0 ? rewards[0].points : 0;
  const [calculatedPrice, setCalculatedPrice] = useState();
  const [couponCodes, setCouponCodes] = useState("");
  const [coupons, setCoupons] = useState([]); // State to hold list of available coupons
  const [isModalOpens, setIsModalOpens] = useState(false); // Modal visibility state
  const [invoiceAddress, setInvoiceAddress] = useState({});
  // console.log(carts);

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

  async function fetchAllCart() {
    try {
      const response = await axios.get(
        `${baseUrl}/getAllCartByUserId/${userId}`
      );
      const data = await response?.data;
      // console.log(response.data);

      setCart(data);
      // Set default quantity for each cart item
      const initialQuantities = {};
      data?.forEach((cart) => {
        initialQuantities[cart.cart_id] = cart.unit; // Set quantity to cart's quantity
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  const validateCoupon = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${baseUrl}/coupons/validate`, {
        coupon_code: couponCode,
        user_id: userId,
      });

      setDiscountValue(response.data.coupon.discount_value);
      setResponseMessage(
        `${response.data.message}, Discount Value: ${discountValue}`
      );
      toast.success("Coupan Applyed Successfully!");
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getAddress = async () => {
    const response = await axios.get(`${baseUrl}/getAddressById/${userId}`);
    const data = await response.data;
    setAddress(data);
  };

  useEffect(() => {
    fetchAllCart();
    getAddress();
  }, []);
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
  }, [address_id]); // Add `address_id` as a dependency to re-run the effect when it changes

  // console.log(invoiceAddress);
  const totalAmount = carts?.reduce((acc, cart) => {
    const quantity = quantities[cart.cart_id] || 1; // Default to 1
    return acc + quantity * cart.product_price;
  }, 0);
  // console.log(totalAmount);
  useEffect(() => {
    // Check if totalAmount is >= 200 to set the shipping cost
    if (totalAmount >= 200) {
      setShipping(0); // Set shipping to 0 for totalAmount >= 200
    } else {
      setShipping(29); // Set shipping to 29 if totalAmount is less than 200
    }

    // Always recalculate the price including shipping
    setCalculatedPrice(totalAmount + (totalAmount >= 200 ? 0 : 29)); // Add shipping cost accordingly
  }, [totalAmount, discountValue]); // Trigger whenever totalAmount or discountValue changes

  // const totalAmount = carts?.reduce((acc, cart) => {
  //   const quantity = quantities[cart.cart_id] || 1; // Default to 1
  //   return acc + quantity * cart.total_price;
  // }, 0);

  useEffect(() => {
    // Subtract the discountValue from totalAmount
    const amountAfterDiscount = totalAmount - (discountValue || 0); // Default to 0 if discountValue is undefined or null

    // Check if amountAfterDiscount is >= 200 to set the shipping cost
    if (amountAfterDiscount >= 200) {
      setShipping(0); // Set shipping to 0 for amountAfterDiscount >= 200
    } else {
      setShipping(29); // Set shipping to 29 if amountAfterDiscount is less than 200
    }

    // Always recalculate the price including shipping
    setCalculatedPrice(
      amountAfterDiscount + (amountAfterDiscount >= 200 ? 0 : 29)
    ); // Add shipping cost accordingly
  }, [totalAmount, discountValue]); // Trigger whenever totalAmount or discountValue changes

  const getProductsData = () => {
    return carts.map((cart) => ({
      id: cart.id || cart.combo_id,
      product_name: cart.product_name || cart.combo_title,
      product_image: cart.product_image || cart.combo_image,
      product_price: cart.product_price || cart.combo_price, // Assuming this is the unique ID for the product // Retrieve quantity from quantities state
      unit: cart.weight || "Kg",
      weight_type: cart.weight_type, // Adjust as per your cart data
      price: cart.price, // Assuming this is the price for one unit
    }));
  };

  useEffect(() => {
    const products = getProductsData(); // Store product data in a variable

    // Set quantities based on the length of the products array
    setQuantity((prev) => ({
      ...prev,
      quantity: products.length, // Set quantity to the length of products
    }));
  }, [carts, quantities]);

  // Payment Function

  const handlePayment = async () => {
    // Check for required fields
    if (!address_id) {
      toast.warning("Please select an address.");
      return;
    }

    if (!paymentMode) {
      toast.warning("Please select a Payment Options.");
      return;
    }

    setPaymentLoading(true);

    const order_status = "Pending";
    // Data to be sent to your server
    const paymentData = {
      products: getProductsData(), // Replace with your actual products array
      totalPrice: calculatedPrice, // Assuming this is in rupees
      quantity: quantity, // Your quantity data
      address_id: address_id, // Your address ID
      deliveryDate: deliveryDate, // Your delivery date
      deliveryTimeSlot: selectedSlot, // Your delivery time slot
      payment_mode: paymentMode,
      orderStatus: order_status,
      shipping_cost: shipping,
    };

    try {
      // If paymentMode is "Cash On Delivery," call the API directly
      if (paymentMode === "Cash On Delivery") {
        const response = await axios.post(
          `${baseUrl}/create/order/${userId}`,
          paymentData
        );
        toast.success("Order created successfully with Cash On Delivery!");

        setPaymentLoading(false); // Stop loading here

        const orderId = response.data.orderId; // Ensure correct extraction of orderId
        if (orderId && orderId > 0) {
          navigate("/order", { state: { orderId: orderId } }); // Pass the order ID
        } else {
          console.error(
            "No orderId available or unexpected data structure:",
            orderId
          );
        }
        return;
      }

      // If paymentMode is "online," proceed with Razorpay
      if (paymentMode === "online") {
        // Proceed to call Razorpay without calling the API here
        const options = {
          key: `rzp_test_y06V2AOq27a4Lt`,
          amount: calculatedPrice * 100, // Convert to paise
          currency: "INR",
          name: "Vegenmart",
          description: "Product Purchases",
          // order_id will be set when creating the order via Razorpay
          handler: async (paymentResponse) => {
            toast.success("Payment Successful!");

            try {
              // Add a log here to confirm that this block is executed
              // console.log("Payment Response received:", paymentResponse);

              // Now call the API to create the order with payment details
              const orderData = {
                ...paymentData, // Use the same paymentData
                razorpayOrderId: paymentResponse.razorpay_order_id, // Add Razorpay order ID
                payment: paymentResponse.razorpay_payment_id, // Add Razorpay payment ID
              };

              // Log before making the final API call to create the order
              // console.log("Calling the API to create the order...");

              const finalResponse = await axios.post(
                `${baseUrl}/create/order/${userId}`,
                orderData
              );
              // console.log(finalResponse);

              const finalOrderId = finalResponse.data.orderId;

              // Log the response to verify it's correct
              // console.log("Final Order Response:", finalResponse);

              if (finalOrderId) {
                const invoiceData = {
                  sender: {
                    company: "VegenMart Tech India Pvt. Ltd",
                    address: "155/25E Karela Bagh",
                    city: "Prayagraj Uttar Pradesh",
                    country: "India",
                    // logo: logoBase64,
                  },
                  client: {
                    company: `${userState?.user?.name.split(" ")[0]}`, // Get from user data
                    address: `${invoiceAddress?.name} (${invoiceAddress?.phone}) ${invoiceAddress?.address_type},${invoiceAddress?.area},${invoiceAddress?.flat},${invoiceAddress?.floor},${invoiceAddress?.landmark},(${invoiceAddress?.postal_code}),${invoiceAddress?.state}`,
                    country: "India",
                    contact: `${userState?.user?.email || userState?.user?.phone}`,
                  },
                  products: paymentData.products.map((product) => ({
                    quantity: product.quantity,
                    description: product.product_name,
                    "Shipping Cost": 29,
                    price: product.product_price,
                  })),
                  information: {
                    number: finalOrderId, // Use finalOrderId here
                    date: new Date().toISOString().split("T")[0],
                  },
                  "bottom-notice": "Thank you for shopping with VegenMart!",
                };

                // Generate the invoice as Base64
                const invoice = await easyinvoice.createInvoice(invoiceData);
                const invoiceBase64 = invoice.pdf;

                // Log the generated invoice
                // console.log("Generated Invoice Base64:", invoiceBase64);
                try {
                  const response = await axios.post(
                    `${baseUrl}/upload-invoice`,
                    {
                      orderId: finalOrderId, // Pass the final order ID
                      userId,
                      invoiceBase64,
                    }
                  );

                  // console.log("Invoice upload response:", response);
                  toast.success("Invoice generated and sent successfully!");
                } catch (error) {
                  console.log(error);
                }
              }
            } catch (error) {
              console.error(
                "Error during order creation and invoice generation:",
                error
              );
              toast.error("Error during order creation. Please try again.");
            }
          },
          theme: {
            color: "#0da487",
          },
        };

        const razor = new window.Razorpay(options); // Access Razorpay directly
        razor.open();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false); // Ensure loading is stopped in case of error
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

  const handleCouponClick = (couponCode) => {
    setCouponCodes(couponCodes); // Copy the coupon code into the input field
    setIsModalOpens(false); // Close the modal after selection
  };

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <section className="breadcrumb-section pt-0">
              <div className="container-fluid-lg">
                <div className="row">
                  <div className="col-12">
                    <div className="breadcrumb-contain">
                      <h4 className="fs-5 fw-semibold"> Cart</h4>
                      <nav>
                        <ol className="breadcrumb mb-0">
                          <li className="breadcrumb-item">
                            <Link to={'/'}>
                              <i className="fa-solid fa-house" />
                            </Link>
                          </li>
                          <li className="breadcrumb-item active px-2">Cart</li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </section>  

      <section className="cart-section section-b-space">
        {carts.length === 0 ? (
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
        ) : (
          <div className="container ">
            <div className="row g-sm-5  g-3">
              <div className="mb-3 d-flex justify-content-center">
                <img src={image} style={{ height: "30px" }} alt="" />
              </div>
              <div className="d-flex bg-light card flex-column">
                {/* <div className="cart-table"> */}
                {/* <div className="table-responsive-xl"> */}

                {carts.map((cart, index) => {
                  // const imageUrls = JSON.parse(cart.product_image||cart.combo_image);
                  // console.log(imageUrls);
                  let imageUrls = [];

                  // Check if product_image exists and parse it
                  if (cart.product_image) {
                    imageUrls = JSON.parse(cart.product_image);
                  }
                  // If product_image doesn't exist, check and parse combo_image
                  else if (cart.combo_image) {
                    imageUrls = JSON.parse(cart.combo_image);
                  }

                  const firstImageUrl = imageUrls[0];

                  return (
                    <>
                      <CartRow
                        cart={cart}
                        key={cart.cart_id}
                        imgages={firstImageUrl}
                        fetchAllCart={fetchAllCart}
                      />
                    </>
                  );
                })}
              </div>

              <div
                className="d-flex flex-column justify-content-end align-items-end"
                // style={{ height: "100%" }}
              >
                <div className="mt-3">
                  <li>
                    <Link
                      className="btn btn-animation proceed-btn fw-bold"
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
                        "Process To Checkout"
                      )}
                    </Link>
                  </li>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>

              <div className="d-flex center p-3">
                <div className="checkout-icon">
                  <lord-icon
                    target=".nav-item"
                    src="https://cdn.lordicon.com/oaflahpk.json"
                    trigger="loop-on-hover"
                    colors="primary:#0baf9a"
                    className="lord-icon"
                  ></lord-icon>
                </div>

                <div>
                  <div className="checkout-title">
                    <h6>Delivery Address</h6>
                  </div>
                  <Link onClick={handleToggleModal}>
                    <div className="d-flex gap-2 center mt-2">
                      <div>
                        <GoPlus />
                      </div>
                      <div>Add new address</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div
                className="checkout-box overflow-auto"
                style={{ maxHeight: "400px" }}
              >
                <div className="checkout-detail ">
                  <div className="row g-2">
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
                                onChange={(e) => setAddress_id(e.target.value)}
                              />
                            </div>
                            <div className="d-flex justify-content-between align-items-center gap-lg-5">
                              <div className="label">
                                <label className="fw-bold">
                                  {data.address_type}
                                </label>
                              </div>
                              <div>
                                <Link>
                                  <div onClick={() => handleEditModal(data)}>
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
                                <span className="text-title">Address: </span>
                                {data.flat}, {data.floor}, {data.area},{" "}
                                {data.landmark},{data.state},
                              </p>
                            </li>
                            <li>
                              <h6 className="text-content">
                                <span className="text-title">Pin Code: </span>
                                {data.postal_code},
                              </h6>
                            </li>
                            <li>
                              <h6 className="text-content p-1">
                                <span className="text-title">Phone: </span>{" "}
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

              <div className="summery-box p-sticky container-xxl">
                <div className="summery-header  ">
                  <h6>Cart Total</h6>
                </div>
                <div className="bg-white mt-2 rounded-4 summery-contain">
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
                        className="btn-apply btn-apply-input"
                        type="submit"
                        onClick={validateCoupon}
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
                    <span className="">
                      {responseMessage && <p>{responseMessage}</p>}
                    </span>
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
                      <h4 className="price">₹{calculatedPrice.toFixed(2)}</h4>
                    </li>
                  </ul>
                </div>
                <ul className="summery-total">
                  <li className="list-total border-top-0">
                    <h4>Total (INR)</h4>
                    <h4 className="price theme-color">
                      ₹{calculatedPrice.toFixed(2)}
                    </h4>{" "}
                    {/* Add shipping to total */}
                  </li>
                </ul>
                <div className="button-group cart-button align-content-center justify-content-center d-flex">
                  <ul className="d-flex justify-content-center">
                    <li>
                      <Link
                        to="/"
                        className="btn btn-animation bg-white shopping-button text-light"
                      >
                        <i className="fa-solid fa-arrow-left-long" />
                        Return To Shopping
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Payment */}

              <div className=" d-flex center p-3">
                <div className="checkout-icon">
                  <lord-icon
                    target=".nav-item"
                    src="https://cdn.lordicon.com/qmcsqnle.json"
                    trigger="loop-on-hover"
                    colors="primary:#0baf9a,secondary:#0baf9a"
                    className="lord-icon"
                  ></lord-icon>
                </div>
              </div>

              <div className="checkout-box">
                <div className="checkout-detail p-3">
                  <div
                    className=" custom-accordion d-flex justify-content-between "
                    id="accordionFlushExample"
                  >
                    <div>
                      <div className="justify-content-center">
                        <div>
                          <h2 className="text-center fw-bold">
                            Choose a Time & Date
                          </h2>
                          <div className="cardshadow mt-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="timeSlot"
                                id="slot1"
                                value="6 AM - 8 AM"
                                checked={selectedSlot === "6 AM - 8 AM"}
                                onChange={handleSlotChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="slot1"
                              >
                                6 AM - 8 AM
                              </label>
                            </div>
                            <div className="form-check mb-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="timeSlot"
                                id="slot2"
                                value="8 AM - 10 AM"
                                checked={selectedSlot === "8 AM - 10 AM"}
                                onChange={handleSlotChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="slot2"
                              >
                                8 AM - 10 AM
                              </label>
                            </div>
                            <div className="form-check mb-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="timeSlot"
                                id="slot3"
                                value="10 AM - 12 PM"
                                checked={selectedSlot === "10 AM - 12 PM"}
                                onChange={handleSlotChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="slot3"
                              >
                                10 AM - 12 PM
                              </label>
                            </div>
                            <div className="form-check mb-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="timeSlot"
                                id="slot4"
                                value="12 PM - 2 PM"
                                checked={selectedSlot === "12 PM - 2 PM"}
                                onChange={handleSlotChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="slot4  "
                              >
                                12 PM - 2 PM
                              </label>
                            </div>

                            <div>
                              <input
                                type="date"
                                id="datePicker"
                                className="form-control w-75 mb-2"
                                onChange={(e) =>
                                  setDeliveryDate(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="mb-2 fw-bold">Payment Option</h2>
                  <div className="accordion-item">
                    <div className="accordion-header" id="flush-headingFour">
                      <div
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="true"
                      >
                        <div className="custom-form-check form-check mb-0">
                          <label className="form-check-label" htmlFor="online">
                            <input
                              className="form-check-input mt-0"
                              type="radio"
                              name="flexRadioDefault"
                              id="online"
                              value="online"
                              checked={paymentMode === "online"}
                              onChange={(e) => setPaymentMode(e.target.value)} // Set payment mode here
                            />
                            Online Payment
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-header" id="flush-headingOne">
                      <div
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                      >
                        <div className="custom-form-check form-check mb-0">
                          <label className="form-check-label" htmlFor="cash">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="cash"
                              value="Cash On Delivery"
                              checked={paymentMode === "Cash On Delivery"}
                              onChange={(e) => setPaymentMode(e.target.value)} // Set payment mode here
                            />
                            Cash On Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container mt-2">
                    <div className="row d-flex align-content-center justify-content-center">
                      <div className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">Prepaid Order</h5>
                            <p className="card-text">
                              You will get{" "}
                              <span className="badge bg-success">10% Points</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">COD Order</h5>
                            <p className="card-text">
                              You will get{" "}
                              <span className="badge bg-warning">5% Points</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    className="btn btn-animation proceed-btn fw-bold"
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
                      "Process To Checkout"
                    )}
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <RelevantProducts />
            </div>
          </div>
        )}
      </section>

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

export default Cart;
