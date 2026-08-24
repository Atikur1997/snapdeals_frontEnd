import React from "react";
import HeroSection from "./../HeroSection/HeroSection";
import RecentProducts from "../RecentProducts/RecentProducts";
const latestProductPromise= fetch("http://localhost:5000/products/recent").then(res=>res.json())
const Home = () => {

  return (
    <div>
      <HeroSection />
      <h2 className="text-2xl font-bold text-center my-2">Recent <span className="gradient-text">Products</span> </h2>
     <RecentProducts latestProductPromise={latestProductPromise}></RecentProducts>
    </div>
  );
};

export default Home;
