import React, { useEffect, useState } from "react";
import {
  sortByRatings,
  sortByReviews,
  toggleVegOnly,
} from "../redux/slices/restaurantSlice";

import {
  createRestaurant,
  getRestaurants,
} from "../redux/actions/restaurantAction";
import Restaurant from "./Restaurant";
import Loader from "./layout/Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import CountRestaurant from "./CountRestaurant";
import { useParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly,
    creating,
    createError,
  } = useSelector((state) => state.restaurants);

  const {
    loading: authLoading,
    isAuthenticated,
    user,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (restaurantsError) {
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  // admin controls
  const [showCreate, setShowCreate] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    isVeg: false,
    location: { type: "Point", coordinates: [] },
    imageUrl: "",
  });
  const [coordsInput, setCoordsInput] = React.useState("");

  const handleOpenCreate = () => {
    setCoordsInput(newRestaurant.location.coordinates.join(","));
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
    setCoordsInput("");
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "isVeg") {
      setNewRestaurant({ ...newRestaurant, isVeg: checked });
    } else if (name === "coordinates") {
      setCoordsInput(value);

      const parts = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "");

      const coords = parts.map((v) => parseFloat(v)).filter((n) => !isNaN(n));

      setNewRestaurant({
        ...newRestaurant,
        location: { ...newRestaurant.location, coordinates: coords },
      });
    } else if (name === "imageUrl") {
      setNewRestaurant({ ...newRestaurant, imageUrl: value });
    } else {
      setNewRestaurant({ ...newRestaurant, [name]: value });
    }
  };

  const submitCreate = async (e) => {
    e.preventDefault();

    const payload = {
      name: newRestaurant.name,
      address: newRestaurant.address,
      isVeg: newRestaurant.isVeg,
      location: newRestaurant.location,
      images: [
        {
          public_id: "default",
          url: newRestaurant.imageUrl,
        },
      ],
    };

    const result = await dispatch(createRestaurant(payload));

    // ✅ close only if success
    if (createRestaurant.fulfilled.match(result)) {
      handleCloseCreate();
      setCoordsInput("");
    }
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
  <>
    <CountRestaurant />

    {restaurantsLoading ? (
      <Loader />
    ) : restaurantsError ? (
      <Message variant="danger">{restaurantsError}</Message>
    ) : (
      <section className="max-w-7xl mx-auto px-4 py-8">

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">

          <button
            onClick={handleToggleVegOnly}
            className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 shadow-md ${
              showVegOnly
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-900 dark:text-white border border-gray-300 hover:bg-green-50"
            }`}
          >
            🥗 {showVegOnly ? "Show All" : "Pure Veg"}
          </button>

          <button
            onClick={handleSortByReviews}
            className="rounded-full bg-white dark:bg-gray-900 dark:text-white border border-gray-300 px-6 py-3 font-semibold shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
          >
            💬 Sort by Reviews
          </button>

          <button
            onClick={handleSortByRatings}
            className="rounded-full bg-orange-500 text-white px-6 py-3 font-semibold shadow-md transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-1"
          >
            ⭐ Sort by Ratings
          </button>

        </div>

        {/* Restaurant Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) =>
              !showVegOnly || restaurant.isVeg ? (
                <Restaurant
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ) : null
            )
          ) : (
            <div className="col-span-full">
              <Message variant="info">
                No Restaurants Found
              </Message>
            </div>
          )}

          {/* Add Restaurant */}

          {isAuthenticated &&
            user &&
            user.role === "admin" && (
              <div
                onClick={handleOpenCreate}
                className="cursor-pointer rounded-3xl border-2 border-dashed border-orange-400 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-center items-center p-10 min-h-[320px]"
              >

                <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center text-5xl">
                  +
                </div>

                <h3 className="mt-6 text-2xl font-bold dark:text-white">
                  Add Restaurant
                </h3>

                <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                  Create a new restaurant for customers.
                </p>

              </div>
            )}

        </div>

        {/* Modal */}

        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-gray-900 p-8 shadow-2xl">

              <h2 className="mb-8 text-3xl font-bold text-center dark:text-white">
                🍽 Create Restaurant
              </h2>

              {createError && (
                <Message variant="danger">
                  {createError}
                </Message>
              )}

              <form
                onSubmit={submitCreate}
                className="space-y-5"
              >

                <div>
                  <label className="mb-2 block font-semibold dark:text-white">
                    Restaurant Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={newRestaurant.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold dark:text-white">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={newRestaurant.address}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold dark:text-white">
                    Coordinates
                  </label>

                  <input
                    type="text"
                    name="coordinates"
                    value={coordsInput}
                    onChange={handleChange}
                    placeholder="40.77,-73.97"
                    required
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold dark:text-white">
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="imageUrl"
                    value={newRestaurant.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                  />
                </div>

                <label className="flex items-center gap-3 font-semibold dark:text-white">
                  <input
                    type="checkbox"
                    name="isVeg"
                    checked={newRestaurant.isVeg}
                    onChange={handleChange}
                    className="h-5 w-5 accent-green-600"
                  />

                  Pure Veg Restaurant
                </label>

                <div className="flex gap-4 pt-4">

                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
                  >
                    {creating ? "Creating..." : "Create"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseCreate}
                    className="flex-1 rounded-xl border border-gray-300 bg-gray-100 py-3 font-semibold transition hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}
      </section>
    )}
  </>
);
};

export default Home;
