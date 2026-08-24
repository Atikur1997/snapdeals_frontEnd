import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {user,googleLogin}= use(AuthContext)
  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      console.log(result.user);
      const newUser={
        name:result.user.displayName,
        email:result.user.email,
        photo:result.user.photoURL
      }
      //create user in dataBase 
      fetch("http://localhost:5000/users/google/signin",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(newUser)
      }).then(res=>res.json()).then(data=>{
        console.log("data after saving : ",data);
      })

    })
  }
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen bg-[linear-gradient(130deg,#FFE6FD_0%,#E0F8F5_100%)] flex justify-center items-center px-4 rounded-4xl my-3">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Snap<span className="gradient-text">Deals</span>
          </h1>
          <p className="text-gray-500 mt-2">Welcome back! Login to continue.</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full mt-2 border border-gray-300 focus:outline-none focus:border-[#632EE3]"
            />
          </div>

          <div className="relative">
            <label className="font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input w-full mt-2 border border-gray-300 focus:outline-none focus:border-[#632EE3]"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-3 text-xl text-[#A1A1AA] top-10"
                onClick={handleTogglePassword}
              />
            ) : (
              <FaRegEye
                className="absolute right-3 text-xl text-[#A1A1AA] top-10"
                onClick={handleTogglePassword}
              />
            )}
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-[#632EE3] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button  className="btn w-full text-white border-none bg-[linear-gradient(110deg,#632EE3,#9F62F2)]">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google */}
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-[#632EE3] hover:underline"
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
