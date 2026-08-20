import React, { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user,logOut } = use(AuthContext);
  const links = 
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>
  {
    user && (
      <>
      <li>
        <NavLink to="/myproducts">My Products</NavLink>
      </li>
      <li>
        <NavLink to="/mybids">My Bids</NavLink>
      </li>
      <li>
        <NavLink to="/create-product">Create Product</NavLink>
      </li>
      </>
    )
  }
    </>
  
  const handleSignOut=()=>{
    logOut()
    .then(()=>{
      localStorage.removeItem('access-token')
    })
  }
  


  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl sticky top-0">
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
        {links}
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
         {links}
        </ul>
      </div>
      <div className="navbar-end">
{
  user ? (
<>

<button className="btn btn-outline btn-info" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } }>
  
  {user.photoURL && <img className=" rounded-full" src={user.photoURL} alt="User" />}
</button>

<ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
  popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }  }>
  <p>{user.displayName}</p>
  <button onClick={handleSignOut} className="btn  btn-outline btn-secondary w-full">Log Out</button>
</ul>
</>
  ) : (<>
      <NavLink to="/register" className="btn btn-primary mx-2">
      Register
    </NavLink>
    <NavLink to="/login" className="btn btn-primary">
      Login
    </NavLink>
  </>

  )
}
      </div>
    </div>
  );
};

export default Navbar;
