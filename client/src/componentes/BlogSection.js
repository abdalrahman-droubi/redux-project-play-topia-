import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function BlogSection() {
	const [postData, setPostData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [loader, setLoader] = useState(true);
  
	useEffect(() => {
	  axios
		.get("http://localhost:5000/getMostCommentPost")
		.then((res) => {
		  setPostData(res.data);
		  setLoader(false);
		})
		.catch((error) => {
		  console.log(error, "in getpost data BolgCard");
		});
	}, [refresh]);
  
  return (
    <div>
      <section className="dark:bg-gray-800 text-gray-100">
        <div className="container max-w-7xl p-6 mx-auto space-y-6 sm:space-y-12">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900"
          >
            <img
              src="https://media.istockphoto.com/id/1405779626/photo/close-up-view-of-professional-mouse-and-high-performance-computer-for-video-games-in-game-room.jpg?s=612x612&w=0&k=20&c=cL8LqrmhwYnU_O3O-cYwE4fObNSrpwyOPRTgk4X4s08="
              alt=""
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                Noster tincidunt reprimique ad pro
              </h3>
              <span className="text-xs dark:text-gray-400">
                February 19, 2021
              </span>
              <p>
                Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est
                in graece fuisset, eos affert putent doctus id.
              </p>
            </div>
          </a>
          <div className="flex flex-wrap text-white -mx-4">
            <>
              {loader ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG path data */}
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                postData.slice(0, 3).map((ele) => {
                  const date = new Date(ele.date);
                  return (
                    <div
                      className="w-full px-4 md:w-1/2 lg:w-1/3"
                      key={ele._id}
                    >
                      <Link to={`/BlogDetails/${ele._id}`}>
                        <div className="mx-auto mb-10 max-w-[370px]">
                          <div className="mb-8 overflow-hidden rounded">
                            <img
                             src={`http://localhost:5000/${ele.image}`}
                              alt=""
                              className="w-full rounded-2xl"
                              style={{ width: "500px", height: "350px" }}
                            />
                          </div>
                          <div>
                            <span className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                              {date.toLocaleDateString()}
                              {date.toLocaleTimeString()}
                              <span className="inline-block px-16 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary">
                                {ele.user_name}
                              </span>
                            </span>
                            <h3 className="inline-block mb-4 text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                              {ele.title}
                            </h3>
                            <p className="text-base text-body-color">
                              {ele.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )}
            </>
          </div>
          <div className="flex justify-center">
			<Link to={'/Blog'}>
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-900 dark:text-gray-400"
            >
              Load more posts...
            </button>
			</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogSection;
