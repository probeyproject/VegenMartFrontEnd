import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function Popupmodal(props) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // Timer to show the modal 3 seconds after component mounts
    const timer = setTimeout(() => {
      setModal(true);
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalBody className="position-relative p-0">
          <button
            type="button"
            class="btn-close position-absolute end-0 p-2 btn-white shadow rounded-circle"
            onClick={toggle}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div className="container p-0 m-0" style={{background:'url("https://nest-frontend-v6.vercel.app/assets/imgs/banner/popup-1.png")',height:'80vh'}}>
          <div className="pt-5"></div>

          <h6 class="mb-4 text-brand-2 px-4 h4 text-warning">Deal of the Day</h6>
          <h2 className="h2 px-lg-4 mb-4 fw-bold">Organic fruit <br/> for your family's health</h2>
          <span className="display-4 px-4 fw-bold" style={{color:'var(--theme-color)'}}>Rs.499</span>
          <h5 class="lh-sm mx-auto mt-1 text-content px-4">Save up to 5% OFF</h5>
          <button class="btn btn-animation btn-sm mx-4 mt-sm-3 mt-2">Shop Now <i class="fa-solid fa-arrow-right icon"></i></button>

            
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Popupmodal;
