import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../API/Api";

import "./EditAddressModal.css";

function EditAddressModal({ isOpen, toggle, data, onClose, locations }) {
  const [flat, setFlat] = useState("");
  const [floor, setFloor] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressId, setAddressId] = useState("");

  useEffect(() => {
    if (data) {
      setFlat(data.flat || "");
      setFloor(data.floor || "");
      setArea(data.area || "");
      setLandmark(data.landmark || "");
      setPostalCode(data.postal_code || "");
      setSelectedButton(data.address_type || "");
      setName(data.name || "");
      setState(data.state || "");
      setAddressId(data.address_id);
      setPhoneNumber(data.phone ? data.phone.replace("+91", "") : "");
    }
  }, [data]);

  const handleButtonClick = (type) => {
    setSelectedButton(type);
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    setPhoneNumber(input);
  };

  // Validate phone number
  const validatePhoneNumber = (input) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(input);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    const addressData = {
      address_type: selectedButton,
      flat,
      floor,
      area,
      landmark,
      state,
      postal_code: postalCode,
      name,
      phone: phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`,
    };

    try {
      await axios.put(`${baseUrl}/updateAddressById/${addressId}`, addressData);
      toast.success("Address updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
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
        <Modal.Title>Edit Address</Modal.Title>
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
                className={`d-flex align-items-center px-4 py-2 custom-btn ${
                  selectedButton === "Home" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                <IoHome className="me-2" /> Home
              </Button>
              <Button
                variant="outline-danger"
                className={`d-flex align-items-center px-4 py-2 custom-btn ${
                  selectedButton === "Office" ? "active" : ""
                }`}
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

export default EditAddressModal;
