import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const ProductDetails = () => {
  const { _id } = useLoaderData();
  const ProductID = _id;
  const [bids, setBids] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
const { user } = use(AuthContext);
 const owner = user.email==productInfo?.email;

  const bidModalRef = useRef(null);
  
  console.log(user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleBidModal = () => {
    bidModalRef.current.showModal();
  };

  const handleformData = (data) => {
    const name = data.buyerName;
    const email = data.buyerEmail;
    const phone = data.phone;
    const price = data.bid;
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_contact: phone,
      bid_price: price,
    };
    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const createdBid={...newBid, _id:data.insertedId};
          setBids([...bids, createdBid]);
          Swal.fire({
            position: "center",
            theme: "dark",
            icon: "success",
            title: "Your bid has been placed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          bidModalRef.current.close();
        }
      });
  };

  const submitHandler = handleSubmit(handleformData);

  useEffect(() => {
    fetch(`http://localhost:5000/bids/byproduct/${ProductID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bid data:",data);
        setBids(data);
      });

    fetch(`http://localhost:5000/products/${ProductID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("product data",data);
        setProductInfo(data);
      });
  }, [ProductID]);
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (!result.isConfirmed) return;

    fetch(`http://localhost:5000/bids/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Delete response:", data);

        if (data.deletedCount > 0) {
         
          setBids((previousBids) =>
            previousBids.filter(
              (bid) => String(bid._id) !== String(id)
            )
          );

          Swal.fire({
            title: "Deleted!",
            text: "Your bid has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Bid was not deleted.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);

        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
  });
};

  
  
  return (
    <div className="bg-gray-100 rounded-2xl my-3 p-4 ">
     
      <div className="my-3 ">
        {/* product info  */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 w-96  shadow-xl">
          <img src={productInfo.image} className="w-full rounded-2xl" alt="" />
          <div className="card-body mt-5 bg-base-100 rounded-2xl shadow-2xl">
            <h2 className="card-title">{productInfo.title}</h2>
            <div className=" flex justify-between font-semibold border-b p-5 mt-3">
             <p>
              <span className="font-semibold text-md text-purple-500">Condition:</span>{" "}
              {productInfo.condition}
            </p>
               <p>
              <span className="font-semibold text-md text-purple-500">Usage:</span> {productInfo.usage}
            </p>
            </div>
            <p className="text-gray-400">{productInfo.description}</p>
         
            
            
          </div>
        </div>
       
        <div className="flex-1">
          <div className="p-6 lg:p-8">

  {/* Back */}
  <button
    onClick={() => window.history.back()}
    className="text-sm mb-5 hover:text-primary transition flex items-center gap-2"
  >
    ← Back To Products
  </button>

  {/* Product Title */}
  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
    {productInfo.title || "Product Title"}
  </h1>

  {/* Category */}
  <div className="mb-5">
    <span className="badge badge-secondary badge-sm">
      {productInfo.category || "General"}
    </span>
  </div>

  {/* ================= PRICE ================= */}

  <div className="bg-white shadow-sm rounded-lg p-5 mb-4">

    <div className="text-2xl font-bold text-green-600">
      ৳{productInfo.price_min || 0} - {productInfo.price_max || 0}
    </div>

    <p className="text-sm text-gray-500 mt-1">
      Price starts from
    </p>

  </div>

  {/* ================= PRODUCT DETAILS ================= */}

  <div className="bg-white shadow-sm rounded-lg p-5 mb-4">

    <h2 className="text-lg font-bold mb-4">
      Product Details
    </h2>

    <div className="space-y-2 text-sm">

      <p>
        <span className="font-semibold">
          Product ID:
        </span>{" "}
        {_id}
      </p>

      <p>
        <span className="font-semibold">
          Posted:
        </span>{" "}
        {productInfo.createdAt || "10/19/2024"}
      </p>

    </div>

  </div>

  {/* ================= SELLER INFORMATION ================= */}

  <div className="bg-white shadow-sm rounded-lg p-5">

    <h2 className="text-lg font-bold mb-4">
      Seller Information
    </h2>

    <div className="flex items-center gap-3 mb-4">

      {/* Seller Image / Initial */}

      {productInfo.seller_image ? (

        <img
          src={productInfo.seller_image}
          alt={productInfo.seller_name || "Seller"}
          className="w-12 h-12 rounded-full object-cover"
        />

      ) : (

        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
          {productInfo.seller_name
            ?.charAt(0)
            .toUpperCase() || "U"}
        </div>

      )}

      <div>

        <p className="font-bold">
          {productInfo.seller_name || "Unknown Seller"}
        </p>

        <p className="text-sm text-gray-500">
          {productInfo.email}
        </p>

      </div>

    </div>

    <div className="space-y-2 text-sm">

      <p>
        <span className="font-semibold">
          Location:
        </span>{" "}
        {productInfo.location || "Los Angeles, CA"}
      </p>

      <p>
        <span className="font-semibold">
          Contact:
        </span>{" "}
        {productInfo.seller_contact || "Not available"}
      </p>

      <p>
        <span className="font-semibold">
          Status:
        </span>{" "}

        <span className="badge badge-warning badge-sm">
          On Sale
        </span>
      </p>

    </div>

  </div>

</div>
          <div className="w-[90%] mx-auto">
            <button onClick={handleBidModal} className="btn btn-primary w-full">
            I want to buy this Product
          </button>
          </div>
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
                  {/* if there is a button in form, it will close the modal */}
                  {/* buyer information  starts here */}
                  <div className="flex flex-col md:flex-row gap-2 my-3">
                    <div>
                      <label>Buyer Name</label>
                      <input
                        type="text"
                        defaultValue={user.displayName}
                        {...register("buyerName")}
                        className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50 "
                        readOnly
                      />
                    </div>
                    <div>
                      <div>
                        <label>Buyer Email</label>
                        <input
                          type="email"
                          {...register("buyerEmail")}
                          defaultValue={user.email}
                          className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {/* buyer information  ends here */}
                  <div>
                    <div className="my-5">
                      <label>Place your bid</label>
                      <input
                        type="text"
                        {...register("bid", { required: true })}
                        placeholder="Eg: 1000"
                        className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                      />
                      {errors.bid && (
                        <span className="text-red-600">Bid is required</span>
                      )}
                    </div>
                    <div className="my-5">
                      <label>Buyer Phone Number</label>
                      <input
                        type="text"
                        {...register("phone", { required: true })}
                        placeholder="Eg: +8801xxxxxxxxx"
                        className="input input-bordered w-full focus:outline-none border-0 shadow-xl bg-blue-50"
                      />
                      {errors.phone && (
                        <span className="text-red-600">Phone is required</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 justify-end">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => bidModalRef.current.close()}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary">Submit Bid</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        </div>
        
      </div>

      {/* bids table */}
      <div>
        {/* Bids for this products  */}
        <h3 className="text-2xl font-bold text-center my-2">
          Bids for this product:{" "}
          <span className="gradient-text">{bids.length}</span>
        </h3>

        <div className="overflow-x-auto">
          {owner && (
            <table className="table overflow-x-auto">
              {/* head */}
              <thead>
                <tr>
                  <th>SL.No</th>
                  <th>Buyer-Name</th>
                  <th>Buyer-Email</th>
                  <th>Seller</th>
                  <th>Bidding-Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid) => (
                  <tr>
                    <th>{bids.indexOf(bid) + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            {bid.buyerPhoto ? (
                              <img
                                src={bid.buyerPhoto}
                                alt={bid.buyer_name || "Buyer"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                                {bid.buyer_name?.charAt(0).toUpperCase() || "U"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="font-bold">
                            {bid.buyer_name || "Unknown Buyer"}
                          </div>

                          <div className="text-sm opacity-50">Buyer</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-lg font-bold text-blue-400 shadow-2xl ">
                      {bid.buyer_email}
                    </td>
                    <td className="flex flex-col md:flex-row justify-between">
                      {productInfo.seller_image ? (
                        <img
                          src={productInfo.seller_image}
                          alt={productInfo.seller_name || "Seller"}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary text-primary-content flex items-center justify-center text-xl font-bold">
                          {productInfo.seller_name?.charAt(0).toUpperCase() ||
                            "U"}
                        </div>
                      )}

                      <div>
                        <p p className="font-bold">
                          {productInfo.seller_name}
                        </p>

                        <p>{productInfo.email}</p>
                      </div>
                    </td>
                    <th>  
                      <button className="btn btn-ghost btn-xs">
                        ৳{bid.bid_price}/-
                      </button>
                    </th>
                    <th className="flex flex-col md:flex-row gap-2 justify-center items-center">
                      <button className="btn btn-success btn-outline btn-xs flex-1">
                        Accept offer
                      </button>

                      <button onClick={() => handleDelete(bid._id)} className="btn btn-outline btn-error btn-xs flex-1">
                        Delete offer
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
