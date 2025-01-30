import React, { useState, useEffect } from "react";
import { FaHome, FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa"; // Import relevant icons
import { GiHamburgerMenu } from "react-icons/gi"; // Example icon for categories
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/images/logo/1.png";
import "../../CSS/SidebarMobile.css";
import { GiMushroomGills } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import "./../../CSS/MobileMenu.css";
// import { baseUrl } from "../../API/Api";
function MobileMenu() {
  // product get api store

  // Offcanvas search

  const [showSearch, setShowSearch] = useState(false); // State for offcanvas search
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [dropdowns, setDropdowns] = useState({}); // Track visibility of each dropdown
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      setLoading(true);
      try {
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

  const handleSearchClick = () => {
    if (query) {
      navigate(`/filters/${query}`);
      setSuggestions([]);
      setShowSearch(false); // Close offcanvas after search
    }
  };

  const handleSuggestionClick = (product_id) => {
    setQuery(product_id);
    navigate(`/detail_page/${product_id}`);
    setShowSearch(false); // Close offcanvas
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

  // const [dropdowns, setDropdowns] = useState({
  //   home: false,
  //   about: false,
  //   services: false,
  //   main: false,
  // });

  // Function to toggle the visibility of the dropdown
  const toggleDropdown = (categoryId) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle visibility for this category only
    }));
  };

  const fetchProductsByCategoryId = async (categoryId) => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      const response = await fetch(
        `${baseUrl}/getProductbyCategory/${categoryId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setProducts(data); // Set products if available
        } else {
          setProducts([]); // If no products, set an empty array
        }
      } else {
        setError("Failed to fetch products.");
      }
    } catch (error) {
      setError("Error fetching products.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="mobile-menu d-md-none d-block mobile-cart">
      <ul>
        <li className="" style={{ background: "none", border: "none" }}>
          <Link to="/"  >
            <FaHome className="icli" />
            <span>Home</span>
          </Link>
        </li>
        {/* <li className="mobile-category">
          <Link
            data-bs-toggle="offcanvas"
            to="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <GiHamburgerMenu className="icli js-link " />
            <span>Category</span>
          </Link>
        </li> */}
        <li>
          <button
            onClick={() => setShowSearch(true)}
            className="btn btn-link"
            style={{ background: "none", border: "none" }}
          >
            <FaSearch className="icli" />
            <span>Search</span>
          </button>
        </li>
        <li>
          <Link to={"/mywhishlist"}>
            <FaHeart className="icli"  style={{ background: "none", border: "none" }}/>
            <span>My Wish</span>
          </Link>
        </li>
        <li  style={{ background: "none", border: "none" }}>
          <Link to={"/cart"} >
            <FaShoppingBag className="icli fly-cate" />
            <span>Cart</span>
          </Link>
        </li>
      </ul>
      <div style={{ position: "relative", zIndex: "9999" }}>
        {/* Offcanvas  sidebar for Mobile navbar*/}
        <div
          className="offcanvas offcanvas-start "
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          {" "}
          <div className="d-flex justify-content-between p-2">
            <Link to="/" className="web-logo nav-logo">
              <img
                src={logo}
                style={{ width: "150px" }}
                className="img-fluid blur-up lazyloaded"
                alt="Web logo"
                onClick={() => window.location.href("/")}
              />
            </Link>

            <button
              type="button"
              className="btn-close mt-2"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {/* sidebar */}
          <div className="offcanvas-header">
            <div className="sidenav">
              {categories.map((item) => (
                <div key={item.category_id}>
                  {/* Dropdown for each category */}
                  <button
                    className={`dropdown-btn text-dark ${dropdowns[item.category_id] ? "active" : ""}`}
                    onClick={() => {
                      fetchProductsByCategoryId(item.category_id); // Fetch products for this category
                      toggleDropdown(item.category_id); // Toggle the dropdown visibility for this category
                    }}
                  >
                    <span className="ms-1 text-capitalize">
                     <p className="text-capitalize"> {item.category_name}</p>
                     
                      {dropdowns[item.category_id] ? (
                        <IoIosArrowUp className="icons__right fs-1" />
                      ) : (
                        <IoIosArrowDown className="icons__right fs-1" />
                      )}
                    </span>
                  </button>
                  <div
                    className="dropdown-container"
                    style={{
                      display: dropdowns[item.category_id] ? "block" : "none",
                    }}
                  >
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : products.length === 0 ? (
                      <p>No products found</p>
                    ) : (
                      products.map((product, productIndex) => (
                        <a
                          href="#"
                          className="text-capitalize"
                          key={productIndex}
                          onClick={() =>
                            navigate(`/detail_page/${product.product_id}`)
                          }
                        >
                          <span data-bs-dismiss="offcanvacls">
                            <h1>jatin</h1>
                            {product.product_name}
                          </span>
                        </a>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="offcanvas-body"></div>
        </div>
      </div>

      <div>
        {/* Offcanvas Search */}
        <div
          className={`offcanvas-search-container ${showSearch ? "show" : ""}`}
        >
          <div
            className="offcanvas-search-overlay"
            onClick={() => setShowSearch(false)}
          ></div>
          <div className="offcanvas-search">
            <div className="offcanvas-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0 mt-1 ms-3">Search Products</h5>
              <button
                className="btn-close me-3"
                onClick={() => setShowSearch(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="input-group  search-bar">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search for products..."
                  value={query}
                  onChange={handleInputChange}
                />
                <button
                  onClick={handleSearchClick}
                  className="btn text-white btn-primary
                   search-button"
                  type="button"
                >
                  <FaSearch />
                </button>
              </div>
              {loading && (
                <div className="loading-spinner text-center my-3">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                </div>
              )}
              {suggestions.length > 0 && (
                <ul className="list-group suggestions-list">
                  {suggestions.map((item) => (
                    <li
                      key={item.product_id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(item.product_id)}
                    >
                      {/* {console.log(item)} */}
                      <span style={{ color: "black" }}>
                        {item.product_name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {!loading && query && suggestions.length === 0 && (
                <div className="text-center text-muted mt-3">
                  No results found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
