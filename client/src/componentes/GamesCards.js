import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGames } from "../actions/ApiActions";
import { fetchgamesS } from "../actions/ApiActions";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import Rating from "./Rating";
import TotalRating from "./TotalRating";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiHeart } from "@mdi/js";
import { fetchUserNew } from '../actions/UserActions';
import Swal from "sweetalert2";

const GamesCards = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [userData ,setUserData]= useState(null)

  const getUserInfo = async ()=>{
    try {
        const token = localStorage.getItem("auth");
        const response = await dispatch(fetchUserNew(token)); 
        setUserData(response.payload[0])
        setUserId(response.payload[0]._id)       
      } catch (error) {
        console.error('Failed to add Pokemon:', error);
      }
}
      useEffect(() => {
        getUserInfo()
      }, []);

  const [apiData, setApiData] = useState(null);
  const [filterdApiData, setFilterdApiData] = useState(null);

  const {
    loading: gamesLoading,
    data: gamesData,
    error: gamesError,
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchgamesS());
  }, [dispatch]);

  useEffect(() => {
    setApiData(gamesData);
    setFilterdApiData(gamesData);
  }, [gamesData]);

  //   const handleAdd = async () => {
  //     apiData.map( async(e,index)=>{
  //       console.log(e)
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/games",
  //         apiData[index]
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  // })
  // };
  const handleFAv = async (card) => {
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
      dispatch(fetchgamesS());
    } catch (error) {}
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {});
  };



  const [yourSelectedStateValueType, setOptionType] = useState("");
  //-----------------------search------------------------//
  const [searchTermUsers, setSearchTermUsers] = useState("");


  const handleFilterChange = (typeValue) => {
    let sortedDataUsers = [];
  console.log(apiData)
    if (typeValue === "H") {
      sortedDataUsers = [...apiData].sort((a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      });
    } else if (typeValue === "L") {
      sortedDataUsers = [...apiData].sort((a, b) => {
        return parseFloat(a.rating) - parseFloat(b.rating);
      });
    }else{
      sortedDataUsers= apiData
    }
  
    setFilterdApiData(sortedDataUsers);
  };


const filterDataByNameGames = (searchTermGames) => {
  const filteredDataGames = apiData.filter((item) =>
    item.title.toLowerCase().includes(searchTermGames.toLowerCase())
  );
  setFilterdApiData(filteredDataGames);
  // setCurrentPageMeals(1);
};



  return (
    <>
      {/* <Button
        className="p-1 h-10 border border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
        variant="text"
        onClick={handleAdd}
      ></Button> */}

<form>
  <div className="flex m-6">
               <select
                className="px-4 py-3 w-48 md:w-60 rounded-md bg-gray-100 border-[#E8AA42] border-2 focus:border-yellow-600 focus:bg-white focus:ring-0 text-sm appearance mr-5"
                value={yourSelectedStateValueType}
                onChange={(e) => {
                  setOptionType(e.target.value);
                  handleFilterChange(e.target.value);
                }}
              >
                <option value=""> All Games</option>
                <option value="H">H-rated</option>
                <option value="L">L-rated</option>
              </select>
    

    <div className="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Search Mockups, Logos, Design Templates..."
        required=""
        value={searchTermUsers}
        onChange={(e) => {
          setSearchTermUsers(e.target.value);
          filterDataByNameGames(e.target.value);
        }}
      />
    </div>
  </div>
</form>







      <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-center p-5">
        {filterdApiData?.map((e) => {
          return (
            <div
              key={e._id}
              className="relative w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              {e.UsersIdFavorite.indexOf(userId) === -1 ? (
                <Icon
                  onClick={() => handleFAv(e)}
                  className="absolute right-2 top-2 hover:scale-110 "
                  title="click to add"
                  color="red"
                  path={mdiHeartOutline}
                  size={1.5}
                />
              ) : (
                <Icon
                  onClick={() => handleFAv(e)}
                  className="absolute right-2 top-2  hover:scale-110"
                  title="click to remove"
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
      </div>
    </>
  );
};

export default GamesCards;
