import React, { useState } from "react";
import { FaHome, FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa"; // Import relevant icons
import { GiHamburgerMenu } from "react-icons/gi"; // Example icon for categories
import { Link } from "react-router-dom";
import MobileViewCategory from "./MobileViewCategory";



function MobileMenu() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
      };
    
      // Function to close the modal
      const closeModal = () => {
        setShowModal(false);
      };


  return (
    <div className="mobile-menu d-md-none d-block mobile-cart">
      <ul>
        <li className="active">
          <Link to="/">
            <FaHome className="icli" />
            <span>Home</span>
          </Link>
        </li>
        <li className="mobile-category">
          <Link onClick={openModal}>
            <GiHamburgerMenu className="icli js-link" />
            <span>Category</span>
          </Link>
        </li>
        <li>
          <a href="search.html" className="search-box">
            <FaSearch className="icli" />
            <span>Search</span>
          </a>
        </li>
        <li>
          <Link to={"/mywhishlist"}>
            <FaHeart className="icli" />
            <span>My Wish</span>
          </Link>
        </li>
        <li>
          <Link to={"/cart"}>
            <FaShoppingBag className="icli fly-cate" />
            <span>Cart</span>
          </Link>
        </li>
      </ul>
      <MobileViewCategory closeModal={closeModal} />
    </div>
  );
}

export default MobileMenu;
