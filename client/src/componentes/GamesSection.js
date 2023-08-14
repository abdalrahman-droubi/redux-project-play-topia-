import { Link } from "react-router-dom";
import React from "react";
import { fetchgamesS } from "../actions/ApiActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function GamesSection() {
  const [slicedArray, setSlicedArray] = useState([]);
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
    setApiData(gamesData);
    if (gamesData) {
      const copiedArray = [...gamesData]; // Create a copy of the array
      const shuffledArray = copiedArray.sort(() => 0.5 - Math.random());
      const slicedArray = shuffledArray.slice(0, 5);
      setSlicedArray(slicedArray);
    }
  }, [gamesData]);

  console.log(slicedArray);

  let randomNumber = Math.floor(Math.random() * 5);
  console.log(randomNumber);

  return (
    <>
      {/* component */}
      <section className="flex justify-center mt-10 gap-10 flex-wrap p-20">
        {slicedArray?.map((game) => {
          return (
            <a target="_blank" href={game.game_url}>
              <div
                key={game._id}
                className="hover:scale-110 h-44 w-32 bg-gray-100 rounded-xl flex flex-col justify-center items-center shadow shadow-md shadow-fuchsia-400 duration-300 border border-fuchsia-500  "
              >
                <img className="hover:scale-125 rounded-full w-20 h-20" src={game.thumbnail} />

                <span className="mt-6 text-sm ?leading-5 font-semibold text-center">
                  {game.title}
                </span>
              </div>
            </a>
          );
        })}
      </section>
      <div className="flex justify-center">
        <Link to="/games">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 text-white"
          >
            Check all the Games...
          </button>
        </Link>
      </div>
    </>
  );
}

export default GamesSection;
