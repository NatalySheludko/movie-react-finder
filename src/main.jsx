import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./index.module.css";
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
