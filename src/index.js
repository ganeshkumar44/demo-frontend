import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "../src/styles/global.css";
// import { Provider } from "react-redux";
// import { store } from "./redux/store/store";
import App from "./App";
import Dashboard from "./components/dashboard/Dashboard"; // Your dashboard component

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated to createRoot

// Render the application
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
