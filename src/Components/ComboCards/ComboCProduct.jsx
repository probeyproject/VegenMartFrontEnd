
import React, { useState } from "react";
import { Form, Button, Table, Card } from "react-bootstrap";

const ComboCProduct = () => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
  ]);
  const [products, setProducts] = useState({
    Electronics: ["Mobile", "Laptop", "Headphones"],
    Clothing: ["T-Shirt", "Jeans", "Jacket"],
    Books: ["Fiction", "Non-Fiction", "Comics"],
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For the product image
  const [selectedItems, setSelectedItems] = useState([]);

  // Add selected product with image to the list
  const handleAddProduct = () => {
    if (selectedCategory && selectedProduct && selectedImage) {
      const item = {
        category: selectedCategory,
        product: selectedProduct,
        image: URL.createObjectURL(selectedImage), // Create an image preview URL
      };

      // Prevent duplicates
      const alreadyExists = selectedItems.some(
        (i) => i.category === item.category && i.product === item.product
      );
      if (!alreadyExists) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  // Remove product from the list
  const handleRemoveProduct = (indexToRemove) => {
    setSelectedItems(selectedItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Card style={{ padding: "20px", maxWidth: "800px", margin: "20px auto" }}>
      <h4>Admin Panel - Add Products</h4>

      <Form>
        {/* Category Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedProduct(""); // Reset product selection when category changes
            }}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Product Selection */}
        {selectedCategory && (
          <Form.Group className="mb-3">
            <Form.Label>Select Product</Form.Label>
            <Form.Select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">-- Select a Product --</option>
              {products[selectedCategory].map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {/* Image Upload */}
        {selectedProduct && (
          <Form.Group className="mb-3">
            <Form.Label>Upload Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </Form.Group>
        )}

        {/* Add Product Button */}
        <Button
          variant="primary"
          onClick={handleAddProduct}
          disabled={!selectedCategory || !selectedProduct || !selectedImage}
        >
          Add Product
        </Button>
      </Form>

      {/* Selected Products Table */}
      <div className="mt-4">
        <h5>Selected Products</h5>
        {selectedItems.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Product</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.product}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.product}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Card>
  );
};

export default ComboCProduct;


