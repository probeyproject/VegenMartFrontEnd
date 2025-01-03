import React, { useEffect, useState } from 'react'
import HeaderTop from '../Components/Header/HeaderTop'
import HeaderMiddle from '../Components/Header/HeaderMiddle'
import HeaderBottom from '../Components/Header/HeaderBottom'
import Footer from '../Components/Common/Footer'
import ProductBox from '../Components/ProductSection/ProductBox'
import axios from 'axios'
import { toast } from 'react-toastify' // Ensure you import toast
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { baseUrl } from '../API/Api'

function Whislist() {
  const [data, setData] = useState([])
  const userState = useSelector((state) => state.user)
  const userId = userState?.user?.id

  async function fetchAllWishlist() {
    try {
      const response = await axios.get(`${baseUrl}/getWishlist/${userId}`)
      const data = await response.data
      setData(data)
    } catch (error) {
      console.error('Error fetching wishlist data:', error)
    }
  }


  const handleDelete = async (userId, productId) => {
    try {
      const requestBody = {
        userId: userId,
        productId: productId,
      }
      await axios.delete(`${baseUrl}/deleteWishlist`, { data: requestBody })
      toast.success('Wishlist item removed successfully')
      fetchAllWishlist() // Refresh the wishlist after deletion
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('There was a problem removing the wishlist item')
    }
  }

  useEffect(() => {
    fetchAllWishlist()
  }, [])

  return (
    <>
    <div className="container-fluid px-0 overflow-hidden">
      <header className="pb-md-4 pb-0">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </header>
      <section className="breadcrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-contain">
                <h6>Wishlist</h6>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to={'/'}>
                        <i className="fa-solid fa-house" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Wishlists</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container row">
        {data && data.length > 0 ? (
          data.map((product, index) => (
            <div
              className="col-lg-3 col-6 position-relative p-3"
              key={`product-${product.product_id}`} // Use product_id for unique key
            >
              <button 
                onClick={() => handleDelete(userId, product.product_id)} // Pass dynamic product_id
                className="btn btn-sm btn-light btn-close shadow top-0 start-0 z-1 mx-4 mt-3 me-5 position-absolute p-2 rounded-circle"
            
              >
                &times;
              </button>
              <div style={{width:'180px'}}>
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
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <div className="d-flex flex-column align-items-center justify-content-center text-center">
              <div>
                <h3 className="mt-2">You have no wishlist</h3>
              </div>

              <div>
                <Link to="/" className="btn btn-animation btn-md fw-bold mt-3 mb-2">
                  Continue to Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Whislist
