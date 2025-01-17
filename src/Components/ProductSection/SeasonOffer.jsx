import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../API/Api";


function SeasonOffer() {
  const [veg, setVeg] = useState([]);
  const navigate = useNavigate();

  const getSummryVegetable = async () => {
    const response = await axios.get(
      `${baseUrl}/getBannerById/11`
    );
    const data = await response.data;
    setVeg(data);
  };

  useEffect(() => {
    getSummryVegetable();
  }, []);

  const gotToProduct = async () => {
    navigate('/filter')
  }

  return (
    <>
    {veg.map((data,index)=>(
      <div key={index} className="section-t-space">
      <div
        className="banner-contain hover-effect bg-size blur-up lazyloaded"
        style={{
          backgroundImage:
            `url(${data.banner_image})`,
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
        <div className="banner-details p-center banner-b-space w-100 text-center">
          <div>
            
            <h6 className="ls-expanded theme-color mb-sm-3 mb-1">{data.banner_offer_title} </h6>
            <h2 className="banner-title">{data.banner_title}</h2>
            <h5 className="lh-sm mx-auto mt-1 text-content">
              Save up to {data.banner_offer}% OFF
            </h5>
            <button
               onClick={gotToProduct} 
              className="btn btn-animation btn-sm mx-auto mt-sm-3 mt-2"
            >
              Shop Now <i className="fa-solid fa-arrow-right icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    ))}
    </>
    
  );
}

export default SeasonOffer;
