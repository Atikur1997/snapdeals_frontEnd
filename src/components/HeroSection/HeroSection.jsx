import left from "../../assets/bg-hero-left.png";
import right from "../../assets/bg-hero-right.png";
import { CiSearch } from "react-icons/ci";
const HeroSection = () => {
  return (
    <div className="bg-[linear-gradient(130deg,#FFE6FD_0%,#E0F8F5_100%)] flex justify-between items-center">
      <div>
        <img src={left} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="text-center w-full md:w-[60%] mt-5">
          <h1 className="text-xl md:text-5xl font-black ">
            Deal your <span className="gradient-text">Products </span>
            In a<span className="gradient-text"> Smart</span> way !
          </h1>
        </div>
        <div className="my-5 text-[#627382] text-center">
          <p>
            SnapDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </p>
        </div>
        <div className="w-full flex justify-center items-center my-5">
          <input
            type="text"
            placeholder="Search your products"
            className="input border-none shadow-xl w-[70%]  bg-[#E9E9E9] text-center outline-0 rounded-l-4xl"
          />
          <CiSearch className="btn bg-linear-[110deg,#632EE3,#9F62F2] rounded-r-4xl text-white shadow-xl" />
        </div>
        <div className="w-full flex flex-col gap-3 md:flex-row justify-center items-center my-10">
          <button className="btn w-[80%] md:w-auto bg-[linear-gradient(110deg,#632EE3,#9F62F2)] text-white shadow-xl">
            Watch All Products
          </button>

          <button
            className="btn w-[80%] md:w-auto btn-outline border-[#632EE3] text-[#632EE3]
    hover:bg-[linear-gradient(110deg,#632EE3,#9F62F2)]
    hover:text-white hover:border-transparent md:ml-5"
          >
            Post a Product
          </button>
        </div>
      </div>
      <div>
        <img src={right} alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
