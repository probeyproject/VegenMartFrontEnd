import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../API/Api";
import { useParams } from "react-router-dom";
import logo from "../assets/images/logo/1.png";

const formatDates = (dateString) => {
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Format as DD-MM-YYYY
  return `${day}-${month}-${year}`;
};

const MyInvoice = () => {
  const { orderId } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toISOString().split("T")[0]; // Extracts only the date part (YYYY-MM-DD)
  //   };

  useEffect(() => {
    // Function to generate a 6-digit random number
    const generateRandomInvoiceNo = () => {
      return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
    };

    // Set the invoice number when the component mounts
    setInvoiceNo(generateRandomInvoiceNo());
  }, []);

  const invoiceOrderById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getOrderById/${orderId}`);
      const data = response.data; // This is already parsed as JSON
      setInvoice(data); // Assuming setOrder is defined in your component
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    invoiceOrderById();
  }, []);

  useEffect(() => {
    // Function to format the date as DD-MMM-YYYY
    const formatDate = () => {
      const today = new Date();
      const day = today.getDate(); // Get day of the month
      const month = today.toLocaleString("default", { month: "short" }); // Get 3-letter month abbreviation (e.g., 'Nov')
      const year = today.getFullYear(); // Get year
      return `${day}-${month}-${year}`;
    };

    // Set the current formatted date in state
    setCurrentDate(formatDate());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="theme-invoice-1">
      <div className="container">
        <div className="row">
          <div className="col-xxl-6 col-xl-8 mx-auto my-3">
            <div className="invoice-wrapper">
              <div className="invoice-header">
                <div className="header-image">
                  <img src={logo} className="img-fluid h-25 w-25" alt="logo" />
                </div>
                <div className="header-content">
                  <h3>Invoice</h3>
                </div>
              </div>
              <div className="invoice-body">
                <div className="top-sec">
                  <div className="row">
                    <div className="col-12">
                      <div className="details-box">
                        <div className="address-box">
                          <ul>
                            <li>{invoice.address_type},</li>
                            <li>
                              {invoice.area}, {invoice.flat},
                            </li>
                            <li>
                              {invoice.floor}, {invoice.postal_code}
                            </li>
                          </ul>
                        </div>
                        <div className="address-box">
                          <ul>
                            <li className="theme-color">
                              Issue Date :{" "}
                              <span className="text-content">
                                {formatDates(invoice.updated_at)},
                              </span>
                            </li>
                            <li className="theme-color">
                              Invoice No :{" "}
                              <span className="text-content">{invoiceNo},</span>
                            </li>
                            <li className="theme-color">
                              Phone No :{" "}
                              <span className="text-content">
                                {invoice.address_phone}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-table">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Invoice Date:</th>
                          <th>Invoice No:</th>
                          <th>Payment Mode:</th>
                          <th>Total Amount:</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currentDate}</td>
                          <td>{invoiceNo}</td>
                          <td>{invoice.payment_mode}</td>
                          <td>₹{invoice.total_price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="invoice-table-2">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th className="text-start">Item detail</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Amout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.products &&
                        Array.isArray(invoice.products) &&
                        invoice.products.length > 0 ? (
                          invoice.products.map((data, index) => (
                            <tr key={index}>
                              <td className="text-content">{index + 1}</td>
                              <td>
                                <ul className="text-start item-detail">
                                  <li>{data.product_name}</li>
                                  {/* <li className="text-content">
                                    Lorem ipsum dolor sit, amet, consectetur
                                    adipisicing elit.
                                  </li> */}
                                </ul>
                              </td>
                              <td>
                                {data.unit} {data.weight_type}
                              </td>
                              <td>₹{data.product_price}</td>
                              <td>₹{data.price}</td>
                            </tr>
                          ))
                        ) : (
                          <div>No products found.</div>
                        )}

                        <tr>
                          <td className="text-content">-</td>
                          <td>
                            <ul className="text-start item-detail">
                              <li>Shipping Cost</li>
                            </ul>
                          </td>
                          <td>-</td>
                          <td>₹50</td>
                          <td>₹50</td>
                        </tr>

                        <tr>
                          <td className="text-content">-</td>
                          <td>
                            <ul className="text-start item-detail">
                              <li>GST Cost</li>
                            </ul>
                          </td>
                          <td>-</td>
                          <td>18%</td>
                          <td>
                            ₹{((invoice.total_price + 50) * 0.18).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="price-box">
                  <ul>
                    <div className="d-flex justify-content-between">
                      <div className="div">
                        <li>GRAND TOTAL</li>
                      </div>
                      <div>
                        <li className="theme-color me-5">
                          ₹{invoice.total_price}
                        </li>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="invoice-footer">
                <div className="signature-box">
                  <img src={logo} className="img-fluid h-25 w-25 mt-3" alt="" />
                  <h5>Authorised Sign</h5>
                </div>
                <div className="button-group">
                  <ul>
                    <li>
                      <button
                        className="btn btn-animation text-white rounded"
                        onClick={handlePrint} // Use onClick for React
                      >
                        Export As PDF
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-animation text-white print-button rounded ms-2"
                        onClick={handlePrint} // Use onClick for React
                      >
                        Print
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyInvoice;
