import React, { useEffect, useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import { GoPlus } from "react-icons/go";
import { FaBriefcase, FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { jsPDF } from "jspdf";
import { IoIosArrowBack } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa6";
import { Input, Button, Form, FormGroup, Label } from "reactstrap";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { FaStaylinked } from "react-icons/fa6";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
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
import { LuClipboardList } from "react-icons/lu";

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

  const { user } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const parseUserData = (user) => {
    const nameParts =
      user.name && user.name !== "null null null"
        ? user.name.split(" ")
        : ["", ""];
    return {
      firstName: nameParts[0] !== "null" ? nameParts[0] : "",
      lastName: nameParts[1] !== "null" ? nameParts[1] : "",
      email: user.email !== "null" && user.email !== null ? user.email : "",
      phone: user.phone || "",
    };
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(parseUserData(user));
    }
  }, [user]);

  const handleSave = async () => {
    const updatedData = {
      firstName: userData.firstName || "null",
      lastName: userData.lastName || "null",
      email: userData.email || "null",
    };
    try {
      const response = await axios.put(
        `${baseUrl}/editUserById/${user?.id}`,
        updatedData
      );
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

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
              {/* Close Button (Mobile View) */}
              <div className="close-button d-flex d-lg-none">
                <button
                  className="close-sidebar"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Profile Section */}
              <div className="profile-box">
                <div className="cover-image">
                  <img
                    src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/cover-img.jpg"
                    className="img-fluid blur-up lazyloaded"
                    alt="Cover"
                  />
                </div>
                <div className="profile-contain">
                  <div className="profile-name d-flex gap-1 justify-content-center">
                    <h3>Hi,</h3> <h3>{phone}</h3>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation with Icons */}
              <Nav pills className="user-nav-pills">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => toggle("1")}
                  >
                    <FaRegUserCircle className="nav-icon" /> Account
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => toggle("2")}
                  >
                    <LuClipboardList className="nav-icon" />
                    My Orders
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => toggle("3")}
                  >
                    <FaMapMarkerAlt className="nav-icon" /> My Addresses
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => toggle("4")}
                  >
                    <FaUserFriends className="nav-icon" /> Manage Referrals
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
                        <h3>My Account</h3>
                        <span className="title-leaf"></span>
                      </div>

                      {/* User Profile Section */}
                      <div className="user-profile-section p-3">
                        <Form className="w-100">
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>First Name</Label>
                                <Input
                                  type="text"
                                  value={userData.firstName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      firstName: e.target.value,
                                    })
                                  }
                                  disabled={!isEditing}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                  type="text"
                                  value={userData.lastName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      lastName: e.target.value,
                                    })
                                  }
                                  disabled={!isEditing}
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Email</Label>
                                <Input
                                  type="email"
                                  value={userData.email}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      email: e.target.value,
                                    })
                                  }
                                  disabled={!isEditing}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Phone</Label>
                                <Input
                                  type="text"
                                  value={userData.phone}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <div className="d-flex justify-content-between mt-3">
                            {!isEditing ? (
                              <Button
                                color="primary"
                                onClick={() => setIsEditing(true)}
                              >
                                Edit Profile
                              </Button>
                            ) : (
                              <>
                                <Button color="success" onClick={handleSave}>
                                  Save Changes
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() => setIsEditing(false)}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </Form>
                      </div>

                      {/* Existing Dashboard Sections */}
                      <div className="total-box mt-4">
                        <Row className="g-sm-4 g-3">
                          <Col xl="4" lg="6" md="6" sm="12">
                            <div className="card shadow-sm">
                              <div className="total-detail p-3">
                                <h5>
                                  Total Cart: <span>{cart || 0}</span>
                                </h5>
                              </div>
                            </div>
                            <div className="card p-2 mt-3 d-flex flex-row justify-content-between align-items-center">
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
                          </Col>
                        </Row>
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
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAIKElEQVR4nO2daWxUVRTHn7sf9AsuaVHjLiKKgIpUNMSIDFIVwZIOLkiqNRUkBkEFY6LRFCt7RRLRGv0GbboIdO4daLFGUCNpLW7RKIhM5752OvdOZ0rVdoo95rxp6UJnaefNW6b3n5wUOo9y3/v13HPudp6iSElJSUlJSUlJSUlJSUlJSUlJpUbCPf6qUG1meagmsx0tWJNRFTowfkKK/jupoQrWZHwdrM042A8jQ4RqM2GQ1WQE8DMlXfUzlJ3PhGsmE658xslGxkk14/RHxukxldOAymlXrwXwe5HPyF7G6Qb8N17hvgd/hh5tQRjBmoyv8M+aZwyFcRpKZpmSTlJ59UQWIGtUQfepgv6tCgrJGBOkQ+XEzQR5jfndN+vRRq2bigakNjOk2F2sfc+ljJMVTNDDyQJIANB3jLtf9IZqLkkRkKBiV/l81Rkqp0V6eMKIjdNOldMdXuEecZ+vBfDoQEoVu6m5ed/lKqcfaf2/0SDEGWC6GCcfqu3kskTbj9kUBvChMIK1GZzXXXGlYhcBvHm2yl1LVE79poMQZ4BpY5y+BFB2TiL3omVaNZllGDN6rdRWMDw+9w3Yf5v+4EVsY4J+2xKsvk5JZzFOFuBvoNkPW00cSsgrXLlKugndXxX0fbMfsDp624LdrJI2gzpOSi3wUCFJqzp+vO7CRO65qGJ2dlHlg953K2c3FVU++JBiFfn9n1/MBD1ggYcJOlkt3lO8++4FAZpVzPYoVvGM3lE2pJMxQb74HcgFtgKC/S0TtMzsh6emzqpipcXYTWlQKmZ71lU8MFcxW6MN4E0t1bC1cDnkzpoBjkkTTTPnrCwoXrdca090T6GbFTuoWdBFo/3NK163HB6eOhk+2bwOqnd9apqVbCrU2oHtidlmThcqVpYvSK5nnARHC8Q5K0t7GP+dCphu2A5sTxwgbZYdPEbiRnIjcMekidpvqNkw0LAd2J647ebkG0uOUdQAWZZssHTYEYgWT1z5igVnbQNjFYjKiRjJLHHKpU2hJwnDbkBO/nMMenpOaV81L+F0u2IFNXFypV7rGY4hQPKy5wxKR/Pmzen/bN7gz4azaNfH+jkH9uxKCAjCQPX0dPcF+E4P33uFbccc6eMhR60zNsE1cD2XXR02AjJ8cCcdyazRJw+EkxV6wUgHICpagCwzD4jOu0McaQAEVxpN2zelJ4x0AaIKCl4/NX4rKeN0baqB5CWZZY3GEs2yYlmzoK8YDkQVZL/0EDp8t8UpMWGvLemQQGiUOEI69NpLnJBw87LeMNIphqiCQgsnMwwDogryvARCY2dbnDxrGBDGySYJhMYDst5IINVGAMnTOcvqy6Bqd+9KaZYVMbLbQCD0R+khNDYQTo4YCeQvCYTG67L+NAyItiAjsyyI7SHUbyCQ/vUPX9uX0Bnm2lQ0fvW11cm0V0TWR0wBghAGCv8uxyHUaCD9XVbfylmfTq+gjeG5LNXoLmtgUJceQs0P6gPT3sExxC9jiDAl7TVmYPifjeeyDB4Yko0SCI03MHzPOCDClS+B0JhAvJzkpd30e56F92VZavpdLlDRmDCYICcB6s8zBAYczr0qXO8sDzc+1R1ufBo6fn0VfC2lMqiLgSkvdRkHo2Gx6G5YDAOtq/EZ8PnKZZYlTmdYqw0Bgp4xFEafdfy2RgIRBm8DCjc426MBCTcukUBE5ACPITDiA3nGsoc5n7j/Pu2IWte/vtQPDAPkBSOBVEXvstZa9jBniXaI8/YRnV8c7WZrT9A9zjAgnYefnBCudwbOCOpHloKvtcLShzlLNhVqnpJSIJxsVIxWJNNyloUbnCG0rsYle1p85eGRDPjMMFfpZ1o7UgaE084T/v3jFStIq8QWo7ELpt8BZSUfmArkS1e59oA7Qt6Eri/9eBssvHvaCDyEbFOsIjykEqs63As5c6Hw5RdNBfLL9wc1IL80Hkro+sJVK6DgcUeC3kE4Hl5SrCRV0IJoDf64eDU8escUaFV/Nw1IuMsPi+7Ngo/Wvx33Wn/zHzD/zqmwY+sq600kjrDgzLfDNfiopxJyZk6H159fCt1hv2lQPt1aBI/dNQ28x3+Kes2pMIc3CvIg55474eiJqkRixyEAOEuxotRA9dXRtgjV7iuGeZMnwdr8peBjv5kCpKOdaTPIOMPrOfbDsJ6BMB66bRK4XVsSgdHW3LbvWsXKUjnJiXYDCGXRvdPhkWlT4J2Vy7TAafSY5JMt78LcW2+B7CmTYeWTubBhzSot4cCYgd0UekYiMBgnPVhDUrGDsEZhtBs55qmCkvdfgWWL5mpZjBkjd8cQwyywIMehxYyEuqnIjO4GxS7S4kl61FmEKF3VTrzH7npndrh+sTdc72zq/j7XOrUVo5b448Rt+sMTqSvxp4Hom8trWGx+Kb94woKRWDjS7Ieo6makxueru6jv/mwHpN9T6M408IyKoWVisZtCKAiju8Fpfm3FEY5RNtsSBMdsim6wZJGyZMX8dL4edbVUw7yChrCGpJLOwoEUrqqZ/bDVeMbpoeY2eo0yFoRTDfi6CsZpqwVBBCKvq0jDLiqxVxzR7dpbbswGIci/OIVu6IqfVYU1G5mgb2GfbTSISEUKUmyJanBWkyfoHtfsp8ujzRrr2zWRb7C21ZjyiGRe2+Btdd2EVXUYJxS3ZurgCSexKAxuYmtq3X+jMhal11sCAOrP8wqaxQR9Disk4NkLPBATebEkEf0vliSi93tH8Bq8Fktc4MZngLpzlbEuy722YazLcq9tkJKSkpKSkpKSkpKSkpKSkpJSbKz/AcFcBqxA71c9AAAAAElFTkSuQmCC"
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
                <div className="dashboard-profile p-3">
                  {/* Header Section */}
                  <div className="title p-3">
                    <h3>My Address</h3>
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

                  {/* Add Address Button */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <GoPlus size={20} className="text-primary" />
                    <Link
                      onClick={handleToggleModal}
                      className="text-primary fw-semibold"
                      style={{ textDecoration: "none" }}
                    >
                      Add new address
                    </Link>
                  </div>

                  {/* Full-Width Address List */}
                  <div className="address-list-container">
                    {address.map((data) => (
                      <div key={data.address_id} className="address-card">
                        {/* Address Content (Left Side) */}
                        <div className="address-content">
                          {/* Address Type Icon */}
                          <div className="address-header">
                            {data.address_type === "Home" ? (
                              <FaHome size={24} className="text-primary" />
                            ) : data.address_type === "Office" ? (
                              <FaBriefcase
                                size={22}
                                className="text-secondary"
                              />
                            ) : (
                              <FaMapMarkerAlt
                                size={22}
                                className="text-warning"
                              />
                            )}
                          </div>

                          {/* Name & Address */}
                          <div className="address-text-container">
                            <h6 className="mb-0 fw-bold text-dark">
                              {data.address_type}
                            </h6>

                            {/* Name (Fully Visible) */}

                            <div className="d-flex gap-1">
                              <div className="address-name">{data.name}</div>

                              {/* Address (Truncated if Needed) */}
                              <div className="address-text">
                                {data.flat}, {data.floor}, {data.area},{" "}
                                {data.landmark}, {data.state},{" "}
                                {data.postal_code}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Edit & Delete Icons (Right Side) */}
                        <div className="icon-actions">
                          <FaPencil
                            size={16}
                            className="text-success cursor-pointer"
                            onClick={() => handleEditModal(data)}
                          />
                          <RiDeleteBin5Line
                            size={16}
                            className="text-danger cursor-pointer"
                            onClick={() => handleDeleteModal(data.address_id)}
                          />
                        </div>
                      </div>
                    ))}
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
