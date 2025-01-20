import React from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";

function Page404() {
  return (
    <div className="container-fluid px-0 overflow-hidden ">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>

      <section className="breadcrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-contain">
                <h2>404 Page</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active">404</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-404 section-lg-space">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="image-404">
                <img
                  src="https://themes.pixelstrap.com/fastkart/assets/images/inner-page/404.png"
                  className="img-fluid blur-up lazyloaded"
                  alt=""
                />
              </div>
            </div>
            <div className="col-12">
              <div className="contain-404">
                <h3 className="text-content">
                  The page you are looking for could not be found. The link to
                  this address may be outdated or we may have moved the since
                  you last bookmarked it.
                </h3>
                <button
                  onclick="location.href = 'index.html';"
                  className="btn btn-md text-white theme-bg-color mt-4 mx-auto"
                >
                  Back To Home Screen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page404;
