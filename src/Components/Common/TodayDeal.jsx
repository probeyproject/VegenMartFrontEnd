import React from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

function TodayDeal({ modal, toggle }) {
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        <div>
          <h5 className="modal-title w-100">Deal Today</h5>
          <p className="mt-1 text-content">Recommended deals for you.</p>
        </div>
      </ModalHeader>
      <ModalBody className="position-relative p-0">
        <div className="deal-offer-box">
          <ul className="deal-offer-list">
            <li className="list-1">
              <div className="deal-offer-contain">
                <a href="shop-left-sidebar.html" className="deal-image">
                  <img
                    src="../assets/images/vegetable/product/10.png"
                    className="blur-up lazyloaded"
                    alt=""
                  />
                </a>
                <a href="shop-left-sidebar.html" className="deal-contain">
                  <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                  <h6>
                    $52.57 <del>57.62</del> <span>500 G</span>
                  </h6>
                </a>
              </div>
            </li>
            <li className="list-2">
              <div className="deal-offer-contain">
                <a href="shop-left-sidebar.html" className="deal-image">
                  <img
                    src="../assets/images/vegetable/product/11.png"
                    className="blur-up lazyloaded"
                    alt=""
                  />
                </a>
                <a href="shop-left-sidebar.html" className="deal-contain">
                  <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                  <h6>
                    $52.57 <del>57.62</del> <span>500 G</span>
                  </h6>
                </a>
              </div>
            </li>
            <li className="list-3">
              <div className="deal-offer-contain">
                <a href="shop-left-sidebar.html" className="deal-image">
                  <img
                    src="../assets/images/vegetable/product/12.png"
                    className="blur-up lazyloaded"
                    alt=""
                  />
                </a>
                <a href="shop-left-sidebar.html" className="deal-contain">
                  <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                  <h6>
                    $52.57 <del>57.62</del> <span>500 G</span>
                  </h6>
                </a>
              </div>
            </li>
            <li className="list-1">
              <div className="deal-offer-contain">
                <a href="shop-left-sidebar.html" className="deal-image">
                  <img
                    src="../assets/images/vegetable/product/13.png"
                    className="blur-up lazyloaded"
                    alt=""
                  />
                </a>
                <a href="shop-left-sidebar.html" className="deal-contain">
                  <h5>Blended Instant Coffee 50 g Buy 1 Get 1 Free</h5>
                  <h6>
                    $52.57 <del>57.62</del> <span>500 G</span>
                  </h6>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default TodayDeal;
