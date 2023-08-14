import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const BlogDetails = () => {
  const [onePostData, setOnePostData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getOnePost/${id}`)
      .then((res) => {
        setOnePostData(res.data);
      })
      .catch((error) => {
        console.log(error, "in getOnepost data BolgDetails");
      });
  }, []);
  return (
    <>
      <div>
        <section>
          {/* Jumbotron */}
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat"
            style={{
              backgroundPosition: "50%",
              backgroundImage:
                'url("https://img.freepik.com/free-vector/log-bridge-mountains-edges-cliff_107791-6280.jpg?w=1380&t=st=1688552528~exp=1688553128~hmac=3db332515909880b5436f8513efac42550a57adbf83cf8fd9a46a00016a1f752")',
              height: 600,
            }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.25)] bg-fixed">
              <div className="flex h-full items-center justify-center">
                <div className="px-6 text-center text-white md:px-12">
                  <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl heroblog">
                    The best offer on the market <br />
                    <span>for your business</span>
                  </h1>

                  <button
                    type="button"
                    className="text-white  bg-gradient-to-br   from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Jumbotron */}
        </section>
      </div>

      <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
        <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
          <a className="max-w-3xl mx-auto text-xl text-white sm:text-4xl font-semibold hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
            {onePostData.title}
          </a>
          <a className="h-1/2">
            <img
              className="w-full h-[500px] my-4"
              src={`http://localhost:5000/${onePostData.image}`}
              alt="Sunset in the mountains"
            />
          </a>
          <p className="text-white text-base leading-8 max-w-4xl mx-auto">
            {onePostData.description}
          </p>

          <hr />
        </div>
      </div>

      {/* ////////////////////////comment */}
      <Comment />
    </>
  );
};

export default BlogDetails;
