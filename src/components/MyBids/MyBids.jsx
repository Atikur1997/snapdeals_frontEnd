import React, { use, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { AuthContext } from "../../context/AuthContext/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);

  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);

  const updateRef = useRef(null);

  // =================================
  // GET BIDS + PRODUCT INFORMATION
  // =================================

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/bids/person?email=${user.email}`)
      .then((res) => res.json())
      .then(async (data) => {
        const bidsWithProduct = await Promise.all(
          data.map(async (bid) => {
            const product = await fetch(
              `http://localhost:5000/products/${bid.product}`
            ).then((res) => res.json());

            return {
              ...bid,
              product,
            };
          })
        );

        setBids(bidsWithProduct);
      })
      .catch((error) => {
        console.log("Fetch error:", error);
      });
  }, [user?.email]);

  // =================================
  // DELETE BID
  // =================================

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this bid!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
           

            if (data.deletedCount > 0) {
              setBids((previousBids) =>
                previousBids.filter(
                  (bid) => String(bid._id) !== String(id)
                )
              );

              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            console.log("Delete error:", error);

            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting the bid.",
              icon: "error",
            });
          });
      }
    });
  };

  // =================================
  // OPEN UPDATE MODAL
  // =================================

  const handleUpdateModal = (bid) => {
    setSelectedBid(bid);

    updateRef.current.showModal();
  };

  // =================================
  // UPDATE BID
  // =================================

  const handleUpdateBid = (e) => {
    e.preventDefault();

    const newBidPrice = Number(e.target.bidPrice.value);

    fetch(`http://localhost:5000/bids/${selectedBid._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bid_price: newBidPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      

        if (data.modifiedCount > 0) {
          // Update the table immediately
          setBids((previousBids) =>
            previousBids.map((bid) =>
              bid._id === selectedBid._id
                ? {
                    ...bid,
                    bid_price: newBidPrice,
                  }
                : bid
            )
          );

          // Close modal
          updateRef.current.close();

          // Clear selected bid
          setSelectedBid(null);

          // Success alert
          Swal.fire({
            title: "Success!",
            text: "Your bid has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Update Failed!",
            text: "Your bid was not updated.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.log("Update error:", error);

        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating your bid.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="px-4">

      {/* =================================
          TOTAL BIDS
      ================================= */}

      <p className="text-center font-extrabold text-primary shadow-2xl text-4xl my-6">
        Total Bids: {bids.length}
      </p>

      {/* =================================
          TABLE
      ================================= */}

      <div className="overflow-x-auto">

        <table className="table">

          {/* TABLE HEAD */}

          <thead>
            <tr>
              <th className="text-center">
                SL No.
              </th>

              <th>
                Name
              </th>

              <th>
                Seller
              </th>

              <th>
                Bid Price
              </th>

              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}

          <tbody>

            {bids.map((bid, index) => (

              <tr key={bid._id}>

                {/* SL NUMBER */}

                <th className="text-center">
                  {index + 1}
                </th>

                {/* USER */}

                <td>

                  <div className="flex items-center gap-3">

                    <div className="avatar">

                      <div className="mask mask-squircle h-12 w-12">

                        <img
                          src={
                            user?.photoURL ||
                            "https://i.pravatar.cc/150?img=40"
                          }
                          alt="User"
                        />

                      </div>

                    </div>

                    <div>

                      <div className="font-bold">
                        {user?.displayName}
                      </div>

                    </div>

                  </div>

                </td>

                {/* SELLER + PRODUCT */}

                <td>

                  <div className="flex items-center gap-5">

                    {/* PRODUCT IMAGE */}

                    <div className="w-30 h-24">

                      <img
                        className="rounded-4xl w-full h-full object-cover"
                        src={bid.product?.image}
                        alt={bid.product?.title}
                      />

                    </div>

                    {/* SELLER INFO */}

                    <div>

                      <p className="font-bold">
                        {bid.product?.seller_name}
                      </p>

                      <p className="text-gray-400">
                        {bid.product?.title}
                      </p>

                    </div>

                  </div>

                </td>

                {/* BID PRICE */}

                <td>

                  <span className="font-semibold text-lg">
                    ৳{bid.bid_price}
                  </span>

                </td>

                {/* ACTION */}

                <td>

                  <div className="w-full flex justify-center items-center gap-2">

                    {/* DELETE */}

                    <button
                      onClick={() => handleDelete(bid._id)}
                      className="btn btn-outline btn-error"
                    >
                      Delete Bid
                    </button>

                    {/* UPDATE */}

                    <button
                      onClick={() => handleUpdateModal(bid)}
                      className="btn btn-outline btn-info"
                    >
                      Update Bid
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* =================================
          UPDATE BID MODAL
      ================================= */}

      <dialog
        ref={updateRef}
        className="modal modal-bottom sm:modal-middle"
      >

        <div className="modal-box">

          <h3 className="font-bold text-2xl mb-6">
            Update Your Bid
          </h3>

          {selectedBid && (

            <form onSubmit={handleUpdateBid}>

              {/* PRODUCT */}

              <div className="mb-4">

                <label className="font-semibold">
                  Product
                </label>

                <input
                  type="text"
                  value={selectedBid.product?.title || ""}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />

              </div>

              {/* SELLER */}

              <div className="mb-4">

                <label className="font-semibold">
                  Seller
                </label>

                <input
                  type="text"
                  value={
                    selectedBid.product?.seller_name || ""
                  }
                  readOnly
                  className="input input-bordered w-full mt-2"
                />

              </div>

              {/* CURRENT BID */}

              <div className="mb-4">

                <label className="font-semibold">
                  Current Bid Price
                </label>

                <input
                  type="text"
                  value={`৳${selectedBid.bid_price}`}
                  readOnly
                  className="input input-bordered w-full mt-2"
                />

              </div>

              {/* NEW BID PRICE */}

              <div className="mb-6">

                <label className="font-semibold">
                  New Bid Price
                </label>

                <input
                  type="number"
                  name="bidPrice"
                  defaultValue={selectedBid.bid_price}
                  min="1"
                  required
                  className="input input-bordered w-full mt-2"
                  placeholder="Enter new bid price"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3">

                {/* CLOSE */}

                <button
                  type="button"
                  onClick={() => {
                    updateRef.current.close();
                    setSelectedBid(null);
                  }}
                  className="btn btn-outline"
                >
                  Close
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>

              </div>

            </form>

          )}

        </div>

      </dialog>

    </div>
  );
};

export default MyBids;