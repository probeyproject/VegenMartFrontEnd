import React, { useState } from 'react'
import { FaShareAlt, FaShoppingBag, FaRupeeSign } from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Referral = () => {
  
  const userState = useSelector((state) => state.user);
  const referralCode = userState?.user?.referral_code; // Your referral code

  const referralLink = `https://vegenmart.com/?referralCode=${referralCode}`

  const [showAlert, setShowAlert] = useState(false)

  // Function to copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => setShowAlert(true))
      .catch((err) => console.error('Error copying to clipboard: ', err))
      nav
  }

  return (
    <div className="container mt-2">
      <h3>Manage Referrals</h3>
      <span className="title-leaf"></span>
      <h4 className='mt-4'>How it works</h4>
      <div className="row align-items-start mt-4">
        <div className="col-1 d-flex flex-column align-items-center">
          <FaShareAlt size={10} />
          <div style={{ height: '40px', borderLeft: '2px solid #ddd' }}></div>
          <FaShoppingBag size={10} />
          <div style={{ height: '40px', borderLeft: '2px solid #ddd' }}></div>
          <FaRupeeSign size={10} />
        </div>

        <div className="col ">
          <p>Share the referral link with your friend & family</p>
          <p>
            After your friend places their login, you will get 50 
            <br/>
            reward points.
          </p>
          <p>This Rewards you will use in your order to discounts</p>
        </div>
      </div>

      <h4 className="text-center mb-3 mt-5">Share Your Referral Code</h4>

      <p className="text-center mb-5">
        Invite your friends to join using your referral code and earn rewards!
      </p>

      {/* Show alert when link is copied */}
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Referral link copied to clipboard!
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true" className=''>&times;</span>
          </button>
        </div>
      )}

      {/* Referral Code Display */}
      <div className="mb-3 text-center">
        <h4>
          Your Referral Code: <span className="text-info font-weight-bold">{referralCode}</span>
        </h4>
      </div>

      {/* Input Group to display the referral link */}
      <div className="input-group mb-4">
        <input type="text" className="form-control" value={referralLink} readOnly />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary ms-2" onClick={handleCopyLink}>
            Copy Link
          </button>
        </div>
      </div>

      {/* Social Media Share buttons with Custom Icons */}
      <div className="d-flex justify-content-center">
        {/* Share on Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-primary mx-2 btn-lg"
          role="button"
        >
          {/* Custom Facebook Icon */}
          <img
            src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
            alt="Facebook Icon"
            style={{ width: '30px', height: '30px' }} // Adjust size
          />
        </a>

        {/* Share on Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-info mx-2 btn-lg"
          role="button"
        >
          {/* Custom Twitter Icon */}
          <img
            src="https://img.icons8.com/?size=100&id=yoQabS8l0qpr&format=png&color=000000"
            alt="Twitter Icon"
            style={{ width: '30px', height: '30px' }} // Adjust size
          />
        </a>

        {/* Share on WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out this referral link: ${referralLink}`)}`}
          target="_blank"
          className="btn btn-success mx-2 btn-lg"
          role="button"
        >
          {/* Custom WhatsApp Icon */}
          <img
            src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000"
            alt="WhatsApp Icon"
            style={{ width: '30px', height: '30px' }} // Adjust size
          />
        </a>

        {/* Share on Instagram */}
        <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(referralLink)}`}
          target="_blank"
          className="btn btn-danger mx-2 btn-lg"
          role="button"
        >
          {/* Custom Instagram Icon */}
          <img
            src="https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000"
            alt="Instagram Icon"
            style={{ width: '30px', height: '30px' }} // Adjust size
          />
        </a>

        {/* Custom Share Invite Link button */}
      </div>
    </div>
  )
}

export default Referral
