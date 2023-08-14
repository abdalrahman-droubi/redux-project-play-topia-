import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import TotalRating from "./TotalRating";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updategames } from "../actions/ApiActions";
import { fetchgamesS } from "../actions/ApiActions";

// updategames
const Rating = ({ cardId, card, UserIdA, rating }) => {
  const dispatch = useDispatch();

  const starCount = 5; // Total number of stars
  const [filledStars, setFilledStars] = useState(0);
  const [RatingStatus, setRatingStatus] = useState(false);

  useEffect(() => {
    if (card?.UsersIdRate?.includes(UserIdA)) {
      setRatingStatus(true);
    }
  }, [filledStars, card]);

  // console.log(RatingStatus)

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };

  const handleStarClick = async (starIndex) => {
    setFilledStars(starIndex + 1);

    let ids = [...(card?.UsersIdRate || [])];
    let newrate = [...(card?.rate || [])];

    ids.push(UserIdA);
    newrate.push(starIndex + 1);

    const sum = newrate?.reduce(
      (acc, curr) => parseInt(acc) + parseInt(curr),
      0
    );
    const avg = newrate.length === 0 ? 1 : newrate?.length;
   const topRated = newrate.length *(sum / avg)
    try {
      const updatedCard = {
        UsersIdRate: ids,
        rate: newrate,
        rating: sum / avg,
        cardId: cardId,
        topRated:topRated
      };
      const response = await dispatch(updategames(updatedCard));
      dispatch(fetchgamesS());
      showSuccessAlert("Thank you for rate ");

      // console.log(response.payload);
    } catch (error) {
      console.error("Failed to add Pokemon:", error);
    }
  };

  return (
    <>
      {
        RatingStatus === false ? (
          <div className="flex items-center">
            {Array(starCount)
              .fill()
              .map((_, index) => (
                <svg
                  key={index}
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    index < filledStars
                      ? "text-yellow-400"
                      : "text-gray-300 dark:text-gray-500"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleStarClick(index)}
                >
                  <title>
                    {index + 1 <= filledStars ? "Filled star" : "Empty star"}
                  </title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
          </div>
        ) : (
          <TotalRating rating={rating} />
        )

        // <p className="text-white">thanks for rating</p>
      }
    </>
  );
};

export default Rating;
