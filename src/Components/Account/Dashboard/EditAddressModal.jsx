import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../API/Api";

function EditAddressModal({ isOpen, toggle, data, userId, onClose, locations }) {
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
      setPhoneNumber(data.phone ? data.phone.replace("+91", "") : ""); // Ensure clean number
    }
  }, [data]);

  // Validate phone number
  const validatePhoneNumber = (input) => {
    const phonePattern = /^[6-9]\d{9}$/; // Ensures 10-digit number starting with 6-9
    return phonePattern.test(input);
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhoneNumber(input);
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
      phone: phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`, // Ensure +91
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

  const handleDelete = async () => {
    if (!addressId) {
      toast.warn("No address selected for deletion.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this address?")) return;

    setLoading(true);

    try {
      const response = await axios.delete(`${baseUrl}/deleteAddressById/${addressId}`);
      if (response.status === 201) {
        toast.success("Address deleted successfully!");
        onClose();
      } else {
        toast.error("Failed to delete address. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Network error. Unable to delete address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle} className="fw-bold text-center">
          <h5>Edit Address</h5>
        </ModalHeader>
        <ModalBody>
          {/* Address Form Section */}
          <form onSubmit={handleSubmit}>
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
                  <HiBuildingOffice2 /> Office
                </button>
              </div>
            </div>

            {/* Address Fields */}
            <div className="form-floating ">
              <input
                type="text"
                className="form-control"
                placeholder="Enter house no"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
                required
              />
              <label>Flat / House No / Building Name</label>
            </div>
            <div className="form-floating mt-3">
              <select
                className="form-select"
                style={{ height: "28px" }}
                onChange={(e) => setArea(e.target.value)}
                value={area}
              >
                <option disabled>Your Society</option>
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
              <label>Society / Locality</label>
            </div>

            <div className="form-floating mt-3">
              <select
                className="form-select"
                style={{ height: "28px" }}
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
              <label>Address</label>
            </div>

            <div className="form-floating mt-3">
              <input
                type="text"
                className="form-control"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter nearby landmark"
                required
              />
              <label>Nearby Landmark </label>
            </div>

            <div className="form-floating mt-3">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
              <label>Your Name</label>
            </div>

            <div className="form-floating mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength="10"
                required
              />
              <label>Your Phone No.</label>
            </div>

            <div className="form-floating mt-3">
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter state"
              />
              <label>State</label>
            </div>

            <div className="form-floating mt-3">
              <select
                className="form-select"
                style={{ height: "28px" }}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              >
                <option disabled>Pincode</option>
                {locations?.map((location) => (
                  <option
                    style={{ fontSize: "0.85rem" }}
                    key={location.id}
                    value={location.pin_code}
                  >
                    {" "}
                    {location.pin_code}
                  </option>
                ))}
              </select>
              <label>
                Pincode <span className="text-danger">*</span>
              </label>
            </div>

            <div className="d-flex justify-content-evenly">
              {/* Save Button */}
              <button
                type="submit"
                className="btn btn-animation mt-4"
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Save Address"}
              </button>

              <button
                type="button"
                className="btn btn-animation mt-4"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Delete"}
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditAddressModal;
