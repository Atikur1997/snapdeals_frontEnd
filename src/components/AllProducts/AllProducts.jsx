import React from "react";
import { useLoaderData } from "react-router";
import Product from "../Product/Product";
import HeroSection from "../HeroSection/HeroSection";

const AllProducts = () => {
  const products = useLoaderData();
 
  return <>
  <HeroSection></HeroSection>
    <div className='text-4xl font-bold text-center my-5'>All Products</div>
          <div className='grid grid-cols-1 md:grid-cols-3  gap-5'>
            {
                products.map(product => <Product
                key = {product._id}
                product = {product}
                ></Product>)
            }

           
        </div>
  </>
};

export default AllProducts;
