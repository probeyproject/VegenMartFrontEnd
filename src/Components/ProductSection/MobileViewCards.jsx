import React from "react";
import CategoryProductCarousel from "../HomeSection/CategoryProductCarousel";

function MobileViewCards() {
  return (
    <div>
      <section className="product-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              {/* Example: Display products for category ID 1 */}
              <CategoryProductCarousel categoryId={7} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MobileViewCards;
