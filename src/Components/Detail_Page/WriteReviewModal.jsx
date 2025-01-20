import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import { baseUrl } from "../../API/Api";
import { useSelector } from "react-redux";

const WriteReviewModal = ({
  isOpen,
  onClose,
  productId,
  productName,
  productPrice,
  productImage,
}) => {
  const [rating, setRating] = useState(0); // State to hold the selected rating
  const [comment, setComment] = useState("");
  const userState = useSelector((state) => state.user)
  const userId = userState?.user?.id // State for the comment
  if (!isOpen) return null;

  const handleStarClick = (index) => {
    const newRating = index + 1; // Set rating based on index (0-4) plus one
     // Debugging line
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update comment state
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}/create/review/${userId}&${productId}`, {
        rating,
        comment,
      });
      
      // You might want to close the modal or reset the form here
      toast.success("Review Add Successful!")
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("There was a problem, not add review!")
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5" id="exampleModalLabel">
              Write a review
            </h3>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <form className="product-review-form">
              <div className="product-wrapper">
                <div className="product-image">
                  <img
                    className="img-fluid"
                    alt={productName}
                    src={(JSON.parse(productImage))[0]} // Assuming you want to show the first image
                  />
                </div>
                <div className="product-content">
                  <h5 className="name">{productName}</h5>
                  <div className="product-review-rating">
                    <div className="product-rating">
                      <h6 className="price-number">₹{productPrice}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="review-box">
                <div className="product-review-rating">
                  <label>Rating</label>
                  <div className="product-rating">
                    <ul
                      className="rating"
                      style={{ listStyleType: "none", padding: 0 }}
                    >
                      {[...Array(5)].map((_, index) => (
                        <li key={index} onClick={() => handleStarClick(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill={index < rating ? "gold" : "none"} // Use fill for filled stars
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-star"
                            style={{ cursor: "pointer" }}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="review-box">
                <label htmlFor="content" className="form-label">
                  Your Comment *
                </label>
                <textarea
                  id="content"
                  rows={3}
                  className="form-control"
                  placeholder="Write Your Comment"
                  value={comment} // Controlled input
                  onChange={handleCommentChange} // Update comment state
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-md btn-theme-outline fw-bold"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-md fw-bold text-light theme-bg-color"
              onClick={handleSubmit} // Submit the review
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;
