import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = [
    { text: "Home", to: "/" },
    { text: "All Products", to: "/all-products" },
    { text: "My Products", to: "/myProducts" },
    { text: "My Bids", to: "/mybids" },
    { text: "Create Product", to: "/createProduct" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link, index) => (
              <li key={index}>
                <NavLink to={link.to}>{link.text}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost pointer text-2xl">
          <h1>
            Snap<span className="gradient-text">Deals</span>
          </h1>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to}>{link.text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
