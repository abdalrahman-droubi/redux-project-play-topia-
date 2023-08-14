import React from "react";
import Team from "./Team";

export default function About() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="https://img.freepik.com/free-vector/video-game-controls-frame-neon-style-brick-wall_24908-58914.jpg?size=626&ext=jpg&ga=GA1.1.558610342.1683500202&semt=ais"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-end">
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="bg-white bg-opacity-30 rounded-3xl lg:py-36 py-60 md:px-20  px-10 sm:px-4 flex flex-col items-center justify-center relative z-50">
            <h1 className="text-4xl font-semibold leading-9 text-white text-center">
              About Us{" "}
            </h1>
            <p className="text-base leading-normal text-center text-white border-l-2 text-lg mt-6">
              <span className="text-2xl font-bold">Welcome</span> to our game website! We're thrilled to have you here and
              introduce you to the exciting world of gaming. Whether you're a
              hardcore gamer or new to the gaming scene, we've got something for
              everyone. Our mission is to provide you with a comprehensive
              platform where you can explore, learn, and connect with fellow
              gaming enthusiasts. At our game website, we strive to be your
              ultimate gaming companion, offering a diverse range of content and
              services to enhance your gaming experience
            </p>
            <br />
            <Team/>

          </div>

        </div>

      </div>
    </div>
  );
}
