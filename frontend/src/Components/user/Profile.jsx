import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">

              {/* Avatar */}
              <div className="flex flex-col items-center">
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                />

                <h1 className="mt-5 text-3xl font-bold text-gray-800 dark:text-white">
                  {user.name}
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Welcome back 👋
                </p>
              </div>

              {/* User Details */}
              <div className="mt-10 space-y-6">

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Full Name
                  </h3>

                  <p className="mt-1 text-lg font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Email Address
                  </h3>

                  <p className="mt-1 text-lg font-medium text-gray-800 dark:text-white break-all">
                    {user.email}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Member Since
                  </h3>

                  <p className="mt-1 text-lg font-medium text-gray-800 dark:text-white">
                    {String(user.createdAt).substring(0, 10)}
                  </p>
                </div>
              </div>

              {/* Button */}
              <Link
                to="/users/me/update"
                className="mt-10 block w-full text-center rounded-xl bg-orange-500 py-3 text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-300 hover:scale-[1.02] active:scale-95"
              >
                Edit Profile
              </Link>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;