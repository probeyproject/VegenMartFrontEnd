import React from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { baseUrl } from '../../API/Api'

function DeleteAddressModal({ isOpen, toggle,addressId, onClose}) {

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/deleteAddressById/${addressId}`, {
        method: 'DELETE',
      }); 

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Address Delete Successful");
        // Handle successful deletion (e.g., update UI, show a message, etc.)
      } else {
        console.error('Failed to delete Address:', response.status);
        toast.error("There was a problem, Address not deleted");
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the Address");
      // Handle network or other errors
    } finally {
      onClose();; // Ensure the modal is closed in any case
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalBody className="text-center">
          <p>Are you sure you want to delete this address?</p>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button color="danger" onClick={handleDelete} style={{ backgroundColor: '#FF5A5F' }}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle} style={{ backgroundColor: '#E0E0E0', color: '#000' }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteAddressModal;
