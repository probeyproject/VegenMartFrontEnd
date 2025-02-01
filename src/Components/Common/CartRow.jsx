import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../API/Api";
import "./CartRow.css";

function CartRow({ cart, imgages, fetchAllCart }) {
  const userState = useSelector((state) => state?.user);
  const userId = userState?.user?.id;

  const [currentWeight, setCurrentWeight] = useState(Number(cart?.unit) || 1);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(cart?.price);

  const handleAddToWishlist = async (product_id) => {
    try {
      const data = {
        productId: product_id,
        userId: userId,
      };
      const response = await axios.post(`${baseUrl}/addToWishlist`, data);
      toast.success("Add to wishlist Successful");
    } catch (error) {
      console.error("Error:", error);
      toast.warning("This product is already in your wishlist!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/deleteCartById/${id}`);
      toast.success("Cart remove successful");
      fetchAllCart();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("There was a problem to remove cart");
    }
  };

  const updateCart = async (value, currentTotalPrice) => {
    try {
      const productId = cart?.id;

      const updatedcart = await axios.put(
        `${baseUrl}/cart/${userId}/${productId}`,
        {
          totalPrice: currentTotalPrice,
          cartStatus: "updated",
          weight: value,
          weight_type: cart?.weight_type,
        }
      );
      const updatedData = updatedcart?.data;
      fetchAllCart();
    } catch (error) {
      console.error("Error updating updated cart:", error);
    }
  };

  const handleIncreaseWeight = async () => {
    try {
      const productId = cart?.id;
      const priceResponse = await axios.post(
        `${baseUrl}/calculate-price/${productId}`,
        { weight: currentWeight + 1, unitType: cart?.weight_type }
      );
      const priceData = priceResponse.data;

      setCurrentTotalPrice(priceData?.final_price);
      setCurrentWeight(priceData.weight);
    } catch (error) {
      toast.warning("weight not increase if (0.25,0.5,0.75 & 15 Kg or above)");
    }
  };

  // Handle Decrease Weight
  const handleDecreaseWeight = async () => {
    if (currentWeight > 1) {
      try {
        const productId = cart?.id;
        const priceResponse = await axios.post(
          `${baseUrl}/calculate-price/${productId}`,
          { weight: currentWeight - 1, unitType: cart?.weight_type }
        );
        const priceData = priceResponse.data;

        setCurrentTotalPrice(priceData?.final_price);
        setCurrentWeight(currentWeight - 1);
      } catch (error) {
        console.error("Error updating weight:", error);
      }
    }
  };

  useEffect(() => {
    if (currentWeight && currentTotalPrice) {
      updateCart(currentWeight, currentTotalPrice);
    }
  }, [currentWeight, currentTotalPrice]);

  return (
    <>
      <div className="product-box-contain" key={cart.cart_id}>
        <div className="product-detail">
          <div className="row m-2 ">
            <div className="border-0 p-1 col-5">
              <div className="d-flex align-items-center">
                <Link
                  to={`/detail_page/${cart.product_id}`}
                  className="product-image"
                  style={{}}
                >
                  <img
                    src={imgages || "Loading..."}
                    style={{
                      height: "90%",
                      width: "95%",
                      borderRadius: "10px",
                    }}
                    className="img-fluid blur-up lazyloaded"
                    alt={cart.product_name}
                  />
                </Link>

                <div className="border-0 col-6 ms-2 d-none d-md-block">
                  <div
                    className="cart__cart "
                    to={`/detail_page/${cart.product_id}`}
                  >
                    <span>{cart.product_name || cart.combo_title}</span>
                  </div>
                  <div className="text-content">
                    <p style={{ fontSize: "10px" }}>
                      <span className="text-title">Sold By:</span> Vegenmart
                    </p>
                  </div>
                  <div className=" d-flex justify-content-center align-items-start flex-column ">
                    <h4
                      className="table-title text-content fw-bold"
                      style={{ fontSize: "14px" }}
                    >
                      Price:{" "}
                      <span>₹{cart?.product_price || cart?.combo_price}</span>
                    </h4>
                    <div className="d-flex gap-1 align-items-center">
                      {/* <div> */}
                      <span
                        className="text-title mt-1"
                        style={{ fontSize: "13px" }}
                      >
                        {cart.weight_type}
                      </span>{" "}
                      -{/* </div> */}
                      <div className="cart_qty qty-box open ">
                        <div className="input-group">
                          {/* Decrease button */}
                          <button
                            type="button"
                            className="qty-left-minus"
                            onClick={() => {
                              handleDecreaseWeight();
                            }}
                            disabled={!!cart.combo_id} // Disable if combo_id exists
                          >
                            <i className="fa fa-minus" />
                          </button>

                          <input
                            className="form-control input-number qty-input"
                            type="text"
                            name="quantity"
                            value={currentWeight}
                            readOnly
                          />
                          {/* Increase button */}
                          <button
                            type="button"
                            className="qty-right-plus"
                            onClick={handleIncreaseWeight}
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <h4
                      className="table-title text-content fw-bold mt-3"
                      style={{ fontSize: "15px" }}
                    >
                      Total: <span>₹{currentTotalPrice}</span>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="mt-2 d-flex w-100 justify-content-evenly d-block d-sm-none">
                <button
                  className="btn btn-animation notifi-wishlist"
                  onClick={() => handleAddToWishlist(cart.product_id)}
                >
                  <i className="fas fa-heart"></i>
                </button>

                <div className="d-flex justify-content-center align-items-start flex-column">
                  <button
                    onClick={() => handleDelete(cart.cart_id)}
                    className="btn btn-animation"
                  >
                    <i
                      className="fas fa-trash text-light"
                      style={{ fontSize: "15px", color: "red" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-0 col-7">
              <div className="d-block d-sm-none">
                <div
                  className="pt-2 "
                  to={`/detail_page/${cart.product_id}`}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#D22860",
                    textWrap: "pretty"
                  }}
                >
                  {cart.product_name || cart.combo_title}
                </div>
                <div className="text-content">
                  <p style={{ fontSize: "10px" }}>
                    <span className="text-title">Sold By:</span> Vegenmart
                  </p>
                </div>
                <div className=" d-flex justify-content-center align-items-start flex-column ">
                  <h4
                    className="table-title text-content fw-bold"
                    style={{ fontSize: "14px" }}
                  >
                    Price:{" "}
                    <span>₹{cart?.product_price || cart?.combo_price}</span>
                  </h4>
                  <div className="d-flex gap-2 align-items-center">
                    {/* <div> */}
                    <span
                      className="text-title mt-1"
                      style={{ fontSize: "13px" }}
                    >
                      {cart.weight_type}
                    </span>{" "}
                    -{/* </div> */}
                    <div className="cart_qty qty-box open ">
                      <div className="input-group">
                        {/* Decrease button */}
                        <button
                          type="button"
                          className="qty-left-minus"
                          onClick={() => {
                            handleDecreaseWeight();
                          }}
                          disabled={!!cart.combo_id} // Disable if combo_id exists
                        >
                          <i className="fa fa-minus" />
                        </button>

                        <input
                          className="form-control input-number qty-input"
                          type="text"
                          name="quantity"
                          value={currentWeight}
                          readOnly
                        />
                        {/* Increase button */}
                        <button
                          type="button"
                          className="qty-right-plus"
                          onClick={handleIncreaseWeight}
                        >
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <h4
                    className="table-title text-content fw-bold "
                    style={{ fontSize: "15px", paddingTop: "30px" }}
                  >
                    Total: <span>₹{currentTotalPrice}</span>
                  </h4>
                </div>
              </div>

              <div className="d-flex justify-content-evenly mt-4 d-none d-md-flex">
                <button
                  className="btn btn-animation notifi-wishlist ms-"
                  onClick={() => handleAddToWishlist(cart.product_id)}
                >
                  <i className="fas fa-heart"></i>
                </button>

                <div className="d-flex justify-content-center align-items-start flex-column">
                  <button
                    onClick={() => handleDelete(cart.cart_id)}
                    className="btn btn-animation"
                  >
                    <i
                      className="fas fa-trash text-light"
                      style={{ fontSize: "15px", color: "red" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartRow;
