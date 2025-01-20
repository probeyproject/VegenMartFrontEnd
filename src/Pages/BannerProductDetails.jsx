import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";

const BannerProductDetails = () => {
  return (
    <>
      <div className="container-fluid px-0 overflow-hidden">
        <header className="pb-md-4 pb-0">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </header>
        <section>
          <ul className="rectangle select-package">
            <li className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="size"
                id="small"
              />
              <label className="form-check-label" htmlFor="small">
                <span>1 KG</span>
              </label>
            </li>
            <li className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="size"
                id="medium"
              />
              <label className="form-check-label" htmlFor="medium">
                <span>2 KG</span>
              </label>
            </li>
            <li className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="size"
                id="large"
              />
              <label className="form-check-label" htmlFor="large">
                <span>3 KG</span>
              </label>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default BannerProductDetails;
