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

function Account() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(`1`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;
  const phone = userState?.user?.phone;
  const phoneno = phone?.slice(3);
  const wishlist = userState?.wishlists.length;
  const cart = userState?.cart.length;
  const rewards = userState?.rewards;
  const points = rewards?.length > 0 ? rewards[0].points : 0;
  const [order, setOrder] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
console.log("........",userId);
console.log("........",phoneno);


  const navigate = useNavigate();
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteModal = (addressId) => {
    setAddressToDelete(addressId); // Set the address ID to delete
    setIsModalDelete(true); // Open the delete modal
  };

  const handleEditModal = (address) => {
    setSelectedAddress(address); // Set the address ID to delete
    setIsEditModal(true); // Open the delete modal
  };

  const toggleDeleteModal = () => {
    setIsModalDelete(false);
    getAddress(); // Fetch addresses when modal is closed
  };

  const toggleEditModal = () => {
    setIsEditModal(false);
    getAddress();
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
      const data = response.data; // This is already parsed as JSON
      setOrder(data); // Assuming setOrder is defined in your component
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
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
    getAddress();
    OrderByUser();
  }, []);

  return (
    <div className="container-fluid px-0 overflow-hidden ">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <section className="user-dashboard-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-lg-4">
              <div className="dashboard-left-sidebar">
                <div class="close-button d-flex d-lg-none">
                  <button class="close-sidebar">
                    <i class="fa-solid fa-xmark"></i>
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
                      {console.log(phoneno)}
                      
                      <h3>{phoneno}</h3>
                    </div>
                  </div>
                </div>

                <Nav pills vertical className=" nav nav-pills user-nav-pills ">
                  <Link>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        My Order
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          toggle("3");
                        }}
                      >
                        My Addresses
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "4" })}
                        onClick={() => {
                          toggle("4");
                        }}
                      >
                        Manage Referrals
                      </NavLink>
                    </NavItem>
                  </Link>
                </Nav>
              </div>
            </div>
            <TabContent
              activeTab={activeTab}
              className="flex-grow-1 col-xxl-3 col-lg-4 dashboard-right-sidebar"
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12 tab-pane">
                    <div
                      className="tab-pane fade active show"
                      id="pills-dashboard"
                      role="tabpanel"
                    >
                      <div className="dashboard-home">
                        <div className="title">
                          <h3>My Dashboard</h3>
                          <span className="title-leaf">
                            
                          </span>
                        </div>
                        <div className="dashboard-user-name">
                          <h6 className="text-content">Hello,{userId}</h6>
                          <p className="text-content">
                            From your My Account Dashboard you have the ability
                            to view a snapshot of your recent account activity
                            and update your account information. Select a link
                            below to view or edit information.
                          </p>
                        </div>
                        <div className="total-box">
                          <div className="row g-sm-4 g-3">
                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                              <div className="total-contain">
                                <img
                                  src="../assets/images/svg/order.svg"
                                  className="img-1 blur-up lazyloaded"
                                  alt=""
                                />
                                <img
                                  src="../assets/images/svg/order.svg"
                                  className="blur-up lazyloaded"
                                  alt=""
                                />
                                <div className="total-detail d-flex flex-column align-items-center justify-content-center text-center">
                                  <div>
                                    <h5>Total Cart</h5>
                                  </div>
                                  <div>
                                    <h3>{cart || 0}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                              <div className="total-contain">
                                <img
                                  src="../assets/images/svg/wishlist.svg"
                                  className="img-1 blur-up lazyloaded"
                                  alt=""
                                />
                                <img
                                  src="../assets/images/svg/wishlist.svg"
                                  className="blur-up lazyloaded"
                                  alt=""
                                />
                                <div className="total-detail d-flex flex-column align-items-center justify-content-center text-center">
                                  <h5>Total Wishlist</h5>
                                  <h3>{wishlist || 0}</h3>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                              <div className="total-contain">
                                <img
                                  src="../assets/images/svg/wishlist.svg"
                                  className="img-1 blur-up lazyloaded"
                                  alt=""
                                />
                                <img
                                  src="../assets/images/svg/wishlist.svg"
                                  className="blur-up lazyloaded"
                                  alt=""
                                />
                                <div className="total-detail d-flex flex-column align-items-center justify-content-center text-center">
                                  <div>
                                    <h5>Total Reward Points</h5>
                                  </div>
                                  <div>
                                    <h3>{points || 0}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <div className="dashboard-order">
                  <div className="title">
                    <h3>My Orders History</h3>
                    <span className="title-leaf title-leaf-gray">
                      
                    </span>
                  </div>
                  <div className="">
                    <div className="cart-table order-table-2">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <tbody>
                            {order.length === 0 ? (
                              // Show this when there are no orders
                              <tr>
                                <td colSpan="4" className="text-center">
                                  <div className="d-flex flex-column align-items-center justify-content-center text-center">
                                    <div>
                                      <h3 className="mt-2">
                                        You have no order
                                      </h3>
                                    </div>

                                    <div>
                                      <Link
                                        to="/"
                                        className="btn btn-animation btn-md fw-bold mt-3 mb-2"
                                      >
                                        Continue to Shopping
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              order
                                .slice() 
                                .reverse()
                                .map((data) => (
                                  <tr key={data.order_id}>
                                    {Array.isArray(JSON.parse(data.product)) &&
                                      JSON.parse(data.product).map(
                                        (product) => (
                                          <div>
                                            <div
                                              key={product.id}
                                              className="d-flex"
                                            >
                                              <td className="product-detail">
                                                <div className="product border-0">
                                                  <Link
                                                    to={`/tracking/${data.order_id}`}
                                                    className="product-image"
                                                  >
                                                    {product.product_image &&
                                                    product.product_image
                                                      .length > 0 ? (
                                                      <img
                                                        src={
                                                          JSON.parse(product.product_image)[0]
                                                        }
                                                        className="img-fluid blur-up lazyloaded rounded-2"
                                                        alt={
                                                          product.product_name
                                                        } 
                                                        loading="lazy"// Use product name for alt text
                                                      />
                                                    ) : (
                                                      <p>No image available</p> // Fallback if no images are available
                                                    )}
                                                  </Link>

                                                  <div className="product-detail">
                                                    <ul>
                                                      <li className="name">
                                                        <a>
                                                          {product.product_name}
                                                        </a>
                                                      </li>
                                                      <li className="text-content">
                                                        Qty - {product.unit}{" "}
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
                                              <td className="price">
                                                <h4 className="table-title text-content">
                                                  Order Status
                                                </h4>
                                                <h6 className="theme-color">
                                                  {data.order_status}
                                                </h6>
                                              </td>

                                              <tr>
                                                {data.order_status ===
                                                  "Delivered" && (
                                                  <td className="price">
                                                    <h4 className="table-title text-content">
                                                      Invoice
                                                    </h4>
                                                    <Link
                                                      to={`/myInvoice/${data.order_id}`}
                                                    >
                                                      Download
                                                    </Link>
                                                  </td>
                                                )}

                                                {/* Other table cells go here */}
                                              </tr>
                                            </div>
                                            <hr />
                                          </div>
                                        )
                                      )}
                                  </tr>
                                ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="3">
                <div className="dashboard-profile">
                  <div className="title">
                    <h3>My Address</h3>
                    <span className="title-leaf"></span>
                  </div>
                  <div
                    className="profile-about dashboard-bg-box overflow-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <div className="row">
                      <div className="dashboard-title mb-3">
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
                          <div key={data.address_id} className="card mb-3 mt-4">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center mb-3">
                                  {data.address_type === "Home" ? (
                                    <FaHome size={20} className="me-2" />
                                  ) : data.address_type === "Office" ? (
                                    <FaBriefcase size={19} className="me-2" />
                                  ) : null}
                                  <h6 className="mb-0">{data.address_type}</h6>
                                </div>
                                <div className="mt-2 d-flex gap-3">
                                  <Link>
                                    <div onClick={() => handleEditModal(data)}>
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

                      <div className="col-xxl-5">
                        <div className="profile-image">
                          <img
                            src="../assets/images/inner-page/dashboard-profile.png"
                            className="img-fluid blur-up lazyloaded"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="4">
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
        // Pass the address ID to delete // Pass the confirm function to the modal
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
