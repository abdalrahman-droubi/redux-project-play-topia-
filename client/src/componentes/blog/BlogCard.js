import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const BlogCard = () => {
  const [postData, setPostData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);
  const user_id = useSelector((state) => state.userNew.data[0]?._id);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getPost")
      .then((res) => {
        setPostData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error, "in getpost data BolgCard");
      });
  }, [refresh]);

  const handleDelete = (id) => {
    axios
      .put(`http://localhost:5000/deletePost/${id}`)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error, "in deletpost data BolgCard");
      });
  };
  return (
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
        postData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((ele) => {
          const date = new Date(ele.date);
          return (
            <div className="w-full  px-4 md:w-1/2 lg:w-1/3" key={ele._id}>
              <Link to={`/BlogDetails/${ele._id}`}>
                <div className="mx-auto border-3 rounded-2xl border-white  bg-white mb-10 max-w-[370px]">
                  <div className="mb-2 overflow-hidden rounded">
                    <img
                      src={`http://localhost:5000/${ele.image}`}
                      alt=""
                      className="w-full rounded-t-lg"
                      style={{ width: "400px", height: "300px" }}
                    />
                  </div>
                  <span class="text-sm text-black flex justify-end  font-semibold  mr-2">{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
                  <span className=" flex    text-lg font-semibold leading-loose justify-start ml-5 text-red-500 ">
                        {ele.user_name}'s Post
                      </span>
                  <span className="inline-block px-4 mb-5 text-xs font-semibold leading-loose text-center text-black  ">
                  
                      
                    
                    </span>
                  <div>
                  <h2 class="mb-2 ml-5 mr-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">  {ele.title}</a></h2>
              <p class="pb-5 ml-5 mr-5  font-light text-gray-500 dark:text-gray-400">  {ele.description}</p>
                  
              {ele.user_id === user_id && (
                <button
                  onClick={() => handleDelete(ele._id)}
                  type="button"
                  className="text-white flex justify-end ml-40
                  mb-10 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Delete
                </button>
              )}
              <br></br>
                  </div>
                </div>
              </Link>
            
            </div>
          );
        })
      )}
    </>
  );
};

export default BlogCard;
