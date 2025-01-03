// import React, { useState, useEffect } from "react";
// import { Card, Carousel, Modal, Button } from "react-bootstrap";
// import axios from "axios";
// import { baseUrl } from "../../API/Api";

// const ComboCardCarousel = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [modalProducts, setModalProducts] = useState([]);

//   // Fetch combos from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}/getAllCombos`);
//         const combos = response.data;

//         if (!Array.isArray(combos)) return;

//         const categoriesSet = new Set();
//         const productsByCategory = {};

//         combos.forEach((combo) => {
//           categoriesSet.add(combo.title);
//           if (!productsByCategory[combo.title]) {
//             productsByCategory[combo.title] = [];
//           }

//           // Ensure product_id is in an array format
//           let productIds = combo.product_id;

//           // If product_id is a string, parse it to an array
//           if (typeof productIds === "string") {
//             try {
//               productIds = JSON.parse(productIds);
//             } catch (error) {
//               console.error("Error parsing product_id:", error);
//               productIds = []; // Fallback to empty array in case of error
//             }
//           }

//           // If it's still not an array, fallback to empty array
//           if (!Array.isArray(productIds)) {
//             productIds = [];
//           }

//           // Add the products for this category
//           productIds.forEach((productId) => {
//             productsByCategory[combo.title].push({
//               product_id: productId,
//               product: combo.title,
//               price: combo.price || 0,
//             });
//           });
//         });

//         setCategories([...categoriesSet]);
//         setProducts(productsByCategory);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle "View More" click
//   const handleViewMore = (category) => {
//     setModalProducts(products[category] || []);
//     setShowModal(true);
//   };

//   return (
//     <div>
//       {categories.length === 0 && <p>Loading categories...</p>}

//       {/* Carousel Section */}
//       <Carousel>
//         {categories.map((category, index) => (
//           <Carousel.Item key={index}>
//             <h3 className="text-center mt-2 mb-2 fs-4 fw-bold">{category}</h3>
//             <div style={{ display: "flex", justifyContent: "center", gap: "10%" }}>
//               {products[category]?.slice(0, 1).map((product, idx) => (
//                 <Card key={idx} style={{ width: "15rem" }}>
//                   <Card.Body>
//                     <Card.Title className="text-center fw-bold">{product.product}</Card.Title>
//                     <Card.Text>Price: ₹{product.price}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               ))}
//               {/* View More Card */}
//               {products[category]?.length > 1 && (
//                 <Card
//                   style={{
//                     width: "15rem",
//                     cursor: "pointer",
//                     textAlign: "center",
//                     border: "2px dashed #d22860",
//                   }}
//                   onClick={() => handleViewMore(category)}
//                 >
//                   <Card.Body>
//                     <Card.Title>View More</Card.Title>
//                   </Card.Body>
//                 </Card>
//               )}
//             </div>
//           </Carousel.Item>
//         ))}
//       </Carousel>

//       {/* Modal for View More */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>All Products</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
//             {modalProducts.map((product, idx) => (
//               <Card key={idx} style={{ width: "12rem" }}>
//                 <Card.Body>
//                   <Card.Img>{product.image}</Card.Img>
//                   <Card.Title>{product.product}</Card.Title>
//                   <Card.Text>Price: ₹{product.price}</Card.Text>
//                 </Card.Body>
//               </Card>
//             ))}
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ComboCardCarousel;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../API/Api";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Importing React Slick carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ComboCardCarousel() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/getAllCombos`)
      .then((response) => {
        setCombos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const safeParseJson = (str) => {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return [];
    }
  };

  const handleComboClick = (id, productIds) => {
    axios
      .get(`${baseUrl}/getCombo/${id}`)
      .then((response) => {
        setSelectedCombo(response.data);
        fetchProductDetails(productIds);
        setShowModal(true);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch combo details");
      });
  };

  const fetchProductDetails = (productIds) => {
    const productPromises = productIds.map((id) =>
      axios.get(`${baseUrl}/getProductById/${id}`)
    );

    Promise.all(productPromises)
      .then((responses) => {
        const productData = responses.map((response) => response.data);
        setSelectedProducts(productData);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch product details");
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCombo(null);
    setSelectedProducts([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="text-center display-5 mb-4">Combo List</h1>
      <Slider {...sliderSettings}>
        {combos.map((combo) => {
          const productImages = safeParseJson(combo.product_image);

          return (
            <div
              className="card"
              key={combo.id}
              onClick={() =>
                handleComboClick(combo.id, safeParseJson(combo.product_id))
              }
            >
              <img
                src={
                  productImages.length > 0
                    ? productImages[0]
                    : "default-image.jpg"
                }
                className="card-img-top"
                alt={combo.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{combo.title}</h5>
                <p className="card-text">{combo.description}</p>
                <p>
                  <strong>Price: ₹{combo.price}</strong>
                </p>
              </div>
            </div>
          );
        })}
      </Slider>

      {selectedCombo && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCombo.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={
                    selectedCombo.product_image === "0"
                      ? "default-image.jpg"
                      : safeParseJson(selectedCombo.product_image)[0]
                  }
                  className="card-img-top"
                  alt={selectedCombo.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <p>{selectedCombo.description}</p>
                <p>
                  <strong>Price: ₹{selectedCombo.price}</strong>
                </p>
                <div className="row">
                  {selectedProducts.map((productArray, index) => {
                    const product = productArray[0];
                    if (!product) return null;

                    const productImages = safeParseJson(product.product_image);

                    return (
                      <div className="col-md-4" key={index}>
                        <Link
                          to={`/detail_page/${product.product_id}`}
                          className="card"
                        >
                          <img
                            src={
                              productImages.length > 0
                                ? productImages[0]
                                : "default-image.jpg"
                            }
                            className="card-img-top"
                            alt={product.product_name}
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {product.product_name}
                            </h5>
                            <p>
                              <strong>Price: ₹{product.product_price}</strong>
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
