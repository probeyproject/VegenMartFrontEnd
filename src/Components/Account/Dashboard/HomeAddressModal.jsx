import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../API/Api";
import { selectSelectedLocation } from "../../../slices/locationSlice";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";

function HomeAddressModal({ isOpen, toggle, onClose, userId, locations }) {
  const selectedLocation = useSelector(selectSelectedLocation);

  const [addresses, setAddresses] = useState(selectedLocation?.address || "");
  const [area, setArea] = useState(selectedLocation?.society_name || "");
  const [postalCode, setPostalCode] = useState(
    selectedLocation?.pin_code || ""
  );
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectAddType, setSelectAddType] = useState("Home");
  const [selectedButton, setSelectedButton] = useState("Office");
  const [floor, setFloor] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setSelectAddType(buttonName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!addresses || !area || !postalCode || !phoneNumber || !name || !state) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const addressData = {
      user_id: userId,
      address_type: selectAddType,
      floor,
      landmark,
      state,
      flat: addresses,
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
    <Modal isOpen={isOpen} toggle={toggle} size="md">
      <ModalHeader toggle={toggle}>Enter Complete Address</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="mb-3">
            <label htmlFor="selectaddressbutton" className="form-label">
              Select Address Type:<span className="text-danger">*</span>
            </label>
            <div className="d-flex justify-content-evenly">
              <button
                type="button"
                className={`btn btn-outline-danger ${
                  selectedButton === "Home" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Home")}
              >
                <IoHome />
                <span> Home</span>
              </button>
              <button
                type="button"
                className={`btn btn-outline-danger ${
                  selectedButton === "Office" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Office")}
              >
                <HiBuildingOffice2 /> <span>Office</span>
              </button>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <label>Your Name:<span className="text-danger">*</span></label>
          </div>

          <div className="form-floating form-group mb-3">
            <select
              className="form-select"
              // style={{ height: '28px' }}
              onChange={(e) => setArea(e.target.value)}
              value={area}
            >
              <option disabled>Your Society:<span className="text-danger">*</span></option>
              {locations?.map((location) => (
                <option
                  style={{ fontSize: "0.85rem" }}
                  key={location.id}
                  value={location.society_name}
                >
                  {" "}
                  {`${location.society_name.substring(0, 19)}...`}
                </option>
              ))}
            </select>
            <label className="">Society / Locality:<span className="text-danger">*</span></label>

          </div>

          <div className="form-floating mt-3">

            <select
              className="form-select mb-3"
              // style={{ height: '28px' }}
              onChange={(e) => setFloor(e.target.value)}
              value={floor}
            >
              <option disabled>Your Address</option>
              {locations?.map((location) => (
                <option
                  style={{ fontSize: "0.85rem" }}
                  key={location.id}
                  value={location.address}
                >
                  {" "}
                  {`${location.address.substring(0, 19)}...`}
                </option>
              ))}
            </select>
            <label>Address:<span className="text-danger">*</span></label>

          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              placeholder="Flat / House No"
              required
            />
            <label>Flat / House No / Building Name:<span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Landmark"
              required
            />
            <label>Nearby Landmark:<span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required
            />
            <label>State:<span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Pincode"
              required
            />
            <label>Pincode:<span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <label>Phone Number:<span className="text-danger">*</span></label>
          </div>

          <button
            type="submit"
            className="btn btn-animation w-100"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Save Address"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default HomeAddressModal;
