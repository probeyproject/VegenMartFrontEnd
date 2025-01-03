import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap'
import { HiBuildingOffice2 } from 'react-icons/hi2'
import { IoHome } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
import { baseUrl } from '../../../API/Api'
import address from '../../../assets/images/Address/address.jpg'

function EditAddressModal({ isOpen, toggle, data, userId, onClose, locations }) {
  const [flat, setFlat] = useState('')
  const [floor, setFloor] = useState('')
  const [area, setArea] = useState('')
  const [landmark, setLandmark] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState('') // New state for state
  const [postalCode, setPostalCode] = useState('') // New state for postal code
  const [loading, setLoading] = useState(false)
  const [selectAddType, setSelectAddType] = useState('') // Added state for address type
  const [selectedButton, setSelectedButton] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressId, setAddressId] = useState('')
  const [phoneno, setPhoneno] = useState('')

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName)
    setSelectAddType(buttonName)
  }

  useEffect(() => {
    if (data) {
      setFlat(data.flat || '')
      setFloor(data.floor || '')
      setArea(data.area || '')
      setLandmark(data.landmark || '')
      setPostalCode(data.postal_code || '')
      // setSelectAddType(data.address_type || '');
      setSelectedButton(data.address_type || '')
      setPhoneno(data.phone || '')
      setName(data.name || '')
      setState(data.state || '')
      setAddressId(data.address_id)
      setPhoneNumber(phoneno.slice(3))
    }
  }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true) // Start loading
    const addressData = {
      address_type: selectedButton,
      flat: flat,
      floor: floor,
      area: area,
      landmark: landmark,
      state: state, // Use the new state for state
      postal_code: postalCode, // Use the new state for postal code
      name: name,
      phone: phoneNumber,
    }

    try {
      const response = await axios.put(`${baseUrl}/updateAddressById/${addressId}`, addressData)
      
      // Handle successful response here
      toast.success('Address Edit successful!')
    } catch (error) {
      console.error('Error Edit address:', error)
      toast.error('Some technical issue your address not edit')
      // Handle error here
    } finally {
      setLoading(false) // End loading
      onClose() // Close the modal after saving
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="lg" className="modal-dialog-centered">
        <ModalHeader toggle={toggle} className="fw-bold text-center">
          <h5>Edit Address</h5>
        </ModalHeader>
        <ModalBody>
          <div className="container mt-3">
            <div className="row">
              {/* Map Section */}
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <div id="map" className="border rounded p-3 shadow-sm">
                    <img
                      src={address}
                      alt="Map"
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Address Form Section */}
              <div className="col-md-6">
                <label>Save Address As</label>
                <form onSubmit={handleSubmit}>
                  <div className="btn-group mb-3">
                    <button
                      type="button"
                      className={`btn btn-outline-danger ${
                        selectedButton === 'Home' ? 'active' : ''
                      }`}
                      onClick={() => handleButtonClick('Home')}
                    >
                      <IoHome /><span> Home</span>
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-danger ${
                        selectedButton === 'Office' ? 'active' : ''
                      }`}
                      onClick={() => handleButtonClick('Office')}
                    >
                      <HiBuildingOffice2 /> Office
                    </button>
                  </div>

                  {/* Address Fields */}
                  <div className="form-group">
                    <label>Flat / House No / Building Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter house no"
                      value={flat}
                      onChange={(e) => setFlat(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>
                      Society / Locality
                      
                    </label>
                    <select
                      className="ms-2 rounded-1"
                      style={{ height: '28px' }}
                      onChange={(e) => setArea(e.target.value)}
                      value={area}
                    >
                      <option disabled>Your Society</option>
                      {locations?.map((location) => (
                        <option
                          style={{ fontSize: '0.85rem' }}
                          key={location.id}
                          value={location.society_name}
                        >
                          {' '}
                          {`${location.society_name.substring(0, 19)}...`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mt-3">
                    <label>
                      Address
                    </label>

                    <select
                      className="rounded-1 ms-2"
                      style={{ height: '28px' }}
                      onChange={(e) => setFloor(e.target.value)}
                      value={floor}
                      
                    >
                      <option disabled>Your Address</option>
                      {locations?.map((location) => (
                        <option
                          style={{ fontSize: '0.85rem' }}
                          key={location.id}
                          value={location.address}
                        >
                          {' '}
                          {`${location.address.substring(0, 19)}...`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mt-3">
                    <label>Nearby Landmark </label>
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
                    <label>Your Name</label>
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
                    <label>Your Phone no.</label>
                    <input
                      type="text"
                      className="form-control"
                      
                      placeholder="Phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>
                      Pincode <span className="text-danger">*</span>
                    </label>
                    <select
                      className=" ms-2 rounded-1"
                      style={{ height: '28px' }}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    >
                      <option disabled>Pincode</option>
                      {locations?.map((location) => (
                        <option
                          style={{ fontSize: '0.85rem' }}
                          key={location.id}
                          value={location.pin_code}
                        >
                          {' '}
                          {location.pin_code}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    className="btn btn-animation mt-4 w-50"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Save Address'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditAddressModal
