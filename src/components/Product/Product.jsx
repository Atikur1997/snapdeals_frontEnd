import React from "react";
import { NavLink } from "react-router";

const Product = ({ product }) => {
  const { title, image, price_max, price_min, usage } = product;

  return (
    <div className="h-full">
      <div className="card bg-base-100 w-full h-full shadow-sm border border-gray-100">

        {/* Image */}
        <figure className="px-10 pt-10">
          <img
            src={image}
            alt={title}
            className="w-full h-52 object-cover rounded-xl"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body">

          {/* Title */}
          <h2 className="card-title  ">
            {title} [{usage}]
          </h2>

          {/* Price */}
          <p className="font-semibold">
             {'\u09F3'} {price_min}/- ~ {'\u09F3'} {price_max}/-
          </p>

          {/* Button */}
          <div className="card-actions mt-auto mx-auto w-full">
            <NavLink to={`/product/${product._id}`} className="btn btn-outline border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white hover:duration-2000 w-full">
             View Details
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;