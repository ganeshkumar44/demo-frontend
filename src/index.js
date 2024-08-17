import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "../src/styles/global.css";
import App from "./App";
import Dashboard from "./components/dashboard/Dashboard";
import Users from "./components/users/Users";
import Register from "./components/register/Register";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated to createRoot

// Render the application
root.render(
  <Router>
    <Routes>
      <Route path="/login" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
