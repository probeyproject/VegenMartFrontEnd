import React, { useEffect, useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { GoPlus } from "react-icons/go";
import { FaBriefcase, FaHome } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { jsPDF } from "jspdf";
import { IoIosArrowBack } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa6";

import { FaStaylinked } from "react-icons/fa6";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import HomeAddressModal from "../Components/Account/Dashboard/HomeAddressModal";
import { useSelector } from "react-redux";
import axios from "axios";
import DeleteAddressModal from "../Components/Account/DeleteAddressModal";
import EditAddressModal from "../Components/Account/Dashboard/EditAddressModal";
import Referral from "../Components/Common/Referral";
import { baseUrl } from "../API/Api";
import "./Account.css";

function Account() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;
  const phone = userState?.user?.phone;
  const phoneno = phone?.slice(3);
  const wishlist = userState?.wishlists.length;
  console.log(userState);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const cart = userState?.cart.length;
  const rewards = userState?.rewards;
  const points = rewards?.length > 0 ? rewards[0].points : 0;
  const [order, setOrder] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const parseProducts = (productString) => {
    try {
      return JSON.parse(productString);
    } catch (error) {
      console.error("Error parsing product field:", error);
      return [];
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteModal = (addressId) => {
    setAddressToDelete(addressId);
    setIsModalDelete(true);
  };

  const handleEditModal = (address) => {
    setSelectedAddress(address);
    setIsEditModal(true);
  };

  const toggleDeleteModal = () => {
    setIsModalDelete(false);
    getAddress();
  };

  const toggleEditModal = () => {
    setIsEditModal(false);
    getAddress();
  };

  const toggleSidebar = () => {
    console.log("Toggling sidebar. Current state:", isSidebarOpen); // Debugging
    setIsSidebarOpen(!isSidebarOpen);
  };

  const AddressModal = () => {
    setIsModalOpen(!isModalOpen);
    getAddress();
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getAddress = async () => {
    const response = await axios.get(`${baseUrl}/getAddressById/${userId}`);
    const data = await response.data;
    setAddress(data);
  };

  const handleNavigate = () => {
    navigate("/myInvoice");
  };

  const OrderByUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getOrderByUserId/${userId}`);
      const data = response.data;
      console.log(data);

      setOrder(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  console.log(order);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getAllLocation`);
        setLocations(response.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    getAddress();
    OrderByUser();
  }, []);

  return (
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row">
            {/* Left Sidebar */}

            <div
              className={`col-lg-4 dashboard-left-sidebar p-3 ${
                isSidebarOpen ? "open" : ""
              }`}
            >
              <div className="close-button d-flex d-lg-none">
                <button
                  className="close-sidebar"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="profile-box">
                <div className="cover-image">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/cover-img.jpg"
                    className="img-fluid blur-up lazyloaded"
                    alt=""
                  />
                </div>
                <div className="profile-contain">
                  <div className="profile-name d-flex gap-1 justify-content-center">
                    <h3>Hi,</h3> <h3>{phone}</h3>
                  </div>
                </div>
              </div>

              <Nav pills className="user-nav-pills">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => toggle("1")}
                  >
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => toggle("2")}
                  >
                    My Order
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => toggle("3")}
                  >
                    My Addresses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => toggle("4")}
                  >
                    Manage Referrals
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            {/* Main Content */}
            <TabContent
              activeTab={activeTab}
              className={`flex-grow-1 col-xxl-8 col-lg-8 dashboard-right-sidebar ${
                isSidebarOpen ? "sidebar-open" : ""
              }`}
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div className="dashboard-home p-3">
                      <div className="title">
                        <h3>My Dashboard</h3>
                        <span className="title-leaf"></span>
                      </div>
                      <div className="dashboard-user-name">
                        <h6 className="text-content">Hello,</h6>
                        <p className="text-content">
                          From your My Dashboard you have the ability to view a
                          snapshot of your recent account activity and update
                          your account information. Select a link below to view
                          or edit information.
                        </p>
                      </div>
                      <div className="total-box">
                        <div className="row g-sm-4 g-3">
                          <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div className="card" style={{ width: "200px" }}>
                              <div className="total-detail p-2">
                                <h5>
                                  Total Cart: <span>{cart || 0}</span>
                                </h5>
                              </div>
                            </div>
                            <div className="card p-1 mt-3 d-flex flex-row justify-content-between align-items-end">
                              <span>
                                <TbTruckDelivery className="fs-4 ms-3 mb-2" />
                              </span>
                              <Nav>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => toggle("2")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    My Order
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </div>
                          </div>
                          <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div
                              className="card p-2 mb-3"
                              style={{ width: "200px" }}
                            >
                              <div className="total-detail">
                                <h5>
                                  Total Wishlist: <span>{wishlist || 0}</span>
                                </h5>
                              </div>
                            </div>
                            <div className="card p-1 d-flex flex-row justify-content-between align-items-end">
                              <span>
                                <FaRegAddressCard className="ms-3 fs-4 mb-2" />
                              </span>
                              <Nav>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => toggle("3")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    My Addresses
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </div>
                          </div>
                          <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                            <div
                              className="card p-2 mb-3"
                              style={{ width: "200px" }}
                            >
                              <div className="total-detail">
                                <h5>
                                  Total Reward Points:{" "}
                                  <span>{points || 0}</span>
                                </h5>
                              </div>
                            </div>
                            <div className="card p-1 d-flex flex-row justify-content-between align-items-end">
                              <span>
                                <FaStaylinked className="fs-4 ms-3 mb-2" />
                              </span>
                              <Nav>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => toggle("4")}
                                    style={{ cursor: "pointer" }}
                                  >
                                    My Referrals
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>

              {/* Other TabPanes (My Order, My Addresses, Manage Referrals) */}
              <TabPane tabId="2">
                <div className="dashboard-order">
                  <div className="title p-3">
                    <h3>My Orders History</h3>
                    <span className="title-leaf title-leaf-gray"></span>
                    <Nav>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => toggle("1")}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          <IoIosArrowBack />
                          Go Back
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <div className="container py-3">
                    {/* Order List */}
                    {selectedOrder === null ? (
                      <div>
                        {order.length === 0 ? (
                          <div className="text-center">
                            <h3 className="text-muted">You have no orders</h3>
                          </div>
                        ) : (
                          <div className="list-group">
                            {order
                              .slice()
                              .reverse()
                              .map((order) => (
                                <div
                                  key={order.order_id}
                                  className="list-group-item d-flex flex-column flex-md-row align-items-center gap-3"
                                >
                                  {/* Order Icon */}

                                  <img
                                    src="data:image/png;base64,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"
                                    alt="purchase-order"
                                    className="img-fluid rounded-circle border border-light"
                                    style={{ width: "60px", height: "60px" }}
                                  />

                                  {/* Order Details - Responsive Layout */}
                                  <div className="w-100">
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                      <h5 className="font-weight-bold mb-0">
                                        Order ID: {order.order_id}
                                      </h5>
                                      <p className="font-weight-bold text-primary mb-0">
                                        ₹{order.total_price}
                                      </p>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                      <p className="small text-muted mb-0">
                                        Delivery: {order.delivery_time_slot} on{" "}
                                        {new Date(
                                          order.delivery_date
                                        ).toDateString()}
                                      </p>
                                      <span
                                        className={`badge ${
                                          order.order_status === "Delivered"
                                            ? "bg-success"
                                            : "bg-warning"
                                        }`}
                                      >
                                        {order.order_status}
                                      </span>
                                    </div>
                                  </div>

                                  {/* View Details Button */}
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    View Details
                                  </button>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Order Details Section
                      <div className="container py-4">
                        {/* Back Button */}
                        <button
                          className="btn btn-secondary mb-4"
                          onClick={() => setSelectedOrder(null)}
                        >
                          ← Back to Orders
                        </button>

                        {/* Order Information - Responsive */}
                        <div className="card p-4 shadow-sm">
                          <div className="row">
                            {/* Left Section - Order Details */}
                            <div className="col-md-6 mb-3">
                              <p className="h6 text-muted mb-2">
                                <strong>Order ID:</strong>{" "}
                                {selectedOrder.order_id}
                              </p>
                              <p className="h6 text-muted mb-2">
                                <strong>Total Price:</strong>{" "}
                                <span className="text-success">
                                  ₹{selectedOrder.total_price}
                                </span>
                              </p>
                              <p className="h6 text-muted mb-2">
                                <strong>Delivery:</strong>{" "}
                                {selectedOrder.delivery_time_slot} on{" "}
                                <span className="text-primary">
                                  {new Date(
                                    selectedOrder.delivery_date
                                  ).toDateString()}
                                </span>
                              </p>
                            </div>

                            {/* Right Section - Status & Payment */}
                            <div className="col-md-6 mb-3 text-md-end">
                              <p className="h6 text-muted mb-2">
                                <strong>Status:</strong>{" "}
                                <span
                                  className={`badge px-3 py-2 ${selectedOrder.order_status === "Delivered" ? "bg-success" : "bg-warning"}`}
                                >
                                  {selectedOrder.order_status}
                                </span>
                              </p>
                              <p className="h6 text-muted mb-2">
                                <strong>Payment Mode:</strong>{" "}
                                {selectedOrder.payment_mode}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Products Section */}
                        <h5 className="font-weight-bold mt-4">Products</h5>
                        <ul className="list-group">
                          {parseProducts(selectedOrder.product).map(
                            (product) => {
                              let productImages = [];
                              try {
                                productImages = JSON.parse(
                                  product.product_image.replace(/\\/g, "")
                                );
                              } catch (error) {
                                console.error(
                                  "Error parsing product_image:",
                                  error
                                );
                                productImages = [];
                              }

                              return (
                                <li
                                  key={product.id}
                                  className="list-group-item d-flex flex-column flex-md-row align-items-center gap-3 border rounded shadow-sm p-3"
                                >
                                  {/* Product Image */}
                                  <img
                                    src={
                                      productImages.length > 0
                                        ? productImages[0]
                                        : "https://via.placeholder.com/80"
                                    }
                                    alt={product.product_name}
                                    className="img-fluid rounded-circle border border-light shadow-sm"
                                    style={{ width: "80px", height: "80px" }}
                                  />

                                  {/* Product Details */}
                                  <div className="flex-grow-1">
                                    <p className="font-weight-bold mb-1">
                                      {product.product_name}
                                    </p>
                                    <p className="small text-muted mb-0">
                                      Qty: {product.unit} {product.weight_type}{" "}
                                      |{" "}
                                      <span className="text-success">
                                        ₹{product.price}
                                      </span>
                                    </p>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </ul>

                        {/* Download Invoice */}
                        <div className="text-center mt-4">
                          <a
                            href={selectedOrder.invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success px-4 py-2"
                          >
                            📄 Download Invoice
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="3">
                <div className="dashboard-profile">
                  <div className="title p-3 mb-5">
                    <h3>My Address</h3>
                    <span className="title-leaf"></span>
                    <Nav>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => toggle("1")}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          <IoIosArrowBack />
                          Go Back
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <div
                      className="profile-about dashboard-bg-box overflow-auto"
                      // style={{ maxHeight: "400px" }}
                    >
                      <div className="row">
                        <div className="dashboard-title">
                          <h3>My Addresses</h3>
                        </div>
                        <div className="table-responsive">
                          <Link onClick={handleToggleModal}>
                            <div className="d-flex gap-3 center">
                              <div>
                                <GoPlus />
                              </div>
                              <div>Add new address</div>
                            </div>
                          </Link>

                          {address.map((data) => (
                            <div
                              key={data.address_id}
                              className="card mb-3 mt-4"
                            >
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex align-items-center mb-3">
                                    {data.address_type === "Home" ? (
                                      <FaHome size={20} className="me-2" />
                                    ) : data.address_type === "Office" ? (
                                      <FaBriefcase size={19} className="me-2" />
                                    ) : null}
                                    <h6 className="mb-0">
                                      {data.address_type}
                                    </h6>
                                  </div>
                                  <div className="mt-2 d-flex gap-3">
                                    <Link>
                                      <div
                                        onClick={() => handleEditModal(data)}
                                      >
                                        <FaPencil />
                                      </div>
                                    </Link>
                                    <Link>
                                      <div
                                        onClick={() =>
                                          handleDeleteModal(data.address_id)
                                        }
                                      >
                                        <RiDeleteBin5Line />
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                                <div className="d-flex gap-5">
                                  <div className="work-info-details">
                                    <span className="text-muted">
                                      {data.name}
                                    </span>
                                    <br />
                                    <span>
                                      {data.phone && data.phone.length > 3
                                        ? data.phone.slice(3)
                                        : data.phone}
                                      , {data.flat}, {data.floor}, {data.area},{" "}
                                      {data.landmark}, {data.state},{" "}
                                      {data.postal_code}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="4">
                <Nav>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === "1",
                      })}
                      onClick={() => toggle("1")}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      <IoIosArrowBack />
                      Go Back
                    </NavLink>
                  </NavItem>
                </Nav>
                <Referral />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </section>

      <HomeAddressModal
        locations={locations}
        isOpen={isModalOpen}
        toggle={handleToggleModal}
        userId={userId}
        phone={phoneno}
        onClose={AddressModal}
      />
      <DeleteAddressModal
        isOpen={isModalDelete}
        toggle={() => setIsModalDelete(false)}
        addressId={addressToDelete}
        onClose={toggleDeleteModal}
      />
      <EditAddressModal
        locations={locations}
        isOpen={isEditModal}
        toggle={() => setIsEditModal(false)}
        data={selectedAddress}
        userId={userId}
        onClose={toggleEditModal}
      />
    </div>
  );
}

export default Account;
