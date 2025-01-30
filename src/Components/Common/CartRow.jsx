import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../API/Api";

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
    <tr className="product-box-contain" key={cart.cart_id}>
      <td className="product-detail">
        <div className="product border-0">
{/* {          console.log(cart)} */}
          
          <Link
            to={`/detail_page/${cart.product_id}`}
            className="product-image"
            
          >
            <img
              src={imgages || "Loading..."}
              className="img-fluid blur-up lazyloaded"
              alt={cart.product_name}
            />
          </Link>
          <div className="product-detail">
            <ul>
              <li className="name">
                <Link to={`/detail_page/${cart.product_id}`}>
                  {cart.product_name||cart.combo_title}
                </Link>
              </li>
              <li className="text-content">
                <span className="text-title">Sold By:</span> Vegenmart
              </li>
              <li className="text-content">
                <div className="d-flex gap-1 align-items-center">
                  <div>
                    <span className="text-title">{cart.weight_type}</span> -
                  </div>
                  <div className="cart_qty qty-box open w-50">
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
                        value={currentWeight }
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
              </li>
            </ul>
          </div>
        </div>
      </td>
      <td className="price">
        <h4 className="table-title text-content">Price</h4>
        <h5>₹{cart?.product_price || cart?.combo_price}</h5>
      </td>
      <td className="subtotal">
        <h4 className="table-title text-content">Total</h4>
        <h5>₹{currentTotalPrice}</h5>
      </td>
      <td className="save-remove text-center">
        <h4 className="table-title text-content">Action</h4>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <Link
            className="save notifi-wishlist mb-2"
            onClick={() => handleAddToWishlist(cart.product_id)}
          >
            Save for later
          </Link>
          {/* {console.log(cart.cart_id)
          }
           */}
          <Link
            onClick={() => handleDelete(cart.cart_id)}
            className="remove close_button"
          >
            <i
              className="fas fa-trash"
              style={{ fontSize: "15px", color: "red" }}
            ></i>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default CartRow;
