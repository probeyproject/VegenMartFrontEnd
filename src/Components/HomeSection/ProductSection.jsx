import React, { useEffect, useState } from "react";
import ProductBox from "../ProductSection/ProductBox";
import Slider from "react-slick";
import CategoryBox from "../ProductSection/CategoryBox";
import OfferBanner from "../ProductSection/OfferBanner";
import ProductList from "../ProductSection/ProductList";
import SeasonOffer from "../ProductSection/SeasonOffer";
import BlogSection from "../ProductSection/BlogSection";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import leaf from "../../assets/images/icon/leaf.svg";
import { VideoAds } from "./VideoAds";
import { useSelector } from "react-redux";
import { baseUrl } from "../../API/Api";
import ComboCardCarousel from "../ComboCards/ComboCardCarousel";
import vegenimg from "./image/Artboard 1.png";

import("../../CSS/ProductSection.css");

function ProductSection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Name (A to Z)");
  const [selectedCategory, setSelectedCategory] = useState(null); // selected

  const [banner, setBanner] = useState([]);
  const [sideBanner, setSideBanner] = useState([]);
  const [tasty, setTasty] = useState([]);
  const [fresh, setFresh] = useState([]);
  const [combo, setCombo] = useState([]);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const cart = userState?.cart;

  const fetchProductsByCategory = async (categoryId) => {
    // selected
    try {
      const response = await axios.get(
        `${baseUrl}/getCategoryById/${categoryId}`
      );
      const fetchedProducts = response.data;
      console.log(fetchedProducts);

      // After fetching, sort the products based on the selected sorting option
      applySorting(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProductsByCategory(categoryId);
  };

  async function fetchAllCategory() {
    try {
      const response = await axios.get(`${baseUrl}/getAllCategories`);
      // console.log(response);

      const data = await response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching of categories:", error);
    }
  }

  const applySorting = (fetchedProducts) => {
    let sortedProducts;

    if (sortOption === "Price (High to Low)") {
      sortedProducts = [...fetchedProducts].sort(
        (a, b) => a.product_price - b.product_price
      );
    } else if (sortOption === "Price (Low to High)") {
      sortedProducts = [...fetchedProducts].sort(
        (a, b) => b.product_price - a.product_price
      );
    } else if (sortOption === "Name (A to Z)") {
      sortedProducts = [...fetchedProducts].sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    } else {
      sortedProducts = [...fetchedProducts]; // Default sorting
    }

    setProducts(sortedProducts);
  };

  function handleSortChange(event) {
    const selectedOption = event.target.value;
    setSortOption(selectedOption); // Update sort option

    // Reapply sorting when the sort option changes
    if (selectedCategory !== null) {
      fetchProductsByCategory(selectedCategory);
    } else {
      applySorting(products); // If no category is selected, just sort the current products
    }
  }

  async function fetchComboCategory() {
    try {
      const response = await axios.get(`${baseUrl}/combo-vegitables`);
      const data = await response.data;
      setCombo(data);
    } catch (error) {
      console.error("Error fetching Combo:", error);
    }
  }

  async function fetchAllProduct() {
    try {
      const response = await axios.get(`${baseUrl}/cart`);
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const getBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/2`);
    const data = await response.data;
    setBanner(data);
  };

  const get2ndBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/7`);
    const data = await response.data;
    setSideBanner(data);
  };

  const getTastyVegBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/12`);
    const data = await response.data;
    setTasty(data);
  };

  const getFreshVegBanner = async () => {
    const response = await axios.get(`${baseUrl}/getBannerById/13`);
    const data = await response.data;
    setFresh(data);
  };

  const handleClick = async () => {
    navigate("/filter");
  };

  const settings = {
    dots: false, // Show pagination dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    arrows: true, // Enable arrows for navigation
    autoplay: false, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay interval to 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: true, // Show pagination dots
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 2, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    arrows: true, // Show navigation arrows
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
  };

  useEffect(() => {
    fetchAllCategory();
    get2ndBanner();
    getBanner();
    getFreshVegBanner();
    getTastyVegBanner();
    fetchComboCategory();
    AOS.init({
      duration: 500, // Duration of the animation in milliseconds
      easing: "ease-in-out", // Type of easing for the animation
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <section className="product-section">
      <div className="container-fluid-lg">
        <div className="row g-sm-4 g-3">
          <div className=" col-md-3 d-none d-md-block">
            <div className="p-sticky">
              <div
                className="aos-animate aos-init bg-white category-menu p-1"
                data-aos="fade"
              >
                <h3 className="text-center mb-4">Category</h3>
                <ul className="list-unstyled" style={{ gap: "3px" }}>
                  {categories.map((category) => (
                    <li key={category.category_id}>
                      <div
                        onClick={() => {
                          setSelectedCategory(category.category_id); // Update selected category on click
                          handleCategoryClick(category.category_id); // Call handler function
                        }}
                        className={`category-list d-flex align-items-center p-3 border rounded shadow-sm hover-shadow`}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedCategory === category.category_id
                              ? "#ebd7e0"
                              : "",
                        }}
                      >
                        <img
                          src={category.category_url}
                          className="img-fluid rounded-circle me-2"
                          alt={category.category_name}
                          style={{
                            maxWidth: "50px",
                            maxHeight: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <h5 className="mb-0">{category.category_name}</h5>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {banner.map((banners, index) => (
              <div key={index} className="ratio_156 pt-25 ">
                <div
                  className="home-contain bg-size blur-up lazyloaded"
                  style={{
                    backgroundImage: `url(${banners.banner_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    display: "block",
                  }}
                >
                  <img
                    // src={banners.banner_image}
                    src={banners.banner_image}
                    className="bg-img blur-up lazyload"
                    alt=""
                    style={{ display: "none" }}
                  />
                  <div className="home-detail p-top-left home-p-medium">
                    <div>
                      <h6 className="text-yellow home-banner">
                        {banners.banner_title}
                      </h6>
                      <h3 className="text-uppercase fw-normal">
                        <span className="theme-color fw-bold">
                          {banners.banner_offer_title.split(" ")[0]}
                        </span>{" "}
                        {banners.banner_offer_title.split(" ")[1]}
                      </h3>
                      <h3 className="fw-light">{banners.banner_title_small}</h3>
                      <button
                        onClick={handleClick}
                        className="btn btn-animation btn-md fw-bold mend-auto"
                      >
                        Shop Now <i className="fa-solid fa-arrow-right icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {sideBanner.map((data, index) => (
              <div key={index} className="ratio_medium section-t-space">
                <div className="home-contain hover-effect">
                  <img
                    src={data.banner_image}
                    className="img-fluid blur-up lazyloaded"
                    alt=""
                  />
                  <div className="home-detail p-top-left home-p-medium">
                    <div>
                      <h4 className="text-yellow text-exo home-banner">
                        Organic
                      </h4>
                      <h2 className="text-uppercase fw-normal mb-0 text-russo theme-color">
                        {data.banner_offer_title}
                      </h2>
                      <h2 className="text-uppercase fw-normal text-title">
                        {data.banner_title}
                      </h2>
                      <p className="mb-3">
                        Super Offer to {data.banner_offer}% Off
                      </p>
                      <button
                        onClick={handleClick}
                        className="btn btn-animation btn-md mend-auto"
                      >
                        Shop Now <i className="fa-solid fa-arrow-right icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="section-t-space">
              <div className="category-menu">
                <h3>Trending Products</h3>

                <ProductList />
              </div>
            </div>

            <div className="section-t-space">
              <div className="category-menu">
                <h3>Customer Comment</h3>
                <div className="review-box">
                  <div className="review-contain">
                    <h5 className="w-100">
                      We Care About Our Customer Experience
                    </h5>
                    <p>
                      Services is very good and also products are fresh and good
                      in quality.
                    </p>
                  </div>

                  <div className="review-profile">
                    <div className="review-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/review/1.jpg"
                        className="img-fluid blur-up lazyloaded"
                        alt=""
                      />
                    </div>
                    <div className="review-detail">
                      <h5>Tina Mehata</h5>
                      <h6>Prayagraj.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* row2  */}

          <div className="col-md-9">
            <div className="new_order">
              {/* <div className="new_order3 d-block d-md-none">
                <div className="title">
                  <h2 className="mt-4">Browse by Categories</h2>
                  <span className="title-leaf"></span>
                  <p>Top Categories Of The Week</p>
                </div>

                <div
                  className="category-slider-2 product-wrapper no-arrow slick-initialized slick-slider slick-dotted mb-4"
                  data-aos="fade-left"
                >
                  <CategoryBox />
                </div>
              </div> */}

              <div className="new_order1">
                <div className="row">
                  <div className="title title-grid  ">
                    <h2>Top Save Today</h2>
                    <span className="title-leaf"></span>
                    <div>
                      <p>
                        Don't miss this opportunity at a special discount just
                        for this week.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3 d-none d-sm-block">
                    <div className="d-flex justify-content-between">
                     <p className="mt-3 me-3 fw-bold fs-6 ">Sort By:</p>
                      <select
                        className="form-select text- w-50 "
                        id="filterproduct"
                        value={sortOption} // Set the current value to the selected sort option
                        onChange={handleSortChange} // Handle sort option change
                      >
                        <option>Name (A to Z)</option>
                        <option>Price (Low to High)</option>
                        <option>Price (High to Low)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-body-tertiary border mb-4 p-2 rounded-3 section-b-space">
                <div className="new_order2">
                  <div className="overflow-hidden  ">
                    <div className="product-box-slider no-arrow slick-initialized slick-slider">
                      <button
                        className="slick-prev slick-arrow"
                        aria-label="Previous"
                        type="button"
                        style={{ display: "inline-block" }}
                      >
                        Previous
                      </button>

                      <div className="product-container row overflow-x-scroll ">
                        {products.length > 0 ? (
                          products.map((product, i) => (
                            <div
                              key={product.product_id}
                              className="col-6 col-sm-4 col-md-4 col-lg-3 mb-4"
                            >
                              <div>
                                <ProductBox
                                  imageSrc={JSON.parse(
                                    product.product_image || '""'
                                  )}
                                  productName={product.product_name}
                                  currentPrice={product.product_price}
                                  product_id={product.product_id}
                                  inStock={product.stock}
                                  productDetails={product.product_details}
                                  productType={product.product_type}
                                  brand_name={product.brand_name}
                                  sku={product.sku}
                                  weight={product.weight}
                                  weight_type={product.weight_type}
                                  min_weight={product.min_weight}
                                  discount_price={product.discount_price}
                                  average_rating={product.average_rating}
                                  offers={product.offers}
                                  defaultWeight={
                                    cart?.some(
                                      (cartItem) =>
                                        cartItem.product_id ===
                                        product.product_id
                                    )
                                      ? cart.find(
                                          (cartItem) =>
                                            cartItem.product_id ===
                                            product.product_id
                                        )?.weight
                                      : undefined
                                  }
                                  defaultWeightType={
                                    cart?.some(
                                      (cartItem) =>
                                        cartItem.product_id ===
                                        product.product_id
                                    )
                                      ? cart.find(
                                          (cartItem) =>
                                            cartItem.product_id ===
                                            product.product_id
                                        )?.weight_type
                                      : undefined
                                  }
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <img
                            className="Defaultimage "
                            src={vegenimg}
                            
                            alt="Default Image"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="new_order3 d-none d-sm-block">
                  <div className="title">
                    <h2 className="mt-4">Browse by Categories</h2>
                    <span className="title-leaf"></span>
                    <p>Top Categories</p>
                  </div>

                  <div
                    className="category-slider-2 product-wrapper no-arrow slick-initialized slick-slider slick-dotted mb-4"
                    data-aos="fade-left"
                  >
                    <CategoryBox />
                  </div>
                </div>
              </div>
              <div className="bg-body-tertiary border p-2 rounded-3 section-b-space">
                <div className="">
                  <div className="row g-md-4 g-3">
                    {tasty?.map((data, index) => (
                      <div key={index} className="col-md-6 d-none d-lg-block" data-aos="zoom-in-right">
                        <div
                          className="banner-contain hover-effect bg-size blur-up lazyloaded"
                          style={{
                            backgroundImage: `url(${data.banner_image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            display: "block",
                          }}
                        >
                          <img
                            src={data.banner_image}
                            className="bg-img blur-up lazyload"
                            alt=""
                            style={{ display: "none" }}
                          />
                          <div className="banner-details p-center-left p-4">
                            <div>
                              <h3 className="text-exo">
                                {data.banner_offer}% offer
                              </h3>
                              <h4 className="text-russo fw-normal theme-color mb-2">
                                {data.banner_offer_title}
                              </h4>
                              <button
                                onClick={handleClick}
                                className="btn btn-animation btn-sm mend-auto"
                              >
                                Shop Now{" "}
                                <i className="fa-solid fa-arrow-right icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {fresh.map((data, index) => (
                      <div key={index} className="col-12 col-md-6" data-aos="zoom-in-left">
                        <div
                          className="banner-contain hover-effect bg-size blur-up lazyloaded"
                          style={{
                            backgroundImage: `url(${data.banner_image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            display: "block",
                          }}
                        >
                          <img
                            src={data.banner_image}
                            className="bg-img blur-up lazyload"
                            alt=""
                            style={{ display: "none" }}
                          />
                          <div className="banner-details p-center-left p-3">
                            <div>
                              <h3 className="text-exo">
                                {data.banner_offer}% offer
                              </h3>
                              <h4 className="text-russo fw-normal theme-color mb-2">
                                {data.banner_offer_title}
                              </h4>
                              <button
                                onClick={handleClick}
                                className="btn btn-animation btn-sm mend-auto"
                              >
                                Shop Now{" "}
                                <i className="fa-solid fa-arrow-right icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <Practics/> */}
                <VideoAds />

                <div className="title d-block">
                  <h2>Combo & Recipes</h2>
                  <span className="title-leaf"></span>
                  {/* <p>
                    These Combos is Offered By Us In Best Price With Combination
                    of Multiple Products.
                  </p> */}
                  <ComboCardCarousel />
                </div>

                <div className="product-box-slider no-arrow slick-initialized slick-slider h-100">
                  <button
                    className="slick-prev slick-arrow"
                    aria-label="Previous"
                    type="button"
                    style={{ display: "inline-block" }}
                  >
                    Previous
                  </button>

                  {/* <Slider {...settings}>
                  {combo && combo.length > 0 ? (
                    combo.map((product, index) => {
                      // Parse the product_image JSON string to an array
                      const images = JSON.parse(product.product_image);

                      // Convert the array to an object
                      const imageObject = images.reduce((obj, img, idx) => {
                        obj[idx] = img;
                        return obj;
                      }, {});

                      return (
                        <div key={index}>
                          <ProductBox
                            product_id={product.product_id}
                            imageSrc={imageObject} // Use the first image from the object
                            productName={product.product_name}
                            currentPrice={product.product_price}
                            weight={product.weight}
                            weight_type={product.weight_type}
                            minWeight={product.min_weight}
                            inStock={product.stock_type}
                            discount_price={product.discount_price}
                            compareLink={product.stock}
                            wishlistLink={product.stock}
                            offers={product.offers}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center">
                      <h5>Product not Present at this time</h5>
                    </div>
                  )}
                </Slider> */}
                </div>

                <OfferBanner />
              </div>

              <div
                className="best-selling-slider product-wrapper wow fadeInUp slick-initialized slick-slider slick-dotted"
                style={{ visibility: "visible", animationName: "fadeInUp" }}
              >
                <div className="slick-list draggable">
                  {/* <SeasonOffer /> */}

                  {/* <BlogSection /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
