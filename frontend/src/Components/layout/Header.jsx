import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import {
  FiShoppingCart,
  FiUser,
  FiPackage,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

import { toast } from "react-toastify"; // 

import Search from "./Search";
import "../../App.css";


const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Updated slice
  const { user, loading } = useSelector((state) => state.user);
  const {cartItems} = useSelector((state => state.cart))


  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully"); 
  };

 return (
  <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex h-20 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.webp"
            alt="logo"
            className="h-14 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Search */}
        <div className="hidden lg:flex flex-1 justify-center px-10">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route
              path="/eats/stores/search/:keyword"
              element={<Search />}
            />
          </Routes>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 dark:text-gray-200 hover:text-orange-500 transition"
          >
            <span className="font-semibold text-lg">
              Cart
            </span>

            <span className="absolute -top-2 -right-4 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="h-11 w-11 rounded-full border-2 border-orange-500 object-cover"
                />

                <span className="hidden md:block font-semibold text-gray-700 dark:text-white">
                  {user.name}
                </span>

                <svg
                  className={`w-4 h-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">

                  <Link
                    to="/eats/orders/me/myOrders"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 hover:bg-orange-50 dark:hover:bg-gray-700"
                  >
                    📦 Orders
                  </Link>

                  <Link
                    to="/users/me"
                    onClick={() => setOpen(false)}
                    className="block px-5 py-3 hover:bg-orange-50 dark:hover:bg-gray-700"
                  >
                    👤 Profile
                  </Link>

                  <button
                    onClick={() => {
                      logoutHandler();
                      setOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            !loading && (
              <Link
                to="/users/login"
                className="rounded-xl bg-orange-500 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg"
              >
                Login
              </Link>
            )
          )}

        </div>

      </div>

      {/* Mobile Search */}
      <div className="pb-4 lg:hidden">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route
            path="/eats/stores/search/:keyword"
            element={<Search />}
          />
        </Routes>
      </div>

    </div>
  </header>
);
};

export default Header;