import React from 'react'

function HomePageBigBannerSkeletons() {
  return (
    <div className="col-xl-8 ratio_65">
  <div className="home-contain h-100  placeholder-glow">
    <div
      className="h-100 bg-size blur-up lazyloaded placeholder"
     
    >
      
    </div>
    <div className="home-detail p-center-left w-75">
      <div>
        <h6>
          Exclusive offer <span>30% Off</span>
        </h6>
        <h1 className="text-uppercase">
          Stay home &amp; delivered your
          <span className="daily">Daily Needs</span>
        </h1>
        <p className="w-75 d-none d-sm-block">
          Vegetables contain many vitamins and minerals that are good for your
          health.
        </p>
        <button className="btn btn-animation mt-xxl-4 mt-2 home-button mend-auto">
          Shop Now <i className="fa-solid fa-right-long icon" />
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default HomePageBigBannerSkeletons