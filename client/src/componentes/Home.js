import React from "react";
import Hero from "./Hero";
import TopRated from "./TopRated";
import BlogSection from "./BlogSection";
import GamesSection from "./GamesSection";

const Home = () => {
  return (
    < div className="">
      <Hero />
      <h1 className="text-white text-center text-5xl mt-20">Top Rated Games</h1>
      <TopRated />
      <BlogSection/>
      <h1 className="text-white text-center text-5xl mt-20">Games To Try</h1>

      <GamesSection/>
    </div>
  );
};

export default Home;
