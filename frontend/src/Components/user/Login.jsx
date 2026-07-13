import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/slices/userSlice";

import { toast } from "react-toastify";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
          <div className="w-full max-w-md">
            <form
              onSubmit={submitHandler}
              className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                  Welcome Back 👋
                </h1>
                <p className="text-gray-500 mt-2">
                  Login to continue to your account
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end mb-6">
                <Link
                  to="/users/forgetPassword"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-300 hover:scale-[1.02] active:scale-95"
              >
                LOGIN
              </button>

              {/* Signup */}
              <div className="mt-6 text-center">
                <span className="text-gray-500">
                  Don't have an account?{" "}
                </span>

                <Link
                  to="/users/signup"
                  className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;