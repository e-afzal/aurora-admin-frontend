// import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = ({ activePage }) => {
  const { logout } = useAuth0();

  // Signout using Auth0 where origin is the domain base url
  const handleLogout = () => {
    logout({
      returnTo: window.location.origin
    });
  };

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-logo">
        <img
          src="/images/icons/initial.svg"
          alt="Aurora Jewelry Logo Initial"
        />
      </div>
      <div className="dashboard-links">
        <Link to="/dashboard" className="home-link"
        ><img src="/images/icons/home-icon.svg" alt="Home Link Icon" style={{ backgroundColor: `${activePage === "dashboard" ? "#2e2e2e" : "none"}` }}
          /></Link>
        <hr />
        <Link to="/dashboard/products" className="product-link"
        ><img
            src="/images/icons/products-icon-dark.svg"
            alt="Product Link Icon"
            style={{ backgroundColor: `${activePage === "products" ? "#2e2e2e" : "none"}` }}
          /></Link>
        {/* <Link to="/dashboard/refunds" className="refunds-link"
        ><img
            src="/images/icons/exchange-icon.svg"
            alt="Refunds Link Icon"
            style={{ backgroundColor: `${activePage === "refunds" ? "#2e2e2e" : "none"}` }}
          /></Link> */}
        <Link to="/dashboard/orders" className="order-link"
        ><img
            src="/images/icons/orders-icon-dark.svg"
            alt="Order Link Icon"
            style={{ backgroundColor: `${activePage === "orders" ? "#2e2e2e" : "none"}` }}
          /></Link>
        <Link to="/dashboard/customers" className="customer-link"
        ><img
            src="/images/icons/customers-icon-dark.svg"
            alt="Customer Link Icon"
            style={{ backgroundColor: `${activePage === "customers" ? "#2e2e2e" : "none"}` }}
          /></Link>
        <Link to="/dashboard/conditions" className="conditions-link"
        ><img
            src="/images/icons/conditions-icon-dark.svg"
            alt="Conditions Link Icon"
            style={{ backgroundColor: `${activePage === "conditions" ? "#2e2e2e" : "none"}` }}
          /></Link>
      </div>
      <div className="dashboard-logout" style={{ marginTop: "7rem", display: "flex", justifyContent: "center" }} onClick={handleLogout}>
        <img src="/images/icons/exit-outline.svg"
          alt="logout icon"
          style={{ cursor: "pointer", height: "43px", width: "43px", paddingBlock: "5px" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;