import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/1.png";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/userSlice";
import LoginModal from "../Common/LoginModal";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import { Modal, Offcanvas } from "react-bootstrap";
import NoLcation from "../../assets/images/location.jpg";
import { setSelectedLocation } from "../../slices/locationSlice";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContrxt";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUser } from "react-icons/fa6";

function HeaderMiddle() {
  const { user } = useSelector((store) => store.user);
  const [loginModal, setLoginModal] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleLoginModal = () => setLoginModal(!loginModal);
  const authenticated = useSelector((state) => state.user.authenticated);
  const userState = useSelector((state) => state.user);
  const cart = userState?.cart;
  const wishlist = userState?.wishlists;
  const [dropdowns, setDropdowns] = useState({}); // Track visibility of each dropdown
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // selected

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  const toggleoffCanvas = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Make the API call using axios
      const response = await axios.get(`${baseUrl}/logout`, {
        withCredentials: true, // To include cookies in the request
      });

      dispatch(logout());

      if (response.status === 200) {
        // If successful, you can perform additional tasks (e.g., redirect, state reset)
        console.log("Logged out successfully");
        window.location.reload();
        // Reload the current page
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      // Handle errors appropriately
      console.error("Error during logout:", error);
    }
  };

  // Function to handle input change and show suggestions
  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      // Only show suggestions after typing 3 characters or more
      setLoading(true);
      try {
        // Call the API to get suggestions
        const response = await axios.get(`${baseUrl}/search?q=${searchTerm}`);
        setSuggestions(response.data.products);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
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

  const handleAuth = (e, a) => {
    e.preventDefault();
    navigate(a); // Navigate if authenticated

    // Correctly prevent the default action

    if (user) {
    } else {
      toggleLoginModal(); // Open login modal if not authenticated
    }
  };

  // Fetch locations from the server
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getAllLocation`);
        setLocations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();

    // Check if there's a saved location in localStorage
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      const parsedLocation = JSON.parse(savedLocation);
      dispatch(setSelectedLocation(parsedLocation)); // Set location in Redux if available in localStorage
    }
  }, [dispatch]);

  const toggleDropdown = (categoryId) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle visibility for this category only
    }));
  };

  const fetchProductsByCategory = async (categoryId) => {
    // selected
    try {
      const response = await axios.get(
        `${baseUrl}/getCategoryById/${categoryId}`
      );
      const fetchedProducts = response.data;

      // After fetching, sort the products based on the selected sorting option
      // applySorting(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProductsByCategory(categoryId);
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const res = await axios.get(`${baseUrl}/getAllCategories`);
        // console.log(res?.data);
        setCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategory();
  }, []);

  // Handle location selection
  const handleLocationSelect = (location) => {
    dispatch(setSelectedLocation(location)); // Dispatch action to update the selected location in Redux store
    localStorage.setItem("selectedLocation", JSON.stringify(location)); // Store it in localStorage
    setShowModal(false); // Close the modal after selection
  };

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) => {
    const query = searchQuery.toLowerCase();
    return (
      location.society_name.toLowerCase().includes(query) ||
      location.address.toLowerCase().includes(query) ||
      location.pin_code.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <div className="top-nav top-header sticky-header">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="navbar-top">
                <button
                  className="navbar-toggler d-xl-none d-inline navbar-menu-button"
                  type="button"
                  color="primary"
                  onClick={toggleoffCanvas}
                >
                  <span className="navbar-toggler-icon">
                    <i className="fa-solid fa-bars"></i>
                  </span>
                </button>

                <Link to="/" className="web-logo nav-logo">
                  <img
                    src={logo}
                    className="img-fluid blur-up lazyloaded"
                    alt="Web logo"
                    onClick={() => "/"}
                  />
                </Link>

                <div className="row">
                  <div className="middle-box">
                    <div className="row d-flex flex-row">
                      <div className="col-md-6">
                        <div
                          className="location-box p-1"
                          style={{ width: "300px" }}
                          onClick={() => setShowModal(true)}
                        >
                          <button
                            onClick={() => setShowModal(true)}
                            className="btn location-button"
                          >
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
                          </button>
                          <div className="ms-2">
                            <button className="border-0 bg-white">
                              {selectedLocation
                                ? `${selectedLocation.society_name.substring(0, 40)}...`
                                : "Please Choose Location"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="">
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
                              className="btn btn-animation"
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
                                    navigate(`/detail_page/${item.product_id}`);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    borderBottom: "none",
                                  }}
                                >
                                  {item.product_name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
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
                    <li className="right-side onhover-dropdown">
                      <div className="delivery-login-box">
                        {authenticated && (
                          <FaUser className="text-danger fs-5 " />
                        )}
                      </div>

                      {!authenticated && (
                        <li className="product-box-contain">
                          <FaUser
                            className="fs-5 me-1"
                            style={{ color: "#D22860" }}
                          />
                          <Link to="/login">Login</Link>
                        </li>
                      )}
                      {authenticated && (
                        <div className="onhover-div onhover-div-login">
                          <ul className="user-box-name">
                            <li className="product-box-contain">
                              <Link to={`/myaccount`}>My Dashboard</Link>
                            </li>

                            <li className="product-box-contain">
                              <i />
                              <Link onClick={handleLogout}>Logout</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className="right-side">
                      <div className="onhover-dropdown header-badge">
                        <Link
                          onClick={(e) => handleAuth(e, "/cart")}
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
                          <span
                            className={`position-absolute top-0 start-100 translate-middle badge ${cart && cart.length > 0 ? "" : "d-none"}`}
                          >
                            {cart && cart.length}
                          </span>
                        </Link>
                      </div>
                    </li>

                    <li className="right-side">
                      <Link
                        onClick={(e) => handleAuth(e, "/mywhishlist")}
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
                        <span
                          className={`position-absolute top-0 start-100 translate-middle badge ${wishlist && wishlist.length > 0 ? "" : "d-none"}`}
                        >
                          {wishlist && wishlist.length}
                        </span>
                      </Link>
                    </li>

                    {/* <li className="right-side">
                      <a href="/contact" className="delivery-login-box">
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
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas Component */}
      <Offcanvas show={isOpen} onHide={toggleoffCanvas} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* sidebar */}
          <div className="offcanvas-header">
            <div className="row">
              {categories.map((category, index) => (
                <div className="col-6 mb-1" key={category.category_id}>
                  <a
                    href={`/pannelpage/${category.category_name}`}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "black",
                      backgroundColor:
                        selectedCategory === category.category_id
                          ? "#ebd7e0"
                          : "",
                    }}
                    className="category-card d-flex flex-column align-items-center border rounded shadow-sm p-2"
                  >
                    <img
                      src={category.category_url}
                      className="img-fluid rounded-circle mb-2"
                      alt="loading.."
                      style={{
                        height: "50px",
                        width: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <p
                      className="mb-0 text-center"
                      style={{ fontSize: "10px" }}
                    >
                      {category.category_name}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="offcanvas-body"></div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal for Location Selection */}
      <Modal
        show={showModal}
        className="custom-left-modal"
        onHide={() => setShowModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton className="d-flex justify-content-between">
          <Modal.Title className="location-title">
            Select Your Location
          </Modal.Title>

          {/* Search Input aligned to the right */}
          <input
            type="text"
            className="form-control input-search"
            placeholder="Search by society name, address, or pin code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "200px" }}
          />
        </Modal.Header>

        <Modal.Body className="modal-body-location">
          <div>
            {filteredLocations.length > 0 ? (
              <ul style={{ padding: 0, listStyleType: "none" }}>
                {filteredLocations.map((location) => (
                  <li
                    key={location.id}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      marginBottom: "5px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <div>
                      <strong>{location.society_name}</strong>
                      <p>{location.address}</p>
                    </div>
                    <div
                      style={{
                        padding: "5px",
                      }}
                    >
                      <strong>{location.pin_code}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="img-box">
                <img
                  className="no-location"
                  src={NoLcation}
                  alt="No Images At this time"
                />
                <p className="no-location">No location found...</p>
              </div>
            )}
          </div>

          {selectedLocation && (
            <div className="mt-3">
              <h5>Location Selected:</h5>
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <strong>Society Name:</strong> {selectedLocation.society_name}
                </p>
                <p>
                  <strong>Pincode:</strong> {selectedLocation.pin_code}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <LoginModal isOpen={loginModal} toggle={toggleLoginModal} />
    </>
  );
}

export default HeaderMiddle;
