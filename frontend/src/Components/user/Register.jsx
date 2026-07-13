import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { clearErrors } from "../../redux/slices/userSlice";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { name, email, password, passwordConfirm, phoneNumber } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Name Validation
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    // Email Validation
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone Validation
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    // Password Validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Confirm Password
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      avatar: avatar === "" ? "/images/images.png" : avatar,
    };

    dispatch(register(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 py-10">
    <div className="w-full max-w-lg">
      <form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Join FoodGenAI today 🍽️
          </p>
        </div>

        {/* Name */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            id="name_field"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
          />
        </div>

        {/* Email */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>

          <input
            type="email"
            id="email_field"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
          />
        </div>

        {/* Password */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>

          <input
            type="password"
            id="password_field"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
          />
        </div>

        {/* Confirm Password */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>

          <input
            type="password"
            id="passwordConfirm_field"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            minLength={6}
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
          />
        </div>

        {/* Phone */}

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Phone Number
          </label>

          <input
            type="tel"
            id="phoneNumber_field"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="Enter 10-digit phone number"
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-200"
          />
        </div>

        {/* Avatar */}

        <div className="mb-8">
          <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Profile Picture
          </label>

          <div className="flex items-center gap-5">

            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-orange-500 shadow-lg"
            />

            <label className="cursor-pointer rounded-xl bg-orange-100 dark:bg-gray-800 px-5 py-3 text-sm font-semibold text-orange-600 dark:text-orange-300 transition hover:bg-orange-200">

              Choose Image

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />

            </label>

          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-300 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          Already have an account?
          <span
            onClick={() => navigate("/users/login")}
            className="ml-2 cursor-pointer font-semibold text-orange-600 hover:underline"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  </div>
);
};

export default Register;