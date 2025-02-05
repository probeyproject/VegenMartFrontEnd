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

  const cart = userState?.cart.length;
  const rewards = userState?.rewards;
  const points = rewards?.length > 0 ? rewards[0].points : 0;
  const [order, setOrder] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
                  <div className="profile-name">
                    <h3>{phoneno}</h3>
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
                          From your My Account Dashboard you have the ability to
                          view a snapshot of your recent account activity and
                          update your account information. Select a link below
                          to view or edit information.
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
                  <div className="cart-table order-table-2">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <tbody>
                          {order.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="text-center">
                                <h3>You have no order</h3>
                                <Link
                                  to="/"
                                  className="btn btn-animation btn-md fw-bold mt-3 mb-2"
                                >
                                  Continue to Shopping
                                </Link>
                              </td>
                            </tr>
                          ) : (
                            order
                              .slice()
                              .reverse()
                              .map((data) => {
                                let products = [];
                                try {
                                  products = JSON.parse(data.product); // Parse the product field
                                } catch (error) {
                                  console.error(
                                    "Error parsing product field:",
                                    error
                                  );
                                  products = []; // Fallback to an empty array
                                }

                                return (
                                  <tr key={data.order_id}>
                                    {Array.isArray(products) &&
                                      products.map((product) => {
                                        let productImages = [];
                                        try {
                                          productImages = JSON.parse(
                                            product.product_image.replace(
                                              /\\/g,
                                              ""
                                            )
                                          ); // Clean up and parse
                                        } catch (error) {
                                          console.error(
                                            "Error parsing product_image:",
                                            error
                                          );
                                          productImages = []; // Fallback to empty array
                                        }

                                        return (
                                          <div
                                            key={product.id}
                                            className="order-item d-flex justify-content-between"
                                          >
                                            <td className="product-detail">
                                              <div className="product border-0 d-flex">
                                                <Link
                                                  to={`/tracking/${data.order_id}`}
                                                  className="product-image me-3"
                                                >
                                                  {productImages.length > 0 ? (
                                                    <img
                                                    
                                                      src={productImages[0]} // Use the first image
                                                      className="img-fluid blur-up lazyloaded rounded-2"
                                                      alt={product.product_name}

                                                      style={{ width: "80px", height: "80px" }}
                                                    />
                                                  ) : (
                                                    <p>No image available</p>
                                                  )}
                                                </Link>
                                                <div className="product-detail">
                                                  <ul className="list-unstyled">
                                                    <li className="name fw-bold">
                                                      {product.product_name}
                                                    </li>
                                                    <li className="text-content">
                                                      Qty - {product.quantity}{" "}
                                                      {product.weight_type}
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="price">
                                              <h4 className="table-title text-content">
                                                Price
                                              </h4>
                                              <h6 className="theme-color">
                                                {product.price}
                                              </h6>
                                            </td>
                                            <td className="status">
                                              <h4 className="table-title text-content">
                                                Order Status
                                              </h4>
                                              <h6 className="theme-color">
                                                {data.order_status}
                                              </h6>
                                            </td>
                                            {data.order_status ===
                                              "Delivered" && (
                                              <td className="invoice">
                                                <h4 className="table-title text-content">
                                                  Invoice
                                                </h4>
                                                <a
                                                  href={data.invoice}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="btn btn-sm btn-success"
                                                >
                                                  Download
                                                </a>
                                              </td>
                                            )}
                                          </div>
                                        );
                                      })}
                                  </tr>
                                );
                              })
                          )}
                        </tbody>
                      </table>
                    </div>
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
