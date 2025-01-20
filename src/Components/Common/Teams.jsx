import React from "react";
import Slider from "react-slick";

function Teams() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <section className="team-section section-lg-space">
      <div className="container-fluid-lg">
        <div className="about-us-title text-center">
          <h4 className="text-content">Our Creative Team</h4>
          <h2 className="center">fastkart team member</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="slider-user product-wrapper slick-initialized slick-slider slick-dotted">
              <div className="slick-list draggable">
                <Slider {...settings}>
                  {Array(8)
                    .fill()
                    .map((data, index) => {
                      return (
                        <div className="team-box" key={index}>
                          <div className="team-image">
                            <img
                              src="	https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/1.jpg"
                              className="img-fluid blur-up lazyloaded"
                              alt=""
                            />
                          </div>
                          <div className="team-name">
                            <h3>Anna Baranov</h3>
                            <h5>Marketing</h5>
                            <p>
                              cheeseburger airedale mozzarella the big cheese
                              fondue.
                            </p>
                            <ul className="team-media">
                              <li>
                                <a
                                  href="https://www.facebook.com/"
                                  className="fb-bg"
                                  tabIndex={0}
                                >
                                  <i className="fa-brands fa-facebook-f" />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://in.pinterest.com/"
                                  className="pint-bg"
                                  tabIndex={0}
                                >
                                  <i className="fa-brands fa-pinterest-p" />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://twitter.com/"
                                  className="twitter-bg"
                                  tabIndex={0}
                                >
                                  <i className="fa-brands fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a
                                  href="https://www.instagram.com/"
                                  className="insta-bg"
                                  tabIndex={0}
                                >
                                  <i className="fa-brands fa-instagram" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Teams;
