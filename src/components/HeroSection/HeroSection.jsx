import { motion } from "framer-motion";
import left from "../../assets/bg-hero-left.png";
import right from "../../assets/bg-hero-right.png";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router";

const HeroSection = () => {
  const motherVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={motherVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="
        bg-[linear-gradient(130deg,#FFE6FD_0%,#E0F8F5_100%)]
        flex flex-col md:flex-row
        justify-between items-center
        rounded-4xl
        my-3
        overflow-hidden
        px-4
        md:px-0
      "
    >
      {/* LEFT IMAGE */}
      <motion.div variants={childVariants} className="hidden md:block">
        <img src={left} alt="" />
      </motion.div>

      {/* CENTER CONTENT */}
      <motion.div
        variants={childVariants}
        className="w-full flex flex-col justify-center items-center"
      >
        {/* Heading */}
        <motion.div
          variants={childVariants}
          className="text-center w-full md:w-[60%] mt-8"
        >
          <h1 className="text-2xl md:text-5xl font-black">
            Deal your <span className="gradient-text">Products</span>
            <br />
            In a <span className="gradient-text">Smart</span> way!
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={childVariants}
          className="my-5 text-[#627382] text-center px-4"
        >
          <p>
            SnapDeals helps you sell, resell, and shop from trusted local
            sellers — all in one place!
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={childVariants}
          className="w-full flex justify-center items-center my-5"
        >
          <input
            type="text"
            placeholder="Search your products"
            className="
              input
              border-none
              shadow-xl
              w-[70%]
              bg-[#E9E9E9]
              text-center
              outline-0
              rounded-l-4xl
            "
          />

          <CiSearch
            className="
              btn
              bg-linear-[110deg,#632EE3,#9F62F2]
              rounded-r-4xl
              text-white
              shadow-xl
            "
          />
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          variants={childVariants}
          className="
            w-full
            flex
            flex-col
            gap-3
            md:flex-row
            justify-center
            items-center
            my-10
          "
        >
<NavLink to="/all-products">
            <button
            className="
              btn
              w-[80%]
              md:w-auto
              bg-[linear-gradient(110deg,#632EE3,#9F62F2)]
              text-white
              shadow-xl
            "
          >
            Watch All Products
          </button>
</NavLink>

          <button
            className="
              btn
              w-[80%]
              md:w-auto
              btn-outline
              border-[#632EE3]
              text-[#632EE3]
              hover:bg-[linear-gradient(110deg,#632EE3,#9F62F2)]
              hover:text-white
              hover:border-transparent
              md:ml-5
            "
          >
            Post a Product
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div variants={childVariants} className="hidden md:block">
        <img src={right} alt="" />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
