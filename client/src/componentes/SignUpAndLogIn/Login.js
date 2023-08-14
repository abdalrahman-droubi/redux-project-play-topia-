import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, usersLogin } from '../../actions/AllUsersActions';


export default function LogIn() {
    const [email, setemail] = useState("");
    const [emailp, setemailp] = useState("");
    const [password, setpassword] = useState("");
    const [passwordp, setpasswordp] = useState("");

    const [user0, setUser0] = useState([]);
    const [errorG, setErrorG] = useState("");
  



    /* google login  -start */
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    


  
    const [userData, setUserData] = useState({email: '' ,password:""});

    const dispatch = useDispatch();
    // const { loading, data, error } = useSelector((state) => state.user);

    // console.log(data)
    //   useEffect(() => {
    //     dispatch(fetchUser());
    //   }, [dispatch]);

    const handleSubmit = async (event) => {
       
       event.preventDefault();

       try {
        const response =   await dispatch(usersLogin(userData));  
        console.log(response.payload.user0);  
        if(response.payload.error != 'incorrect password'){
        localStorage.setItem("auth",(response.payload.token))    
        window.location.href = 'http://localhost:3000/';
      }
        dispatch(fetchUser());
        setUserData({email: '' ,password:""});
      } catch (error) {
        console.error('Failed to add Pokemon:', error);
      }
    }
  return (

   <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">
            <div>
                <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6430/6430660_sd.jpg;maxHeight=640;maxWidth=550"
                    className="w-32 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign-In
                </h1>
                <div className="w-full flex-1 mt-8">
                    <div className="flex flex-col items-center ">


       
                        
                    </div>

                    <div className="my-12 border-b text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign-In with e-mail
                        </div>
                    </div>
                      <form onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs">
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email" placeholder="Email"
                            required
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            
                            />

                            <p className="text-red-500">{emailp}</p>
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password" placeholder="Password" 
                            value={userData.password}
                            required
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}

                            />
                            <p className="text-red-500">{passwordp}</p>
                        <button type='submit'
                            className="mt-5 bg-[#a249c9] tracking-wide font-semibold text-gray-800 w-full py-4 rounded-lg hover:bg-[#4d64d8] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">
                                Sign-In
                            </span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            No Account?
                            <Link to="/SignUp" className="border-b border-gray-500 border-dotted">
                                Create one
                            </Link>
                           
                        </p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex imageSign bg-cover bg-center bg-no-repeat ">
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/5904f729875233.5608b9a200122.png"/>
        </div>
    </div>
</div>
  
  )
}