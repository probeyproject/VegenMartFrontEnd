import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../API/Api';
import { Link } from 'react-router-dom';

const ProductItem = ({ productLink, imageSrc, productName, price }) => {
  
  return (
    <li className='bg-white m-0 border-0 p-0 rounded-3'>
      <div className="offer-product p-2">
        <a href={`/detail_page/${productLink}`} className="offer-image" tabIndex={0}>
          <img src={imageSrc} className="bg-body-tertiary blur-up lazyloaded rounded-2 " alt={productName} />
        </a>
        <div className="offer-detail ">
          <div>
            <Link to={`/detail_page/${productLink}`} className="text-title" tabIndex={0}>
              <h6 className="name">{productName}</h6>
            </Link>
            <span>1 KG</span>
            <h6 className="price theme-color">₹{price}</h6>
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
      console.error('Error fetching trending products:', error);
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
          imageSrc={(JSON.parse(product.product_image))[0]}
          productName={product.product_name}
          price={product.product_price}
        />
      ))}
    </ul>
  );
};

export default ProductList;
