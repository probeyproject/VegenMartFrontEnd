import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Form, Row, Col } from "react-bootstrap";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../API/Api";

import "./EditAddressModal.css";

const indianStates = {
  UP: "Uttar Pradesh",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Odisha",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TS: "Telangana",
  TR: "Tripura",
  UK: "Uttarakhand",
  WB: "West Bengal",
  AN: "Andaman and Nicobar Islands",
  CH: "Chandigarh",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi",
  JK: "Jammu and Kashmir",
  LA: "Ladakh",
  LD: "Lakshadweep",
  PY: "Puducherry",
};

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
  const [address_id, setAddress_id] = useState("");

  useEffect(() => {
    if (data) {
      setFlat(data.flat || "");

      setArea(data.area || "");
      setLandmark(data.landmark || "");

      setSelectedButton(data.address_type || ""); // <-- Fix
      setName(data.name || "");
      setState(data.state || "");
      setAddress_id(data.address_id || "");
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

      area,
      landmark,
      state,

      name,
      phone: phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`,
    };
    // console.log(addressData);
    // console.log(address_id);

    try {
      await axios.put(
        `${baseUrl}/updateAddressById/${address_id}`,
        addressData
      );
      toast.success("Address updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating address:", error.message);
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
      <Modal.Header closeButton className="">
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
              <Form.Group
                controlId="name"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  Your Name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  className="custom-input-height"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group
                controlId="phone"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  Your Phone No.<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  className="custom-input-height"
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group
                controlId="area"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  Society / Locality<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option disabled>
                    <span className="">Your Society</span>
                    <span className="">Location</span>
                    <span> Pin Code</span>
                  </option>
                  {locations?.map((location) => (
                    <option
                      key={location.id}
                      value={`${location.society_name}+${location.address} +${location.pin_code}`}
                    >
                      <span> {location.society_name}</span>{" "}
                      <span>{location.address}</span>{" "}
                      <span>{location.pin_code} </span>
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group
                controlId="flat"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  Flat / House No / Building Name
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  className="custom-input-height"
                  type="text"
                  value={flat}
                  onChange={(e) => setFlat(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group
                controlId="landmark"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  Nearby Landmark<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  className="custom-input-height"
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group
                controlId="state"
                className="d-flex align-items-start flex-column"
              >
                <Form.Label className="fw-semibold">
                  State<span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="" disabled>
                    Select Your State
                  </option>
                  {Object.entries(indianStates).map(([code, name]) => (
                    <option
                      key={code}
                      value={name}
                      disabled={name !== "Uttar Pradesh"}
                    >
                      {name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* <Col md={6}>
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
            </Col> */}
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
