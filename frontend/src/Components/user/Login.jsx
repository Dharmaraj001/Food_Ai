import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/slices/userSlice";

import { toast } from "react-toastify";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

return (
  <>
    {loading ? (
      <Loader />
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 py-10">
        <div className="w-full max-w-md">
          <form
            onSubmit={submitHandler}
            className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl p-8"
          >
            {/* Heading */}

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Login to continue to FoodGenAI
              </p>
            </div>

            {/* Email */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <div className="relative">

                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white pl-12 pr-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />

              </div>
            </div>

            {/* Password */}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>

              <div className="relative">

                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white pl-12 pr-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                />

              </div>
            </div>

            {/* Forgot Password */}

            <div className="mb-6 flex justify-end">
              <Link
                to="/users/forgetPassword"
                className="text-sm font-semibold text-orange-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-300 active:scale-95"
            >
              Login
            </button>

            {/* Divider */}

            <div className="my-6 flex items-center">

              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>

              <span className="mx-4 text-sm text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>

            </div>

            {/* Signup */}

            <p className="text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}

              <Link
                to="/users/signup"
                className="font-semibold text-orange-600 hover:underline"
              >
                Create Account
              </Link>

            </p>

          </form>
        </div>
      </div>
    )}
  </>
);
};

export default Login;