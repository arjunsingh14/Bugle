import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import React from "react";
const Navbar = () => {
  const toggleMobile = () => {
    const mobile = document.querySelector(".mobile-menu");
    mobile?.classList.toggle("hidden");
  };
  return (
    <nav>
      <div className="flex justify-between">
        <div className="flex-shrink-0 mx-7 mt-3">
          <img src={logo} alt="logo" />
        </div>
        <div className="block md:hidden mt-3">
          <button
            className=" mr-5 flex items-center px-3 py-2 border rounded"
            onClick={toggleMobile}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full md:flex md:items-center md:w-auto md:mt-3 md: mr-10">
          <div className="text-md lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 md:inline-block md:mt-0 hover:text-white mx-5 transition"
            >
              Home
            </Link>
            <Link
              className="block mt-4 md:inline-block md:mt-0 hover:text-white mx-5 transition"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="md:hidden hidden mobile-menu mt-1 bg-primary rounded-sm">
        <ul>
          <li className="active hover:bg-primary px-5">
            <Link
              to="/"
              className="block mt-4 md:inline-block md:mt-0 hover:text-white mx-5 transition"
            >
              Home
            </Link>
          </li>
          <li className="px-5">
            <Link
              className="block mt-4 md:inline-block md:mt-0 hover:text-white mx-5 transition"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
