import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  UncontrolledAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./customRangeSlider.css";
import { baseUrl } from "../../API/Api";

function SidebarFilter({ onCategorySelect, onPriceFilter, onFoodPreferenceSelect }) {
  const [value, setValue] = useState([10, 3000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [foodPreference, setFoodPreference] = useState([]);
  const [selectedFoodPreferences, setSelectedFoodPreferences] = useState([]);

  // Separate state for each accordion section
  const [isCategoriesOpen, setCategoriesOpen] = useState(true);
  const [isFoodPreferencesOpen, setFoodPreferencesOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/getAllCategories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        
      });
  }, []);

  useEffect(() => {
    const fetchFoodPreferences = async () => {
      try {
        const response = await fetch(`${baseUrl}/getAllProduct`);
        const data = await response.json();
        setFoodPreference(data);
      } catch (error) {
        console.error("Error fetching food preferences:", error);
      }
    };

    fetchFoodPreferences();
  }, []);

  const handleCategoryClick = (categoryName, categoryId) => {
    onCategorySelect(categoryName);
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const handleFoodPreferenceClick = (preference) => {
    setSelectedFoodPreferences((prevSelected) => {
      if (prevSelected.includes(preference)) {
        return prevSelected.filter((item) => item !== preference);
      } else {
        return [...prevSelected, preference];
      }
    });
  };

  useEffect(() => {
    onFoodPreferenceSelect(selectedFoodPreferences);
  }, [selectedFoodPreferences, onFoodPreferenceSelect]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFoodPreferences([]); // Clear food preferences as well
  };

  useEffect(() => {
    onPriceFilter(value[0], value[1]);
  }, [value, onPriceFilter]);

  return (
    <div
      className="col-custom-3 wow fadeInUp"
      style={{ visibility: "visible", animationName: "fadeInUp" }}
    >
      <div className="left-box">
        <div className="shop-left-sidebar">
          <div className="back-button">
            <h3>
              <i className="fa-solid fa-arrow-left" /> Back
            </h3>
          </div>

          <UncontrolledAccordion
            defaultOpen={["1"]}
            stayOpen
            className="accordion custom-accordion"
          >
            <AccordionItem className="accordion-item" targetId="1">
              <div className="filter-category">
                <div className="filter-title">
                  <h2>Filters</h2>
                  <a onClick={clearAllFilters} className="cursor-pointer">Clear All</a>
                </div>
                <ul>
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find(
                      (cat) => cat.category_id === categoryId
                    );
                    return (
                      category && (
                        <li
                          key={categoryId}
                          onClick={() =>
                            handleCategoryClick(
                              category.category_name,
                              categoryId
                            )
                          }
                        >
                          {category.category_name}
                        </li>
                      )
                    );
                  })}

                  {selectedFoodPreferences.map((preference) => (
                    <li key={preference} onClick={() => handleFoodPreferenceClick(preference)}>
                      {preference}
                    </li>
                  ))}
                </ul>
              </div>

              <AccordionHeader
                className="accordion-header"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                targetId="2"
              >
                Category
              </AccordionHeader>
              <AccordionBody
                style={{ display: isCategoriesOpen ? "block" : "none" }}
              >
                
                <ul className="category-list custom-padding custom-height">
                  {categories.map((item) => (
                    <li key={item.category_id}>
                      <div className="form-check ps-0 m-0 category-list-box">
                        <input
                          className="checkbox_animated"
                          type="checkbox"
                          id={item.category_id}
                          checked={selectedCategories.includes(
                            item.category_id
                          )}
                          onChange={() =>
                            handleCategoryClick(
                              item.category_name,
                              item.category_id
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={item.category_id}
                        >
                          <span className="name">{item.category_name}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionBody>
            </AccordionItem>

            <AccordionItem>
              <AccordionHeader 
              onClick={() => setFoodPreferencesOpen((prev) => !prev)}
               targetId="3">
                Food Preference
              </AccordionHeader>
              <AccordionBody style={{ display: isFoodPreferencesOpen ? "block" : "none" }}>
                <ul className="category-list custom-padding">
                  {foodPreference
                    ?.filter(
                      (item, index, self) =>
                        index === self.findIndex((t) => t.food_preference === item.food_preference)
                    )
                    .map((item) => (
                      <li key={item.product_id}>
                        <div className="form-check ps-0 m-0 category-list-box">
                          <input
                            className="checkbox_animated"
                            type="checkbox"
                            id={item.food_preference}
                            checked={selectedFoodPreferences.includes(item.food_preference)}
                            onChange={() => handleFoodPreferenceClick(item.food_preference)}
                          />
                          <label className="form-check-label" htmlFor={item.food_preference}>
                            <span className="name">{item.food_preference}</span>
                          </label>
                        </div>
                      </li>
                    ))}
                </ul>
              </AccordionBody>
            </AccordionItem>

            {/* Price Range Accordion */}
            <AccordionItem>
              <AccordionHeader 
              onClick={() => setPriceOpen((prev) => !prev)}
               targetId="4">
                Price
              </AccordionHeader>
              <AccordionBody
                style={{ display: isPriceOpen ? "block" : "none", width: '190px', marginLeft: '10px' }}
              >
                <div className="filterBox">
                  <RangeSlider
                    className="range custom-range-slider"
                    value={value}
                    onInput={setValue}
                    step={5}
                    min={10}
                    max={1000}
                  />
                  <div className="d-flex justify-content-between pt-2 pb-2 priceRange">
                    <span>
                      From:{" "}
                      <strong className="text-success">Rs: {value[0]}</strong>
                    </span>
                    <span>
                      To:{" "}
                      <strong className="text-success">Rs: {value[1]}</strong>
                    </span>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
