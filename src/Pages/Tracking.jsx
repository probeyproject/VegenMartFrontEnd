import React, { useEffect, useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../API/Api";

// const orderDetails = [
//   {
//     description: "Order Placed",
//     date: "2 Jan 2025",
//     time: "12:30 PM",
//     location: "Noida",
//   },
//   {
//     description: "Preparing to Ship",
//     date: "02 Jan 2025",
//     time: "2:15 PM",
//     location: "Noida Sector 62",
//   },
//   {
//     description: "Shipped",
//     date: "02 Jan 2025",
//     time: "05:00 PM",
//     location: "Near Noida Sector 62",
//   },
//   {
//     description: "Delivered",
//     date: "03 Jan 2025",
//     time: "09:00 AM",
//     location: "At your doorstep",
//   },
// ];

function Tracking() {
  const [trackProduct, setTrackProduct] = useState([]);

  const { orderId } = useParams();

  const tarcking = async () => {
    const response = await axios.get(`${baseUrl}/trackingByOrderId/${orderId}`);
    const data = await response.data;
    setTrackProduct(data);
  };

  useEffect(() => {
    tarcking();
    const intervalId = setInterval(tarcking, 600000); // Fetch every 10 minutes
    return () => clearInterval(intervalId);
  }, [orderId]);

  const trackingStatus = trackProduct?.tracking?.status;

  const statuses = [
    "Order Confirmed",
    "Order Placed",
    "Preparing to Ship",
    "Out for Delivery",
    "Delivered",
  ];

  // Determine the index of the current status
  const currentIndex = statuses.indexOf(trackingStatus);

  // If status is not found, display loading
  if (currentIndex === -1) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid px-0 overflow-hidden ">
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
                <h2>Order Tracking</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="fa-solid fa-house" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Order Tracking</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="order-detail">
        <div className="container-fluid-lg">
          <div className="row g-sm-4 g-3">
            <div className="col-xxl-3 col-xl-4 col-lg-6 mb-2">
              <div
                style={{
                  maxHeight: "300px", // Adjust this to your desired height
                  overflowY:
                    trackProduct.products &&
                    Array.isArray(trackProduct.products) &&
                    trackProduct.products.length > 5
                      ? "scroll"
                      : "hidden",
                }}
              >
                {trackProduct.products &&
                Array.isArray(trackProduct.products) &&
                trackProduct.products.length > 0 ? (
                  trackProduct.products.map((data, index) => (
                    <div
                      key={index}
                      className="order-image d-flex justify-content-between center"
                    >
                      <div className="w-25 h-25">
                        <img
                          src={JSON.parse(data.product_image)[0]} // Use the first image if it's a JSON string
                          className="img-fluid blur-up lazyloaded"
                          alt={data.product_name}
                        />
                      </div>
                      <div>{data.product_name}</div>
                      <div className="div">{data.price}</div>
                    </div>
                  ))
                ) : (
                  <div>No products found.</div>
                )}
              </div>
            </div>
            <div className="col-xxl-9 col-xl-8 col-lg-6">
              <div className="row g-sm-4 g-3">
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-package text-content"
                      >
                        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1={12} y1="22.08" x2={12} y2={12} />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <h5 className="text-content">Total Amount</h5>
                      <h6 className="theme-color">{trackProduct.totalPrice}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-truck text-content"
                      >
                        <rect x={1} y={3} width={15} height={13} />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <h5 className="text-content">Payment Mode</h5>
                      <h6 className="theme-color">
                        {trackProduct.tracking
                          ? trackProduct.paymentMode
                          : "Loading..."}
                      </h6>
                      <img
                        src="../assets/images/inner-page/brand-name.svg"
                        className="img-fluid blur-up lazyloaded"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-map-pin text-content"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <h5 className="text-content">Location</h5>
                      <h6 className="theme-color">
                        {trackProduct.tracking
                          ? trackProduct.tracking.location
                          : "Loading..."}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-crosshair text-content"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <line x1={22} y1={12} x2={18} y2={12} />
                        <line x1={6} y1={12} x2={2} y2={12} />
                        <line x1={12} y1={6} x2={12} y2={2} />
                        <line x1={12} y1={22} x2={12} y2={18} />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <h5 className="text-content">Your Details</h5>
                      <p>
                        {trackProduct.tracking
                          ? trackProduct.tracking.name
                          : "Loading..."}
                      </p>
                      <p>
                        {trackProduct.tracking
                          ? trackProduct.tracking.phone
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-map-pin text-content"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx={12} cy={10} r={3} />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <p className="text-content">Destination</p>
                      <p>
                        {trackProduct.tracking
                          ? `${trackProduct.tracking.address_type}, 
                          ${trackProduct.tracking.flat}, 
                          ${trackProduct.tracking.floor}, 
                          ${trackProduct.tracking.area},  
                          ${trackProduct.tracking.landmark},  
                          ${trackProduct.tracking.state},  
                          ${trackProduct.tracking.postal_code}`
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-6">
                  <div className="order-details-contain">
                    <div className="order-tracking-icon">
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
                        className="feather feather-calendar text-content"
                      >
                        <rect
                          x={3}
                          y={4}
                          width={18}
                          height={18}
                          rx={2}
                          ry={2}
                        />
                        <line x1={16} y1={2} x2={16} y2={6} />
                        <line x1={8} y1={2} x2={8} y2={6} />
                        <line x1={3} y1={10} x2={21} y2={10} />
                      </svg>
                    </div>
                    <div className="order-details-name">
                      <h5 className="text-content">Estimated Time</h5>
                      <h4>3 Jan, 08:30 AM</h4>
                    </div>
                  </div>
                </div>
                <div className="col-12 overflow-hidden mb-5">
                  <ol className="progtrckr">
                    {statuses.map((status, index) => (
                      <li
                        key={index}
                        className={
                          index <= currentIndex
                            ? "progtrckr-done"
                            : "progtrckr-todo"
                        }
                      >
                        <h5>{status}</h5>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="order-table-section section-b-space">
      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table order-tab-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((order, index) => (
                    <tr key={index}>
                      <td>{order.description}</td>
                      <td>{order.date}</td>
                      <td>{order.time}</td>
                      <td>{order.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section> */}
      <Footer />
    </div>
  );
}

export default Tracking;
