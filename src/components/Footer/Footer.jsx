import React from "react";
import { NavLink } from "react-router";
import { AiFillChrome } from "react-icons/ai";
import { CiPhone } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const Footer = () => {
  return (
    <div className="flex flex-col  md:flex-row items-center md:items-start justify-start  md:justify-center-safe px-5 md:px-20 py-10 md:gap-52 bg-[#001931] text-[#A1A1AA] rounded-2xl">
      <div className="flex flex-col justify-start">
        <NavLink to="/" className="flex items-center">
          <h1 className="text-3xl font-bold">
            Snap<span className="gradient-text">Deals</span>
          </h1>
        </NavLink>

        <p className="mt-3 max-w-xs text-[#A1A1AA]">
          Your trusted marketplace for authentic local products. Discover the
          best deals from across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 justify-between gap-10">
        <div className="grid grid-cols-1">
          <h3 className="font-bold text-xl text-white">Quick Links</h3>
          <NavLink to="/all-products" className="mt-2">
            All Products
          </NavLink>
          <NavLink to="/all-products">Dashboard</NavLink>
          <NavLink to="/all-products">Login</NavLink>
          <NavLink to="/all-products">Register</NavLink>
        </div>
        <div className="grid grid-cols-1">
          <h3 className="font-bold text-xl text-white">Category</h3>
          <NavLink to="/all-products" className="mt-2">
            Electronics
          </NavLink>
          <NavLink to="/all-products">Fashion</NavLink>
          <NavLink to="/all-products">Home & Living</NavLink>
          <NavLink to="/all-products">Groceries</NavLink>
        </div>
        <div className="grid grid-cols-1">
          <h3 className="font-bold text-xl text-white">Contact & Support</h3>
          <NavLink className="flex items-center gap-2">
            <AiFillChrome className="text-xl" /> nishan@gmail.com
          </NavLink>
          <NavLink className="flex items-center gap-2">
            <CiPhone className="text-xl" />
            +880 123 456 789
          </NavLink>
          <NavLink className="flex items-center gap-2">
            <CiLocationOn className=" text-4xl" />
            123 Commerce Street, Dhaka, Bangladesh
          </NavLink>
        </div>
        <div className="grid grid-cols-1">
          <h3 className="font-bold text-xl text-white mb-2">Social Links</h3>
          <div className="flex gap-10">
            <NavLink to="">
              <FaXTwitter className="w-10 h-10" />
            </NavLink>
            <NavLink to="">
              <FaFacebook className="w-10 h-10" />
            </NavLink>
            <NavLink to="">
              <TiSocialLinkedinCircular className="  w-10 h-10  " />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
