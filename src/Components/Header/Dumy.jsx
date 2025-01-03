import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import logo from "../../assets/images/logo/1.png";
import "./Header.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice";
import LoginModal from "../Common/LoginModal";
import axios from "axios";
import { baseUrl } from "../../API/Api";

function HeaderMiddle() {
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setModal(!modal);

  const toggleLoginModal = () => setLoginModal(!loginModal);

  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.user.authenticated);
  const cart = useSelector((state) => state.user.cart);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleoffCanvas = () => {
    setIsOpen(!isOpen);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#0DA487" : "#CCC",
      boxShadow: state.isFocused ? "0 0 0 1px #0DA487" : "none",
      "&:hover": {
        borderColor: "#0DA487",
      },
      backgroundColor: "#f7f7f7",
      borderRadius: "8px",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0DA487"
        : state.isFocused
        ? "#E0F5F1"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#E0F5F1", // Lighter shade of #0DA487 for hover effect
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#0DA487",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 11px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
    }),
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavigate = () => {
    navigate("/");
  };

  // Logic for search-box
  const [query, setQuery] = useState(""); // Search term state
  const [suggestions, setSuggestions] = useState([]); // Suggestions array
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle input change and show suggestions
  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      // Only show suggestions after typing 3 characters or more
      setLoading(true);
      try {
        // Call the API to get suggestions
        const response = await axios.get(
          `${baseUrl}/search?q=${searchTerm}`
        );
        setSuggestions(response.data.products);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]); // Clear suggestions if search term is less than 3 characters
    }
  };

  // Function to handle search action on enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(query); // Call the search function when Enter is pressed
    }
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    onSearch(query); // Call the search function when search button is clicked
  };

  // Define the onSearch function
  const onSearch = (searchTerm) => {
    if (searchTerm) {
      navigate(`/filters/${searchTerm}`);
      setSuggestions([]); // Clear suggestions after search
    }
  };

  return (
    <>
      <div className="top-nav top-header sticky-header">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="navbar-top">
                <button
                  class="navbar-toggler d-xl-none d-inline navbar-menu-button"
                  type="button"
                  color="primary"
                  onClick={toggleoffCanvas}
                >
                  <span class="navbar-toggler-icon">
                    <i class="fa-solid fa-bars"></i>
                  </span>
                </button>

                <Link to="/" className="web-logo nav-logo">
                  <img
                    src={logo}
                    className="img-fluid blur-up lazyloaded"
                    alt=""
                  />
                </Link>

                <div className="middle-box">
                  <div className="location-box">
                    <button className="btn location-button" onClick={toggle}>
                      <span className="location-arrow">
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
                          className="feather feather-map-pin"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx={12} cy={10} r={3} />
                        </svg>
                      </span>
                      <span className="locat-name">Your Location</span>
                      <i className="fa-solid fa-angle-down" />
                    </button>
                  </div>
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="I'm searching for product..."
                        value={query}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress} // Trigger search on Enter key
                      />
                      <button
                        onClick={handleSearchClick}
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
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
                          className="feather feather-search"
                        >
                          <circle cx={11} cy={11} r={8} />
                          <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                      </button>
                    </div>
                    {suggestions.length > 0 && (
                      <ul className="list-group mt-2 suggestions-list">
                        {suggestions.map((item) => (
                          <li
                            key={item.product_id}
                            className="list-group-item list-group-item-action"
                            onClick={() => {
                              setQuery(item.product_name);
                              navigate(`/filters/${item.product_name}`);
                            }}
                            style={{ cursor: "pointer", borderBottom: "none" }}
                          >
                            {item.product_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="rightside-box">
                  <div className="search-full">
                    <div className="input-group">
                      <span className="input-group-text">
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
                          className="feather feather-search font-light"
                        >
                          <circle cx={11} cy={11} r={8} />
                          <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="form-control search-type"
                        placeholder="Search here.."
                      />
                      <span className="input-group-text close-search">
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
                          className="feather feather-x font-light"
                        >
                          <line x1={18} y1={6} x2={6} y2={18} />
                          <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <ul className="right-side-menu">
                    <li className="right-side">
                      <div className="delivery-login-box">
                        <div className="delivery-icon">
                          <div className="search-box">
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
                              className="feather feather-search"
                            >
                              <circle cx={11} cy={11} r={8} />
                              <line x1={21} y1={21} x2="16.65" y2="16.65" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="right-side">
                      <a href="contact-us.html" className="delivery-login-box">
                        <div className="delivery-icon">
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
                            className="feather feather-phone-call"
                          >
                            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <div className="delivery-detail">
                          <h6>24/7 Delivery</h6>
                          <h5>+91 888 104 2340</h5>
                        </div>
                      </a>
                    </li>
                    <li className="right-side">
                      <Link
                        to="/mywhishlist"
                        className="btn p-0 position-relative header-wishlist"
                      >
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
                          className="feather feather-heart"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span className="position-absolute top-0 start-100 translate-middle badge">
                          2
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li className="right-side">
                      {authenticated ? (
                        <div className="onhover-dropdown header-badge">
                          <Link
                            to="/cart"
                            className="btn p-0 position-relative header-wishlist"
                          >
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
                              className="feather feather-shopping-cart"
                            >
                              <circle cx={9} cy={21} r={1} />
                              <circle cx={20} cy={21} r={1} />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="position-absolute top-0 start-100 translate-middle badge">
                              {cart.length > 0 ? cart.length + 1 : 0}
                              <span className="visually-hidden">
                                unread messages
                              </span>
                            </span>
                          </Link>
                        </div>
                      ) : (
                        () => handleNavigate
                      )}
                    </li>
                    <li className="right-side onhover-dropdown">
                      {/* <div className="delivery-login-box">
                        <div className="delivery-icon">
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
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                        </div>
                     
                      </div> */}
                      {!authenticated && (
                        <li className="product-box-contain">
                          <i />
                          <Link>Login</Link>
                        </li>
                      )}
                      <div className="onhover-div onhover-div-login">
                        <ul className="user-box-name">
                          {authenticated && (
                            <li className="product-box-contain">
                              <Link to="/myaccount">My Account</Link>
                            </li>
                          )}

                          {authenticated && (
                            <li className="product-box-contain">
                              <i />
                              <Link onClick={handleLogout}>Logout</Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal />

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="location-modal modal-fullscreen-sm-down"
        size="md"
      >
        <ModalHeader toggle={toggle}>
          <h5 className="modal-title">Choose your Delivery Location</h5>
          <p className="mt-1 text-content">
            Enter your address and we will specify the offer for your area.
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="location-list">
            <div className="disabled-box">
              <h6>Select a Location</h6>
            </div>

            <Select
              value={selectedOption}
              onChange={handleChange}
              options={[
                { label: "Alabama", value: "$130" },
                { label: "Arizona", value: "$150" },
                { label: "California", value: "$110" },
                { label: "Colorado", value: "$140" },
                { label: "Florida", value: "$160" },
                { label: "Georgia", value: "$120" },
                { label: "Kansas", value: "$170" },
                { label: "Minnesota", value: "$120" },
                { label: "New York", value: "$110" },
                { label: "Washington", value: "$130" },
              ]}
              placeholder="Select a Citi"
              styles={customStyles}
            />
          </div>
        </ModalBody>
      </Modal>

      <Offcanvas
        toggle={toggleoffCanvas}
        isOpen={isOpen}
        style={{ width: "70%" }}
        className=" order-xl-2"
      >
        <OffcanvasHeader
          toggle={toggleoffCanvas}
          className="offcanvas-header navbar-shadow"
        >
          Menu
        </OffcanvasHeader>
        <OffcanvasBody className="offcanvas-body">
          <strong>This is the Offcanvas body.</strong>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default HeaderMiddle;