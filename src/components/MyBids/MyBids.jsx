import React, { use, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext/AuthContext';



const MyBids = () => {
    
    const {user}=use(AuthContext)
    console.log(user);
    const [bids,setBids]=useState([])

    const handleDelete = (id) => {
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
            }
          });
      };
      


    useEffect(()=>{
        fetch(`http://localhost:5000/bids/person?email=${user.email}`)
        .then(res=>res.json())
        .then(async(data)=>{
            const bidsWithProduct = await Promise.all(
                data.map(async (bid) => {
                  const product = await fetch(
                    `http://localhost:5000/products/${bid.product}`
                  ).then((res) => res.json());
                  return { ...bid, product };
                })
                
            )
                setBids(bidsWithProduct)
            })
    },[user?.email])

console.log(bids);



    return (
        <div>
            <p className='text-center font-extrabold text-primary shadow-2xl text-4xl my-4'>total bids: {bids.length}</p>
          <div className="overflow-x-auto">
  <table className="table ">
    {/* head */}
    <thead>
      <tr>
        <th>
        SL Nos
        </th>
        <th>Name</th>
        <th>seller</th>
        <th>Bid Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
{bids.map(bid=><tr key={bid._id}>
        <th className='text-center'>
         {bids.indexOf(bid) +1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL|| "U"}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.displayName}</div>
              
            </div>
          </div>
        </td>
        <td className='flex items-center gap-5'>
        <div className=" gap-3 w-30">
            <img className='rounded-4xl' src={bid.product.image} alt="" />
        </div>
        <div>
            <p className='font-bold'>{bid.product.seller_name}</p>
        <p className='text-gray-400'>{bid.product.title}</p>
        </div>

        </td>
        <td>৳{bid.bid_price}</td>
        <th className="flex flex-col md:flex-row justify-center items-center gap-2">
          <button onClick={() => handleDelete(bid._id)} className="btn btn-outline btn-error ">Delete Bid</button>
          <button className="btn btn-outline btn-info ">Update Bid</button>
        </th>
      </tr>)}
  


    </tbody>
  

  </table>
</div>
        </div>
    );
};

export default MyBids;