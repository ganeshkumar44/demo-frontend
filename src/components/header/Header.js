import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// Import the Button component if it's not a built-in one

const Header = ({ handleLogout }) => {
  return (
    <div className="header-wrap">
      <div className="logo">
        <Link to="/dashboard">Logo</Link>
      </div>
      <div className="nav">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
      <div className="users">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
