import React, { useState, useEffect } from "react";
import ProductBox from "../ProductSection/ProductBox";
import axios from "axios";
import "./Sidepage.css";
import { baseUrl } from "../../API/Api";

function Pannelproducts({ data }) {
  const [products, setProdcut] = useState([]);

  const getproduct = async () => {
    const response = await axios.get(
      `${baseUrl}/getProductByCategoryName/${data}`
    );
    const alldata = response.data;
    setProdcut(alldata);
  };

  console.log(products);
  useEffect(() => {
    getproduct();
  }, [data]);

  const sortedProducts = [...products].sort((a, b) =>
    a.stock === b.stock ? 0 : a.stock ? -1 : 1
  );

  return (
    <div className="cards_container overflow-hidden">
      <h2 className="_text_ mx-4">Buy <span className="text-danger">{data}</span></h2>
      <div className="filter_container">
        {sortedProducts.map((product, index) => {
          return (
            <div className="filter_cards_container" key={product.product_id}>
              <ProductBox
                imageSrc={JSON.parse(product.product_image)}
                productName={product.product_name}
                weight={product.weight}
                weight_type={product.weight_type}
                currentPrice={product.product_price}
                product_id={product.product_id}
                minWeight={product.min_weight}
                inStock={product.stock}
                discount_price={product.discount_price}
                inStos={product.offers}
                discountRanges={product.discountRanges}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pannelproducts;
