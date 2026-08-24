import { use, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  // Profile image load হয়েছে কিনা
  const [imageError, setImageError] = useState(false);

  console.log("NAVBAR USER:", user);
  console.log("NAVBAR PHOTO:", user?.photoURL);

  // Google profile photo URL
  const profilePhoto = user?.photoURL
    ? user.photoURL.replace("=s96-c", "=s200-c")
    : null;

  // User এর নামের প্রথম অক্ষর
  const userInitial =
    user?.displayName?.charAt(0).toUpperCase() || "U";

  // Logout
  const handleSignOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("access-token");
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // Navigation links
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>

      {user && (
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
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl sticky top-0 z-50">

      {/* ==================================================
          LEFT SIDE
      ================================================== */}
      <div className="navbar-start">

        {/* Mobile menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink
          to="/"
          className="btn btn-ghost text-2xl"
        >
          <h1>
            Snap<span className="gradient-text">Deals</span>
          </h1>
        </NavLink>
      </div>

      {/* ==================================================
          CENTER
      ================================================== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* ==================================================
          RIGHT SIDE
      ================================================== */}
      <div className="navbar-end">

        {user ? (
          <>
            {/* ================= USER BUTTON ================= */}
            <button
              className="btn btn-outline btn-info p-1"
              popoverTarget="user-popover"
              style={{
                anchorName: "--user-anchor",
              }}
            >

              {/* Profile Image */}
              {profilePhoto && !imageError ? (
                <img
                  src={profilePhoto}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                  onLoad={() => {
                    console.log("✅ PROFILE IMAGE LOADED");
                  }}
                  onError={(event) => {
                    console.log("❌ PROFILE IMAGE FAILED");
                    console.log(
                      "Image URL:",
                      event.currentTarget.src
                    );

                    setImageError(true);
                  }}
                />
              ) : (
                /* ================= FALLBACK AVATAR ================= */
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">
                  {userInitial}
                </div>
              )}
            </button>

            {/* ================= USER DROPDOWN ================= */}
            <ul
              className="dropdown menu w-64 rounded-box bg-base-100 shadow-lg p-4"
              popover="auto"
              id="user-popover"
              style={{
                positionAnchor: "--user-anchor",
              }}
            >

              {/* User information */}
              <li className="mb-3">
                <div className="flex items-center gap-3">

                  {/* Small avatar */}
                  {profilePhoto && !imageError ? (
                    <img
                      src={profilePhoto}
                      alt={user.displayName || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl">
                      {userInitial}
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {user.displayName || "User"}
                    </span>

                    <span className="text-xs text-gray-500 break-all">
                      {user.email}
                    </span>
                  </div>

                </div>
              </li>

              {/* Divider */}
              <div className="divider my-1"></div>

              {/* Logout */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-secondary w-full"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </>
        ) : (
          /* ==================================================
             LOGGED OUT
          ================================================== */
          <>
            <NavLink
              to="/register"
              className="btn btn-primary mx-2"
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              className="btn btn-primary"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;