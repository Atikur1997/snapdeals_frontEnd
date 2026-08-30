import React, { use, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContext/AuthContext';

const MyBids = () => {
    
    const {user}=use(AuthContext)
    console.log(user);
    const [bids,setBids]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/bids/person?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
                setBids(data)
            })
    },[user?.email])
    return (
        <div>
            <p>total bids: {bids.length}</p>
        </div>
    );
};

export default MyBids;