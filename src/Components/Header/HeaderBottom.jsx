import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TodayDeal from "../Common/TodayDeal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/Api";

function HeaderBottom() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState({});
  const [categoryProducts, setCategoryProducts] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const toggleModal = () => setModalOpen(!modalOpen);

  // Open the dropdown when hovering over the "All Categories" button
  const handleMouseEnter = () => setDropdownOpen(true);

  // Close the dropdown and reset hovered category when mouse leaves
  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setHoveredCategory(null);
  };

  // Fetch category details
  async function fetchCategories() {
    try {
      const response = await axios.get(`${baseUrl}/getProductByCategoryName`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  // Fetch products for a specific category when it is hovered
  const handleCategoryMouseEnter = async (categoryName) => {
    setHoveredCategory(categoryName);
    if (!categoryProducts[categoryName]) {
      try {
        const products = categories[categoryName] || [];
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryName]: products,
        }));
      } catch (error) {
        console.error("Error fetching products for category", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="sticky-header">
      <div className="container-fluid-lg">
        <div className="row">
          <div className="col-12">
            <div className="header-nav">
              <div className="header-nav-left">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={() => {}}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <DropdownToggle
                    className="dropdown-category ms-0"
                    tag="button"
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-align-left"
                    >
                      <line x1="17" y1="10" x2="3" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="17" y1="18" x2="3" y2="18"></line>
                    </svg> */}
                    <span>Categories</span>
                  </DropdownToggle>
                  <DropdownMenu
                    end
                    className="w-100"
                    onMouseLeave={handleMouseLeave}
                  >
                    {Object.keys(categories).map((categoryName, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          className="onhover-category-list"
                          header
                          onMouseEnter={() =>
                            handleCategoryMouseEnter(categoryName)
                          }
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <a
                            href="#"
                            className="category-name d-flex justify-content-between text-dark"
                          >
                            <div className="d-flex gap-1">
                              <h6 className="me-2">{categoryName}</h6>
                            </div>
                            <i className="fa-solid fa-angle-right"></i>
                          </a>
                          {/* Show the products when hovered over a category */}
                          {hoveredCategory === categoryName &&
                            categoryProducts[categoryName]?.length > 0 && (
                              <div
                                className="onhover-category-box"
                                style={{ paddingBottom: "76px" }}
                              >
                                <div className="list-1">
                                  {categoryProducts[categoryName].map(
                                    (product, subIndex) => (
                                      <div key={subIndex}>
                                        <ul>
                                          <li
                                            className="col-4 mb-2 text-body"
                                            style={{ listStyle: "none" }}
                                          >
                                            <a
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                navigate(
                                                  `/detail_page/${product.product_id}`
                                                )
                                              }
                                            >
                                              {product.product_name}
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="header-nav-middle">
                <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                  <div
                    className="offcanvas offcanvas-collapse order-xl-2"
                    id="primaryMenu"
                    style={{ visibility: "hidden" }}
                    aria-hidden="true"
                  >
                    <div className="offcanvas-header navbar-shadow">
                      <h5>Menu</h5>
                      <button
                        className="btn-close lead"
                        type="button"
                        data-bs-dismiss="offcanvas"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <ul className="navbar-nav">
                        {Object.keys(categories).length > 0 ? (
                          Object.entries(categories).map(
                            ([categoryName, categoryData], index) => (
                              <li key={index} className="nav-item dropdown">
                                <a
                                  className="nav-link dropdown-toggle "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span style={{ fontSize: "13px" }}>
                                    {categoryName}
                                  </span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-3 dropdown-menu-2">
                                  <div className="row">
                                    <div className="d-flex row dropdown-column">
                                      {categoryData.map((product) => (
                                        <Link
                                          key={product.product_id}
                                          className="dropdown-item"
                                          to={`/detail_page/${product.product_id}`}
                                        >
                                          {product.product_name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          )
                        ) : (
                          <p>No categories available</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TodayDeal modal={modalOpen} toggle={toggleModal} />
    </div>
  );
}

export default HeaderBottom;
