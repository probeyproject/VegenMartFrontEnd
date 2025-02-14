import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../API/Api";
import { Link } from "react-router-dom";

const ProductItem = ({ productLink, imageSrc, productName, price }) => {
  return (
    <li className="bg-white m-0 border-0 rounded-3 shadow-sm">
      <div className="offer-product p-3 d-flex align-items-center">
        {/* Product Image */}
        <a
          href={`/detail_page/${productLink}`}
          className="offer-image d-block"
          style={{
            width: "60px",
            height: "60px",
            position: "relative",
          }}
          tabIndex={0}
        >
          <img
            src={imageSrc}
            className="bg-body-tertiary blur-up lazyloaded rounded-2 w-100 h-100"
            alt={productName}
            style={{
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </a>

        {/* Product Details */}
        <div className="offer-detail">
          <div>
            <Link
              to={`/detail_page/${productLink}`}
              className="text-title text-decoration-none"
              tabIndex={0}
            >
              <h6
                className="name"
                style={{ fontSize: ".9rem", fontWeight: "bold" }}
              >
                {productName.length > 12
                  ? productName.slice(0, 12) + "..."
                  : productName}
              </h6>
            </Link>
            <span style={{ fontSize: ".75rem", color: "#666" }}>1 KG</span>
            <h6
              className="price theme-color"
              style={{ fontSize: ".9rem", marginTop: "5px" }}
            >
              ₹{price}
            </h6>
          </div>
        </div>
      </div>
    </li>
  );
};

const ProductList = () => {
  const [tdProduct, setTdProduct] = useState([]);

  const getTrandingProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getTrendingProduct`);
      setTdProduct(response.data);
    } catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };

  useEffect(() => {
    getTrandingProduct();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <ul className=" p-2 product-list">
      {tdProduct.map((product) => (
        <ProductItem
          key={product.product_id} // Use unique ID instead of index
          productLink={product.product_id}
          imageSrc={JSON.parse(product.product_image)[0]}
          productName={product.product_name}
          price={product.product_price}
        />
      ))}
    </ul>
  );
};

export default ProductList;
