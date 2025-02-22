import React, { useEffect, useState } from "react";
import HeaderTop from "../Components/Header/HeaderTop";
import HeaderMiddle from "../Components/Header/HeaderMiddle";
import HeaderBottom from "../Components/Header/HeaderBottom";
import Footer from "../Components/Common/Footer";
import ProductBox from "../Components/ProductSection/ProductBox";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../API/Api";

function Wishlist() {
  const [data, setData] = useState([]);
  const userState = useSelector((state) => state.user);
  const userId = userState?.user?.id;

  async function fetchAllWishlist() {
    try {
      const response = await axios.get(`${baseUrl}/getWishlist/${userId}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    }
  }

  const handleDelete = async (userId, productId) => {
    try {
      await axios.delete(`${baseUrl}/deleteWishlist`, {
        data: { userId, productId },
      });
      toast.success("Wishlist item removed successfully");
      fetchAllWishlist();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("There was a problem removing the wishlist item");
    }
  };

  useEffect(() => {
    fetchAllWishlist();
  }, []);

  return (
    <>
      <div className="container-fluid px-0">
        <header className="pb-md-4 pb-0">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
        </header>

        <section className="breadcrumb-section pt-0">
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-contain text-center">
                  <h6 className="mb-2">Wishlist</h6>
                  <nav>
                    <ol className="breadcrumb mb-0 justify-content-center">
                      <li className="breadcrumb-item">
                        <Link to={"/"}>
                          <i className="fa-solid fa-house"></i>
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">Wishlist</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container pb-5">
          <div className="row justify-content-center">
            {data && data.length > 0 ? (
              data.map((product) => (
                <div
                  className="col-lg-3 col-md-4 col-6 position-relative p-3"
                  key={`product-${product.product_id}`}
                >
                  <button
                    onClick={() => handleDelete(userId, product.product_id)}
                    className="btn btn-sm btn-light btn-close shadow bg-gray position-absolute top-0 start-0 m-2 p-2 rounded-circle"
                  >
                    &times;
                  </button>
                  <div className=" container">
                    <ProductBox
                      product_id={product.product_id}
                      imageSrc={JSON.parse(product.product_image)}
                      productName={product.product_name}
                      currentPrice={product.product_price}
                      weight={product.weight}
                      weight_type={product.weight_type}
                      inStock={product.stock}
                      discount_price={product.discount_price}
                      compareLink={product.stock}
                      wishlistLink={product.stock}
                      offers={product.offers}
                      discountRanges={product.discountRanges}
                      minWeight={product.min_weight}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <h3 className="mt-2">Your wishlist is empty</h3>
                <Link to="/" className="btn btn-animation btn-md fw-bold mt-3">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
