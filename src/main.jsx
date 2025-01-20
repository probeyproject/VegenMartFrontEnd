import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/css/style.css";
import "./assets/css/animate.min.css";
import "./assets/css/animate.css";
import "./assets/css/font-style.css";
import "./assets/css/bulk-style.css";
import "./assets/css/vendors/ion.rangeSlider.min.css";
import "./index.css";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "./store";
import { UserProvider } from "./Context/UserContrxt";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
);
