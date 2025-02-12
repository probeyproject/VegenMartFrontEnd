import React, { useState } from "react";
import { Modal, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../../API/Api";
import { useSelector } from "react-redux";
import { selectSelectedLocation } from "../../../slices/locationSlice";
import "./HomeAddressModal.css";

function HomeAddressModal({ isOpen, toggle, onClose, userId, locations }) {
  const selectedLocation = useSelector(selectSelectedLocation);

  const [flat, setFlat] = useState(selectedLocation?.address || "");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState(selectedLocation?.society_name || "");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState(
    selectedLocation?.pin_code || ""
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedButton, setSelectedButton] = useState("Home");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (type) => setSelectedButton(type);
  const handlePhoneChange = (e) =>
    setPhoneNumber(e.target.value.replace(/\D/g, ""));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !flat ||
      !floor ||
      !area ||
      !postalCode ||
      !phoneNumber ||
      !name ||
      !state
    ) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const addressData = {
      user_id: userId,
      address_type: selectedButton,
      flat,
      floor,
      landmark,
      state,
      area,
      postal_code: postalCode,
      name,
      phone: phoneNumber,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/create/address`,
        addressData
      );
      toast.success(
        response.data.success
          ? response.data.message
          : "Your Address Saved Successfully."
      );
      onClose();
    } catch (err) {
      toast.error("Network error. Unable to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={toggle}
      size="xl"
      centered
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Enter Complete Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Address Type Selection */}
          <Form.Group className="mb-3 text-center">
            <Form.Label className="fw-bold">
              Select Address Type: <span className="text-danger">*</span>
            </Form.Label>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-danger"
                className={`d-flex align-items-center px-4 py-2 custom-btn ${selectedButton === "Home" ? "active" : ""}`}
                onClick={() => handleButtonClick("Home")}
              >
                <IoHome className="me-2" /> Home
              </Button>
              <Button
                variant="outline-danger"
                className={`d-flex align-items-center px-4 py-2 custom-btn ${selectedButton === "Office" ? "active" : ""}`}
                onClick={() => handleButtonClick("Office")}
              >
                <HiBuildingOffice2 className="me-2" /> Office
              </Button>
            </div>
          </Form.Group>

          {/* Address Fields - Responsive Layout */}
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="flat">
                <Form.Label>Flat / House No / Building Name</Form.Label>
                <Form.Control
                  type="text"
                  value={flat}
                  onChange={(e) => setFlat(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="area">
                <Form.Label>Society / Locality</Form.Label>
                <Form.Select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option disabled>Your Society</option>
                  {locations?.map((location) => (
                    <option key={location.id} value={location.society_name}>
                      {location.society_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="floor">
                <Form.Label>Address</Form.Label>
                <Form.Select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                >
                  <option disabled>Your Address</option>
                  {locations?.map((location) => (
                    <option key={location.id} value={location.address}>
                      {location.address}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="landmark">
                <Form.Label>Nearby Landmark</Form.Label>
                <Form.Control
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Your Phone No.</Form.Label>
                <Form.Control
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength="10"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="postalCode">
                <Form.Label>
                  Pincode <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                >
                  <option disabled>Pincode</option>
                  {locations?.map((location) => (
                    <option key={location.id} value={location.pin_code}>
                      {location.pin_code}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="d-flex align-items-center justify-content-evenly mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-animation px-2 py-2"
            >
              {loading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                "Save Address"
              )}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="btn btn-animation px-3 py-2"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default HomeAddressModal;
