import React, { useEffect, useState } from "react";
import SidePannel from "./SidePannel";
import Pannelproducts from "./Pannelproducts";
import "./PannelComp.css";
import HeaderTop from "../Header/HeaderTop";
import HeaderMiddle from "../Header/HeaderMiddle";
import HeaderBottom from "../Header/HeaderBottom";
import Footer from "../Common/Footer";
import { useParams } from "react-router-dom";

function PannelPage() {
  const { category } = useParams();
  console.log(category);
  
  const [data, setdata] = useState("Mushroom");

  useEffect(() => {
    setdata(category);
  }, [category]);
  return (
    <div className="_app_ overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <div className="_wrapper_">
        <SidePannel setdata={setdata} />
        <Pannelproducts data={data} />
      </div>
      <section className="">
        <div className="product-description mt-3 m-4">
          <div
            className="banner-contain nav-desh bg-size blur-up lazyloaded"
            style={{
              backgroundImage:
                'url("https://themes.pixelstrap.com/fastkart/assets/images/vegetable/banner/14.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              display: "block",
            }}
          >
            <img
              src="https://themes.pixelstrap.com/fastkart/assets/images/vegetable/banner/14.jpg"
              className="bg-img blur-up lazyload"
              alt=""
              style={{ display: "none" }}
            />
            <div className="banner-details p-center banner-b-space w-100 text-center">
              <div>
                <h6 className="ls-expanded theme-color mb-sm-3 mb-1">
                  OZONE WASHED
                </h6>
                <h2>VEGETABLES</h2>
                <p className="mx-auto mt-1">Get ₹50 off on your first order</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PannelPage;
