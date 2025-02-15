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
    if (!area || !phoneNumber || !name || !state) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const addressData = {
      user_id: userId,
      address_type: selectedButton,
      area,
      flat,
      landmark,
      state,

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
                  maxLength="10"
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

            {/* 
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
            </Col>  */}

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

export default HomeAddressModal;
