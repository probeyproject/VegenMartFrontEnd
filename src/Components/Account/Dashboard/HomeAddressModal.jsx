import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../API/Api";
import { selectSelectedLocation } from "../../../slices/locationSlice";
import address from "../../../assets/images/Address/address.jpg";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";

function HomeAddressModal({ isOpen, toggle, onClose, userId }) {

  const selectedLocation = useSelector(selectSelectedLocation);
  const [addresses, setAddresses] = useState(selectedLocation?.address || "");
  const [area, setArea] = useState(selectedLocation?.society_name || "");
  const [postalCode, setPostalCode] = useState(
    selectedLocation?.pin_code || ""
  );
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectAddType, setSelectAddType] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [floor, setFloor] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    
     if (!selectAddType) {
      toast.warn("Please select address type.");
      return; // Exit the function if address type is not selected
    }
    
    setLoading(true);
  
    // Prepare data for API request
    const addressData = {
      user_id: userId,
      address_type: selectAddType,
      floor: floor,
      landmark: landmark,
      state: state,
      flat: addresses,
      area: area,
      postal_code: postalCode,
      name: name,
      phone: phoneNumber,
    };
  
    try {
      const response = await axios.post(
        `${baseUrl}/create/address`,
        addressData
      );
      toast.success(response.data.message);
      setLoading(false);
      toggle();
    } catch (err) {
      setLoading(false);
      toast.error("Failed to save address.");
    }finally{
      setLoading(false);
      onClose()
    }
  };
  

  // Handle address type button click
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setSelectAddType(buttonName);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        <h5>Enter Complete Address</h5>
      </ModalHeader>
      <ModalBody>
        <div className="container mt-3">
          <div className="row">
            {/* Map Section */}
            <div className="col-md-6">
              <div className="form-group mb-4">
                <div id="map" className="border rounded p-3 shadow-sm">
                  <img src={address} alt="Map" className="img-fluid rounded" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label>
                Select Address Type<span className="text-danger">*</span>
              </label>
              {loading ? (
                <div className="text-center">
                  <Spinner size="lg" color="primary" />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Address Type Selection */}
                  <div className="btn-group mb-3 d-flex gap-2">
                    <div>
                      <button
                        type="button"
                        className={`btn btn-outline-danger ${
                          selectedButton === "Home" ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick("Home")}
                        
                      >
                        <div>
                          <IoHome />
                        </div>
                        Home
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className={`btn btn-outline-danger ${
                          selectedButton === "Office" ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick("Office")}
                        
                      >
                        <div>
                          <HiBuildingOffice2 />
                        </div>
                        Office
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="form-group mt-3">
                    <label>
                      Flat / House No / Building Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter house no"
                      onChange={(e) => setAddresses(e.target.value)}
                      required
                     
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="area">Society / Locality</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                      readOnly
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>
                      Nearby Landmark<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Enter nearby landmark"
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>
                      Your Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>
                      Address<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={addresses}
                      onChange={(e) => setFloor(e.target.value)}
                      placeholder="Enter Area"
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>
                      State<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter state"
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="postalCode">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      readOnly
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="phoneNumber">Phone Number<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone no."
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <button
                      type="submit"
                      className="btn btn-animation mt-4 w-50"
                      disabled={loading}
                    >
                      {loading ? <Spinner size="sm" /> : "Save Address"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default HomeAddressModal;