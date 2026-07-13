import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant } from "../redux/actions/restaurantAction";
import {
  FaStar,
  FaMapMarkerAlt,
  FaLeaf,
  FaRobot,
  FaTrash,
} from "react-icons/fa";

const Restaurant = ({ restaurant }) => {
  const dispatch = useDispatch();
  const [showAI, setShowAI] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state) => state.user || {}
  );

  const handleDelete = () => {
    if (!window.confirm("Delete this restaurant?")) return;

    dispatch(deleteRestaurant(restaurant._id)).catch(() => {
      alert("Unable to delete");
    });
  };

  return (
  <div className="group overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

    {/* Image */}
    <Link to={`/eats/stores/${restaurant._id}/menus`}>
      <div className="relative overflow-hidden">

        <img
          src={restaurant.images?.[0]?.url}
          alt={restaurant.name}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Rating */}
        <div className="absolute top-4 right-4 rounded-xl bg-white/90 backdrop-blur-md px-3 py-1 shadow-lg">
          <span className="text-sm font-bold text-green-600">
            ⭐ {restaurant.ratings.toFixed(1)}
          </span>
        </div>

        {/* Veg Badge */}
        {restaurant.isVeg && (
          <div className="absolute top-4 left-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow">
            🥗 Pure Veg
          </div>
        )}

      </div>
    </Link>

    {/* Content */}
    <div className="p-5">

      <h2 className="truncate text-xl font-bold text-gray-900 dark:text-white">
        {restaurant.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
        📍 {restaurant.address}
      </p>

      <div className="mt-4 flex items-center justify-between">

        <span className="rounded-full bg-orange-100 dark:bg-orange-900 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-200">
          {restaurant.numOfReviews} Reviews
        </span>

        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          ⭐ {restaurant.ratings.toFixed(1)}
        </span>

      </div>

      {/* AI Button */}

      {restaurant.reviewSentiment && (
        <button
          onClick={() => setShowAI(!showAI)}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        >
          {showAI ? "Hide AI Summary" : "🤖 AI Review Summary"}
        </button>
      )}

      {/* AI Summary */}

      {showAI && (
        <div className="mt-5 rounded-2xl border border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-gray-800 p-4">

          <div className="mb-4">

            <span className="rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-white">
              😊 {restaurant.reviewSentiment}
            </span>

          </div>

          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">

            {(restaurant.reviewSummaryBullets || []).map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-2"
              >
                <span className="text-orange-500 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}

          </ul>

          <div className="mt-4 flex flex-wrap gap-2">

            {(restaurant.reviewTopMentions || []).map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-orange-200 dark:bg-orange-900 px-3 py-1 text-xs font-semibold text-orange-800 dark:text-orange-200"
              >
                #{item}
              </span>
            ))}

          </div>

        </div>
      )}

      {/* Delete */}

      {isAuthenticated &&
        user &&
        user.role === "admin" && (
          <button
            onClick={handleDelete}
            className="mt-5 w-full rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 hover:shadow-lg"
          >
            Delete Restaurant
          </button>
        )}

    </div>

  </div>
);
};

export default Restaurant;