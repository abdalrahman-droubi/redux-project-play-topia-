import React from "react";
import { fetchgamesS } from "../actions/ApiActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { fetchUserNew } from '../actions/UserActions';
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart, mdiConsoleLine } from "@mdi/js";
import Rating from "./Rating";
import TotalRating from "./TotalRating";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";

const TopRated = () => {

  const [userId, setUserId] = useState(null);
  const getUserInfo = async ()=>{
    try {
        const token = localStorage.getItem("auth");
        const response = await dispatch(fetchUserNew(token)); 
        setUserId(response.payload[0]._id)       
      } catch (error) {
        console.error('Failed to add Pokemon:', error);
      }
}
      useEffect(() => {
        getUserInfo()
      }, []);
console.log(userId)


  const [apiData, setApiData] = useState(null);
  const dispatch = useDispatch();

  const {
    loading: gamesLoading,
    data: gamesData,
    error: gamesError,
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchgamesS());
  }, [dispatch]);

  useEffect(() => {
    let games = Array.isArray(gamesData) ? [...gamesData] : [];
    games.sort(customSort);
    const firstThreeGames = games.slice(0, 3); // Retrieve the first three objects using slice
    setApiData(firstThreeGames);
    // Use the firstThreeGames array as needed
  }, [gamesData]);

console.log(apiData)
// Custom sorting function
const customSort = (a, b) => {
  // Sort by descending order of "toprated"
  if (a.topRated > b.topRated) {
    return -1;
  } else if (a.topRated < b.topRated) {
    return 1;
  }
  
  // If "toprated" values are equal, maintain the original order
  return 0;
};


const handleFAv = async (card) => {
  console.log(card)
  let UsersIdFavorite = [...(card.UsersIdFavorite || [])];

  const indexToRemove = UsersIdFavorite.indexOf(userId);
  if (indexToRemove !== -1) {
    UsersIdFavorite.splice(indexToRemove, 1);
    showSuccessAlert("removed from favorites")

  } else {
    UsersIdFavorite.push(userId);
    showSuccessAlert("added to favorites")

  }

  try {
    const response = await axios.put(
      `http://localhost:5000/api/updateGameFav/${card._id}`,
      { UsersIdFavorite }
    );
    console.log(response.data);
    dispatch(fetchgamesS());
  } catch (error) {
  console.log(error);
  }
};

const showSuccessAlert = (message) => {
  Swal.fire({
    title: message,
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {});
};
return (
    <>
      <section className=" grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 place-items-center p-5 w-full ">
   {apiData?.map((e) => {
          return (
            <div
              key={e._id}
              className="relative w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {e.UsersIdFavorite.indexOf(userId) === -1 ? (
                <Icon
                  onClick={() => handleFAv(e)}
                  className="absolute right-2 top-2 "
                  color="red"
                  path={mdiHeartOutline}
                  size={1.5}
                />
              ) : (
                <Icon
                  onClick={() => handleFAv(e)}
                  className="absolute right-2 top-2 "
                  color="red"
                  path={mdiHeart}
                  size={1.5}
                />
              )}

              <a href="#">
                <img
                  className=" rounded-t-lg w-full"
                  src={e.thumbnail}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-32">
                    {e.short_description}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  {/* <TotalRating rating={e.rating} />
                <Rating cardId={e._id} UserIdA={userId} card={e} rating={e.rating} /> */}

                  {e?.UsersIdRate?.includes(userId) ? (
                    <TotalRating rating={e.rating} />
                  ) : (
                    <Rating
                      cardId={e._id}
                      UserIdA={userId}
                      card={e}
                      rating={e.rating}
                    />
                  )}

                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  {Math.floor(e.rating)}

                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className=" font-bold text-gray-900 dark:text-white">
                    {e.title}
                  </span>

                  <Button
                    className="p-1 h-10 border border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
                    variant="text"
                  >
                    <a target="_blank" href={e.game_url}>
                      play game
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      
      </section>
    </>
  );
};

export default TopRated;

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="overflow-hidden bg-[#10143d] text-white rounded-lg border border-1rem border-fuchsia-600">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="text-base leading-relaxed mb-7 text-body-color">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
              {Button}
            </a>
          )}
          
        </div>
      </div>
      {/*  */}
    </>
  );
};
