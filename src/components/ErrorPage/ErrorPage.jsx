import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error?.status || 404;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="max-w-lg w-full text-center">

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[120px] md:text-[160px] font-black leading-none gradient-text">
            {status}
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 blur-2xl"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {status === 404
            ? "Oops! Page Not Found"
            : "Something Went Wrong"}
        </h2>

        {/* Description */}
        <p className="text-base-content/60 text-lg leading-relaxed mb-8">
          {status === 404
            ? "The page you're looking for doesn't exist or may have been moved."
            : "Something unexpected happened. Please try again or return to the homepage."}
        </p>

        {/* Error message - development friendly */}
        {error?.data && (
          <p className="text-4xl text-error mb-6 font-extrabold animate-pulse">
            {error.data}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">

          <Link
            to="/"
            className="btn btn-primary px-8"
          >
            ← Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-8"
          >
            Go Back
          </button>

        </div>

        {/* Branding */}
        <div className="mt-12">
          <Link
            to="/"
            className="text-2xl font-bold"
          >
            Snap<span className="gradient-text">Deals</span>
          </Link>

          <p className="text-xs text-base-content/40 mt-2">
            Find it. Bid it. Deal it.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;