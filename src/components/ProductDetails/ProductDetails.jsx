import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { _id } = useLoaderData();

  const ProductID = _id;

  const [bids, setBids] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  const bidModalRef = useRef(null);

  const { user } = use(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // ============================================
  // Open Bid Modal
  // ============================================

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  // ============================================
  // Fetch Bids
  // ============================================

  const fetchBids = () => {
    fetch(`http://localhost:5000/bids/byproduct/${ProductID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated bids:", data);
        setBids(data);
      })
      .catch((error) => {
        console.error("Failed to fetch bids:", error);
      });
  };

  // ============================================
  // Fetch Product Information
  // ============================================

  const fetchProductInfo = () => {
    fetch(`http://localhost:5000/products/${ProductID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Product info:", data);
        setProductInfo(data);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  };

  // ============================================
  // Initial Data Loading
  // ============================================

  useEffect(() => {
    fetchBids();
    fetchProductInfo();
  }, [ProductID]);

  // ============================================
  // Submit Bid
  // ============================================

  const handleformData = (data) => {
    const newBid = {
      product: ProductID,

      buyer_name: data.buyerName,

      buyer_email: data.buyerEmail,

      buyer_contact: data.phone,

      bid_price: data.bid,

      buyerPhoto: user?.photoURL || "",
    };

    console.log("New Bid:", newBid);

    fetch("http://localhost:5000/bids", {
      method: "POST",

      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log("POST response:", data);

        if (data.acknowledged) {
          // ========================================
          // Fetch latest bids
          // ========================================

          fetchBids();

          // ========================================
          // Close Modal
          // ========================================

          bidModalRef.current.close();

          // ========================================
          // Reset Form
          // ========================================

          reset();

          // ========================================
          // Success Message
          // ========================================

          Swal.fire({
            position: "center",

            theme: "dark",

            icon: "success",

            title: "Your bid has been placed successfully",

            showConfirmButton: false,

            timer: 1500,
          });
        }
      })

      .catch((error) => {
        console.error("Bid submission failed:", error);

        Swal.fire({
          icon: "error",

          title: "Something went wrong",

          text: "Unable to place your bid.",
        });
      });
  };

  const submitHandler = handleSubmit(handleformData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ==========================================
          PRODUCT INFORMATION
      =========================================== */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Product Details
        </h2>

        <p className="text-sm text-gray-500">
          Product ID: {ProductID}
        </p>

      </div>


      {/* ==========================================
          BUY BUTTON
      =========================================== */}

      <div className="mb-8">

        <button
          onClick={handleBidModal}
          className="btn btn-primary"
        >
          I want to buy this Product
        </button>


        {/* ========================================
            BID MODAL
        ========================================= */}

        <dialog
          ref={bidModalRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >

          <div className="modal-box">

            <h3 className="font-bold text-2xl text-center">
              Give Seller Your Offered Price
            </h3>


            <div className="modal-action">

              <form onSubmit={submitHandler}>

                {/* ==================================
                    BUYER INFORMATION
                =================================== */}

                <div className="flex flex-col md:flex-row gap-2 my-3">

                  {/* Buyer Name */}

                  <div>

                    <label className="label">
                      Buyer Name
                    </label>

                    <input
                      type="text"
                      defaultValue={user?.displayName || ""}
                      {...register("buyerName")}
                      className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                      readOnly
                    />

                  </div>


                  {/* Buyer Email */}

                  <div>

                    <label className="label">
                      Buyer Email
                    </label>

                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      {...register("buyerEmail")}
                      className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                      readOnly
                    />

                  </div>

                </div>


                {/* ==================================
                    BID PRICE
                =================================== */}

                <div className="my-5">

                  <label className="label">
                    Place your bid
                  </label>

                  <input
                    type="text"
                    {...register("bid", {
                      required: true,
                    })}
                    placeholder="Eg: 1000"
                    className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                  />

                  {errors.bid && (
                    <span className="text-red-600">
                      Bid is required
                    </span>
                  )}

                </div>


                {/* ==================================
                    BUYER PHONE
                =================================== */}

                <div className="my-5">

                  <label className="label">
                    Buyer Phone Number
                  </label>

                  <input
                    type="text"
                    {...register("phone", {
                      required: true,
                    })}
                    placeholder="Eg: +8801xxxxxxxxx"
                    className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                  />

                  {errors.phone && (
                    <span className="text-red-600">
                      Phone is required
                    </span>
                  )}

                </div>


                {/* ==================================
                    BUTTONS
                =================================== */}

                <div className="flex flex-col md:flex-row gap-2 justify-end">

                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      bidModalRef.current.close()
                    }
                  >
                    Close
                  </button>


                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit Bid
                  </button>

                </div>

              </form>

            </div>

          </div>

        </dialog>

      </div>


      {/* ==========================================
          BIDS COUNT
      =========================================== */}

      <div>

        <h3 className="text-2xl font-bold text-center my-5">

          Bids for this product:

          <span className="gradient-text ml-2">
            {bids.length}
          </span>

        </h3>


        {/* ========================================
            BIDS TABLE
        ========================================= */}

        <div className="overflow-x-auto">

          <table className="table">

            {/* ===============================
                TABLE HEAD
            ================================ */}

            <thead>

              <tr>

                <th>
                  SL.No
                </th>

                <th>
                  Buyer-Name
                </th>

                <th>
                  Buyer-Email
                </th>

                <th>
                  Seller
                </th>

                <th>
                  Bidding-Price
                </th>

              </tr>

            </thead>


            {/* ===============================
                TABLE BODY
            ================================ */}

            <tbody>

              {bids.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No bids have been placed yet.
                  </td>

                </tr>

              ) : (

                bids.map((bid, index) => (

                  <tr key={bid._id}>

                    {/* ==========================
                        SERIAL
                    =========================== */}

                    <th>
                      {index + 1}
                    </th>


                    {/* ==========================
                        BUYER
                    =========================== */}

                    <td>

                      <div className="flex items-center gap-3">

                        {/* Buyer Avatar */}

                        <div className="avatar">

                          <div className="h-12 w-12 rounded-full overflow-hidden">

                            {bid.buyerPhoto ? (

                              <img
                                src={bid.buyerPhoto}
                                alt={
                                  bid.buyer_name || "Buyer"
                                }
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <div className="h-full w-full rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">

                                {bid.buyer_name
                                  ?.charAt(0)
                                  .toUpperCase() || "U"}

                              </div>

                            )}

                          </div>

                        </div>


                        {/* Buyer Name */}

                        <div>

                          <div className="font-bold">

                            {bid.buyer_name ||
                              "Unknown Buyer"}

                          </div>

                          <div className="text-sm opacity-50">

                            Buyer

                          </div>

                        </div>

                      </div>

                    </td>


                    {/* ==========================
                        BUYER EMAIL
                    =========================== */}

                    <td className="text-lg font-bold text-blue-400">

                      {bid.buyer_email}

                    </td>


                    {/* ==========================
                        SELLER
                    =========================== */}

                    <td>

                      <div className="flex items-center gap-3">

                        {/* Seller Image */}

                        {productInfo.seller_image ? (

                          <img
                            src={productInfo.seller_image}
                            alt={
                              productInfo.seller_name ||
                              "Seller"
                            }
                            className="h-12 w-12 rounded-full object-cover"
                          />

                        ) : (

                          <div className="h-12 w-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">

                            {productInfo.seller_name
                              ?.charAt(0)
                              .toUpperCase() || "U"}

                          </div>

                        )}


                        {/* Seller Info */}

                        <div>

                          <p className="font-bold">

                            {productInfo.seller_name ||
                              "Unknown Seller"}

                          </p>

                          <p className="text-sm opacity-60">

                            {productInfo.email}

                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ==========================
                        BID PRICE
                    =========================== */}

                    <th>

                      <button className="btn btn-ghost btn-xs">

                        ৳{bid.bid_price}/-

                      </button>

                    </th>

                  </tr>

                ))

              )}

            </tbody>


            {/* ===============================
                TABLE FOOTER
            ================================ */}

            <tfoot>

              <tr>

                <th>
                  SL.No
                </th>

                <th>
                  Buyer-Name
                </th>

                <th>
                  Buyer-Email
                </th>

                <th>
                  Seller
                </th>

                <th>
                  Bidding-Price
                </th>

              </tr>

            </tfoot>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;