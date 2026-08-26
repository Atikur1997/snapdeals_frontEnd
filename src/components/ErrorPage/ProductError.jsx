import React from "react";
import { Link, useRouteError } from "react-router";

const ProductError = () => {
  const error = useRouteError();

  const status = error?.status || 404;

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative rounded-4xl my-2">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.20),transparent_45%)]" />

      <div className="absolute -left-32 top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />

      <div className="absolute -right-32 bottom-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />


      {/* ================= STARS ================= */}

      <div className="absolute top-[12%] left-[8%] w-1 h-1 bg-white rounded-full animate-pulse" />

      <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-white/70 rounded-full animate-pulse" />

      <div className="absolute top-[15%] right-[15%] w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse" />

      <div className="absolute top-[45%] right-[8%] w-1 h-1 bg-white rounded-full animate-pulse" />

      <div className="absolute bottom-[20%] left-[12%] w-1.5 h-1.5 bg-violet-300 rounded-full animate-pulse" />

      <div className="absolute bottom-[15%] right-[25%] w-1 h-1 bg-white rounded-full animate-pulse" />


      {/* ================= MAIN ================= */}

      <div className="relative z-10 min-h-screen max-w-6xl mx-auto px-6 py-16 flex items-center">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">


          {/* ================= LEFT CONTENT ================= */}

          <div className="order-2 lg:order-1">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">

              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />

              Error {status}

            </div>


            {/* Heading */}

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">

              This page took a

              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">

               Invalid Product

              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-lg text-lg text-slate-400 leading-relaxed">

              Looks like you've drifted off course. <span className="text-error text-xl">The {error.data} </span> you're looking
              for doesn't exist, may have been moved, or is currently out
              of orbit.

            </p>


            {/* ================= BUTTONS ================= */}

            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/"
                className="btn border-0 bg-indigo-600 hover:bg-indigo-500 text-white px-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5M10 21v-6h4v6"
                  />
                </svg>

                Back to Homepage
              </Link>


              <button
                onClick={() => window.history.back()}
                className="btn btn-outline border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
              >
                ← Go Back
              </button>

            </div>


            {/* ================= BRAND ================= */}

            <div className="mt-12">

              <Link
                to="/"
                className="text-2xl font-black"
              >
                Snap
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Deals
                </span>
              </Link>

              <p className="text-sm text-slate-500 mt-1">
                Find it. Bid it. Deal it.
              </p>

            </div>

          </div>


          {/* ================= RIGHT ILLUSTRATION ================= */}

          <div className="order-1 lg:order-2">

            <div className="relative mx-auto w-full max-w-[460px] aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950 border border-white/10 shadow-2xl shadow-indigo-950/50">


              {/* Glow */}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.20),transparent_55%)]" />


              {/* Huge 404 */}

              <div className="absolute inset-0 flex items-center justify-center">

                <span className="text-[170px] sm:text-[200px] font-black text-white/[0.04] select-none">
                  404
                </span>

              </div>


              {/* ================= PLANET ================= */}

              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-gradient-to-br from-violet-400 via-indigo-600 to-purple-950 shadow-[0_0_60px_rgba(99,102,241,0.35)]">

                <div className="absolute inset-0 rounded-full bg-white/5" />

                <div className="absolute top-8 left-8 w-5 h-5 rounded-full bg-white/10" />

                <div className="absolute bottom-10 right-8 w-3 h-3 rounded-full bg-white/10" />


                {/* Planet Ring */}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-12 border-4 border-indigo-300/30 rounded-[50%] rotate-[-18deg]" />

              </div>


              {/* ================= ASTRONAUT ================= */}

              <div className="absolute top-[16%] left-1/2 -translate-x-1/2 animate-[float_5s_ease-in-out_infinite]">

                {/* Tether */}

                <div className="absolute left-1/2 top-0 w-24 h-32 border-l-2 border-slate-400/50 rounded-full rotate-[20deg]" />


                {/* Antenna */}

                <div className="absolute left-1/2 -top-8 -translate-x-1/2">

                  <div className="w-1 h-5 bg-slate-400 mx-auto" />

                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

                </div>


                {/* Helmet */}

                <div className="relative z-20 w-24 h-24 rounded-full bg-slate-100 shadow-xl flex items-center justify-center">

                  {/* Visor */}

                  <div className="w-[68px] h-[60px] rounded-[50%] bg-gradient-to-br from-sky-300 via-indigo-600 to-indigo-950 shadow-inner">

                    <div className="w-5 h-3 bg-white/40 rounded-full rotate-[-20deg] mt-3 ml-3" />

                  </div>

                </div>


                {/* Body */}

                <div className="relative mx-auto -mt-1 w-20 h-28 rounded-3xl bg-slate-100">

                  {/* Chest panel */}

                  <div className="absolute top-7 left-1/2 -translate-x-1/2 w-9 h-6 rounded-md bg-indigo-700">

                    <div className="flex justify-center gap-1 pt-2">

                      <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                    </div>

                  </div>

                </div>


                {/* Left Arm */}

                <div className="absolute top-28 -left-10 w-12 h-5 bg-slate-100 rounded-full rotate-[-25deg]" />

                {/* Right Arm */}

                <div className="absolute top-28 -right-10 w-12 h-5 bg-slate-100 rounded-full rotate-[25deg]" />


                {/* Left Leg */}

                <div className="absolute top-[150px] left-5 w-5 h-12 bg-slate-100 rounded-full rotate-[8deg]" />

                {/* Right Leg */}

                <div className="absolute top-[150px] right-5 w-5 h-12 bg-slate-100 rounded-full rotate-[-8deg]" />

              </div>


              {/* ================= ORBIT DOT ================= */}

              <div className="absolute top-12 right-16 w-3 h-3 rounded-full bg-amber-300 shadow-lg shadow-amber-300/50 animate-spin" />


              {/* Stars inside card */}

              <div className="absolute top-10 left-10 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />

              <div className="absolute top-24 right-10 w-2 h-2 bg-indigo-300 rounded-full animate-pulse" />

              <div className="absolute bottom-28 right-16 w-1 h-1 bg-white rounded-full animate-pulse" />

            </div>

          </div>

        </div>

      </div>


      {/* ================= ANIMATION ================= */}

      <style>{`

        @keyframes float {

          0%, 100% {
            transform: translate(-50%, 0px) rotate(-1deg);
          }

          50% {
            transform: translate(-50%, -14px) rotate(1deg);
          }

        }

      `}</style>

    </div>
  );
};

export default ProductError;