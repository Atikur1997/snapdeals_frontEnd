import React, { use } from 'react';
import Product from '../Product/Product';
import { NavLink } from 'react-router';

const RecentProducts = ({latestProductPromise}) => {
    const products = use(latestProductPromise)
    console.log(products);
    return <>
        <div className='grid grid-cols-1 md:grid-cols-3  gap-5'>
            {
                products.map(product => <Product
                key = {product._id}
                product = {product}
                ></Product>)
            }

           
        </div>
         <div className='flex justify-center my-3 w-full'>
                <NavLink to='/all-products' className='w-[40%]'>
                    <button className='btn btn-primary w-[100%]'>View All Products</button>
                </NavLink>
            </div>
   </>
};

export default RecentProducts;