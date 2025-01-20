import React, { useState, useEffect } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Breadcum from "../Components/FilterSection/Breadcum";
import ShopByCategory from "../Components/FilterSection/ShopByCategory";
import SidebarFilter from "../Components/FilterSection/SidebarFilter";
import FilterProduct from "../Components/FilterSection/FilterProduct";
import Footer from "../Components/Common/Footer";
import { useLocation } from 'react-router-dom';

function FilterPage() {
  const [selectedCategory, setSelectedCategory] = useState(""); // To store selected category
  const [minPrice, setMinPrice] = useState(null); // State for minPrice
  const [maxPrice, setMaxPrice] = useState(null); // State for maxPrice
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState([]);

  const location = useLocation();

  const products = location?.state?.products;


  // Function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // Update selected category
  };

  // Function to handle min and max price filtering (can be called from SidebarFilter)
  const handlePriceFilter = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="container-fluid px-0 overflow-hidden ">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      {/* <Breadcum /> */}
      <ShopByCategory onCategorySelect={handleCategorySelect} />

      {/* main section */}
      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <SidebarFilter 
              onCategorySelect={handleCategorySelect} 
              onPriceFilter={handlePriceFilter}  // Passing price filter function to SidebarFilter
              onFoodPreferenceSelect={setSelectedFoodPreferences}
            />
         
            <FilterProduct 
              selectedCategory={selectedCategory} 
              minPrice={minPrice} 
              maxPrice={maxPrice}  // Pass the minPrice and maxPrice to FilterProduct
              selectedFoodPreferences={selectedFoodPreferences}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FilterPage;