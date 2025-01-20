import { Modal, ModalBody} from "reactstrap";

function DiscountModal({ isOpen, toggle,offers}) {
  
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        style={{ width: "350px", height: "300px" }}
        className="custom-modal"
      >
        <button onClick={toggle} className="close-button">
          &times; {/* Close button */}
        </button>
        <ModalBody className="text-center">
          <div>
            {offers?.length === 0 ?(
              <p className="small">Discount not available at this time.</p>
            ) : (
              offers?.map((data, index) => (
                <div key={index}>
                  <p className="small">
                    Purchase between{" "}
                    <span className="fw-bold">{data.min_weight}</span> to
                    <span className="fw-bold m-lg-1">{data.max_weight}</span>
                    items and enjoy a{" "}
                    <span className="fw-bold me-1">
                      ₹{data.discount_price || "N/A"}
                    </span>
                    extra discount on your order. Don’t miss out on this great
                    deal!
                  </p>
                </div>
              ))
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DiscountModal;
