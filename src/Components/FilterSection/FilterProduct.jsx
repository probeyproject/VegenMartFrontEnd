import React, { useEffect, useState } from "react";
import ProductBox from "../ProductSection/ProductBox";
import axios from "axios";
import { baseUrl } from "../../API/Api";

function FilterProduct({
  selectedCategory,
  minPrice,
  maxPrice,
  selectedFoodPreferences,
}) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("Name (A to Z)");

  // Fetch filtered products
  const fetchFilteredProducts = async () => {
    setLoading(true);
    let apiUrl = `${baseUrl}/getAllProductByFilter`;

    const params = new URLSearchParams();
    if (selectedCategory) params.append("categoryName", selectedCategory);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (selectedFoodPreferences && selectedFoodPreferences.length > 0) {
      params.append("foodPreference", selectedFoodPreferences.join(","));
    }
    params.append("page", page); // Pass current page
    params.append("limit", 10); // Limit products per page

    try {
      const response = await axios.get(`${apiUrl}?${params.toString()}`);
      const { products: newProducts, totalPages: total } = response.data;

      if (page === 1) {
        // Reset products when page is 1 (reset filter or initial load)
        setProducts(applySorting(newProducts));
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...applySorting(newProducts),
        ]);
      }

      setTotalPages(total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setLoading(false);
    }
  };

  // Sorting handler
  function handleSortChange(event) {
    const selectedOption = event.target.value;
    setSortOption(selectedOption); // Update sort option
  }

  // Effect hook to trigger product fetch when filters or page change
  useEffect(() => {
    // Reset to the first page when filters or sort options change
    setPage(1);
    fetchFilteredProducts();
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    selectedFoodPreferences,
    sortOption,
  ]);

  // Effect hook to load more products when the page state changes
  useEffect(() => {
    if (page > 1) {
      fetchFilteredProducts(); // Fetch products for the next page
    }
  }, [page]); // Only run when `page` changes

  // Load more products when button is clicked
  const loadMore = () => {
    if (!loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  // Apply sorting to the fetched products
  const applySorting = (fetchedProducts) => {
    let sortedProducts;
    if (sortOption === "Price (High to Low)") {
      sortedProducts = [...fetchedProducts].sort(
        (a, b) => b.product_price - a.product_price
      );
    } else if (sortOption === "Price (Low to High)") {
      sortedProducts = [...fetchedProducts].sort(
        (a, b) => a.product_price - b.product_price
      );
    } else if (sortOption === "Name (A to Z)") {
      sortedProducts = [...fetchedProducts].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else {
      sortedProducts = [...fetchedProducts]; // Default sorting
    }

    return sortedProducts;
  };

  return (
    <div
      className="col-custom- wow"
      style={{ visibility: "visible", animationName: "fadeInUp" }}
      data-aos="fade-up"
    >
      <div className="show-button">
        <div className="filter-button-group mt-0">
          <div className="filter-button d-inline-block d-lg-none">
            <a>
              <i className="fa-solid fa-filter" /> Filter Menu
            </a>
          </div>
        </div>
        <div className="top-filter-menu">
          {/* Add sorting options or other filters here */}
        </div>
      </div>

      <div className="title title-flex">
        <div>
          <h3>Top Save Today</h3>
          <span className="title-leaf"></span>

          <div className="d-flex center gap-5">
            <div>
              <p>
                Don't miss this opportunity at a special discount just for this
                week.
              </p>
            </div>
            <div className="d-flex align-items-center">
              <p className="text-nowrap">Sort By</p>
              <select
                className="form-select ms-2"
                id="filterproduct"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option>Name (A to Z)</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-4 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
        {products.map((product, index) => (
          <div className="" key={index}>
            <ProductBox
              imageSrc={JSON.parse(product.product_image)}
              productName={product.product_name}
              weight={product.weight}
              weight_type={product.weight_type}
              currentPrice={product.product_price}
              product_id={product.product_id}
              minWeight={product.min_weight}
              discount_price={product.discount_price}
              inStock={product.stock}
              offers={product.offers}
              viewLink="view-product.html"
              compareLink="compare.html"
              wishlistLink="wishlist.html"
            />
          </div>
        ))}
      </div>

      <div className="load-more-btn d-flex justify-content-center mt-4">
        {loading ? (
          <button
            className="btn btn-lg btn-secondary d-flex align-items-center"
            disabled
            style={{ width: "200px", height: "50px" }}
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="ms-2">Loading...</span>
          </button>
        ) : (
          <button
            onClick={loadMore}
            className={`btn btn-animation btn-md fw-bold d-flex align-items-center ${
              page >= totalPages ? "btn-disabled" : ""
            }`}
            disabled={page >= totalPages}
            style={{ width: "200px", height: "50px" }}
          >
            {page >= totalPages ? (
              "No More Products"
            ) : (
              <>
                <span>See More</span>
                <i className="fas fa-arrow-down ms-2"></i>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterProduct;
