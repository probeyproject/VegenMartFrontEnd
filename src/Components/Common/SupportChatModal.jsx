import React, { useState } from "react";
import axios from "axios";
import "./ChatBotCSS.css";
import { Modal } from "reactstrap";
import { baseUrl } from "../../API/Api";

function SupportChatModal({ isOpen, toggle }) {
  const [messages, setMessages] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [availableQueries, setAvailableQueries] = useState([
    "hello",
    "order issue",
    "refund",
    "other",
  ]);
  const [nextQuestions, setNextQuestions] = useState([]);
  const [isMobileFormVisible, setIsMobileFormVisible] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const [showHelpOptions, setShowHelpOptions] = useState(false); // Track whether to show help options

  // Handle pre-defined query selection (hello, order issue, etc.)
  const handleQuerySelection = async (query) => {
    try {
      const response = await axios.post(`${baseUrl}/handle-query`, {
        question: query,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: query, sender: "user" },
        { text: response.data.answer, sender: "bot" },
      ]);

      setAvailableQueries([]);
      setNextQuestions(response.data.nextQuestions);
      setShowHelpOptions(false); // Hide help options if query is successfully handled
    } catch (error) {
      console.error("Error fetching query answer:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: query, sender: "user" },
        {
          text: "Sorry, I could not understand your query. Please choose an option below for further assistance.",
          sender: "bot",
        },
      ]);
      setShowHelpOptions(true); // Show help options if query fails
    }
  };

  // Handle custom message submission by user
  const handleMessageSubmit = async () => {
    if (!userQuery) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userQuery, sender: "user" },
    ]);
    setUserQuery(""); // Reset input field

    try {
      const response = await axios.post(`${baseUrl}/handle-query`, {
        question: userQuery,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.answer, sender: "bot" },
      ]);

      setNextQuestions(response.data.nextQuestions);
      setAvailableQueries([]);
      setShowHelpOptions(false); // Hide help options if query is successfully handled
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I could not understand your query. Please choose an option below for further assistance.",
          sender: "bot",
        },
      ]);
      setShowHelpOptions(true); // Show help options if query fails
    }
  };

  // Handle help option selection ("Contact Us" or "Help Needed")
  const handleHelpOptionSelection = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: option, sender: "user" },
      {
        text: `You selected "${option}". Please enter your mobile number below.`,
        sender: "bot",
      },
    ]);
    setIsMobileFormVisible(true); // Show the mobile input form
    setShowHelpOptions(false); // Hide help options after selection
  };

  // Handle mobile number input and send the data to the API
  const handleMobileSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    if (!userMobile || userMobile.length < 10) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Please enter a valid mobile number.",
          sender: "bot",
        },
      ]);
      return;
    }

    try {
      // Call the API to send the mobile number
      await axios.post(`${baseUrl}/enter-mobile`, {
        phone: userMobile,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMobile, sender: "user" },
        {
          text: `Thank you! Your mobile number ${userMobile} has been recorded.`,
          sender: "bot",
        },
      ]);

      // Hide the mobile form after submission
      setIsMobileFormVisible(false);
      setUserMobile(""); // Clear the input field
    } catch (error) {
      console.error("Error submitting mobile number:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, there was an issue submitting your mobile number. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="targeting-modal-container"
    >
      <div
        className="chatbox-container"
        style={{ background: "transparent !important" }}
      >
        <div className="chatbox">
          <div className="chat-header">
            <h2>Support Chat</h2>
          </div>

          <div className="chat-window">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "user-message" : "bot-message"
                }
              >
                {message.text}
              </div>
            ))}

            {/* Show Mobile Number Input Form if triggered */}
            {isMobileFormVisible && (
              <form onSubmit={handleMobileSubmit} className="mobile-form">
                <input
                  type="text"
                  value={userMobile}
                  onChange={(e) => setUserMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="user-input-field"
                />
              </form>
            )}

            {/* Show help options if the query failed */}
            {showHelpOptions && (
              <div className="help-options">
                <button
                  onClick={() => handleHelpOptionSelection("Contact Us")}
                  className="help-button"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => handleHelpOptionSelection("Help Needed")}
                  className="help-button"
                >
                  Help Needed
                </button>
              </div>
            )}
          </div>

          <div className="query-buttons">
            {/* Show the initial set of available queries if no query has been selected */}
            {availableQueries.length > 0 &&
              availableQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleQuerySelection(query)}
                  className="query-button"
                  style={{ width: "80px", height: "28px" }}
                >
                  {query}
                </button>
              ))}

            {/* Show next set of questions after a query is selected */}
            {nextQuestions.length > 0 &&
              nextQuestions.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleQuerySelection(query)}
                  className="query-button"
                  style={{ width: "80px", height: "28px" }}
                >
                  {query}
                </button>
              ))}
          </div>

          {/* <div className="user-input">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Type your query here"
              className="user-input-field"
              disabled="true"
            />
            <button
              onClick={handleMessageSubmit}
              disabled="true"
              className="send-button"
            >
              Send
            </button>
          </div> */}
        </div>
      </div>
    </Modal>
  );
}

export default SupportChatModal;
