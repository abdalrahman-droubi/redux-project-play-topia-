import React, { useState } from "react";

import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import BlogCard from "./BlogCard";

const Blog = () => {

  return (
    <>
      <section>
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
      {/* Section: Design Block */}
      <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="block mb-2 text-white text-lg font-semibold text-primary">
                  Our Blogs
                </span>
                <h2 className="mb-4 text-3xl font-bold text-white text-dark sm:text-4xl md:text-[40px]">
                  Our Recent News
                </h2>
                <p className="text-base text-white text-body-color">
                  There are many variations of passages of Lorem Ipsum
                  available but the majority have suffered alteration in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div 
          style={{height:"600px"}}
          className="flex flex-wrap text-white mx-6 p-3 overflow-y-scroll border-2 border-white">
            <BlogCard/>
          </div>
        </div>
      </section>
      <>
        {/* add post  form */}
      
      </>

      {/* //////////////////////////////// */}
      <div className="container mx-auto flex justify-center items-center  ">
        <div className=" py-16 w-9/12">
          <div className=" relative flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/old-stone-well-with-drinking-water-hill-summer-night-landscape-with-full-moon-light-vintage-rural-well-with-wooden-roof-pulley-bucket-rope-farm-village-cartoon-illustration_107791-5967.jpg?w=1380&t=st=1688556678~exp=1688557278~hmac=3b2870f1558f1a37c0b561e87f1c9859b8be9c651f8cea3bdcf9e80113275978"
              alt="dining"
              className="w-full h-full absolute z-1   xl:block rounded-3xl"
            />
            <div className="bg-fuchsia-300 bg-opacity-30 rounded-3xl lg:py-36 py-60 md:px-20  px-10 sm:px-4 flex flex-col items-center justify-center relative z-1">
              <h1 className="text-4xl font-semibold leading-9 text-white text-center">
                CONNECT WITH US FOR GAMING UPDATE.{" "}
              </h1>
              <p className="text-base leading-normal text-center text-white border-l-2 mt-6">
                Online gaming websites offer a vast selection of games,
                catering to various genres and preferences. Players can
                connect and compete with gamers from around the world,
                fostering a vibrant and diverse gaming community. These
                websites provide continuous updates and expansions, ensuring a
                dynamic and engaging gaming experience.
              </p>
              <br />
              <Link to="/Contact">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Connect Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PostForm />
    </>
  );
};

export default Blog;
