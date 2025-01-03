import React from 'react';
import axios from 'axios';

const Payment = ({ amount, currency }) => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-order', {
                amount: amount * 100, // Convert to paise
            });

            // const { id: order_id, amount: orderAmount }
            

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key ID
                amount: orderAmount,
                currency,
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id,
                handler: (response) => {
                    alert(`Payment Successful: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <h1>Payment Page</h1>
            <p>Amount: {amount} {currency}</p>
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default Payment;
