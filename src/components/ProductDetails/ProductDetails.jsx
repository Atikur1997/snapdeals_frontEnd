import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const {_id} = useLoaderData();
  const ProductID=_id
  const[bids,setBids]=useState([]);

  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);
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
    const newBid={
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_contact: phone,
      bid_price: price
    }
    fetch('http://localhost:5000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBid)

    }).then(res=>res.json()).then(data=>{
      if(data.acknowledged){
        Swal.fire({
  position: "center",
  theme: "dark",
  icon: "success",
  title: "Your bid has been placed successfully",
  showConfirmButton: false,
  timer: 1500
});
        bidModalRef.current.close();
      }
    })
  };


  const submitHandler =handleSubmit(handleformData)

  useEffect(()=>{
    fetch(`http://localhost:5000/bids/byproduct/${ProductID}`).then(res=>res.json()).then(data=>{console.log(data)
      setBids(data)
     
    })
  },[ProductID])
  return (
    <div>
      this is product details: {ProductID}
      <div>
        {/* product info  */}
        <div>

        </div>

        <div>
          <button onClick={handleBidModal} className="btn btn-primary">
            I want to buy this Product
          </button>
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
      <div>{/* Bids for this products  */}
        <h3 className="text-2xl font-bold text-center my-2">Bids for this product: <span className="gradient-text">{bids.length}</span></h3>
      </div>
    </div>
  );
};

export default ProductDetails;
