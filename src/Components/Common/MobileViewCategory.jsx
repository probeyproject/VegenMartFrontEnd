import React, { useState } from 'react';

function MobileViewCategory({closeModal}) {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => setShowModal(!showModal);

  // Function to close the modal
//   const closeModal = () => setShowModal(false);

  return (
    <div>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block' }} // Make the modal visible
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal Title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Scrollable content inside the modal */}
                <p>This is a scrollable modal content</p>
                <p>More content goes here...</p>
                <p>Even more content...</p>
                <p>And some more...</p>
                <p>Keep adding content for scrolling...</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileViewCategory;
