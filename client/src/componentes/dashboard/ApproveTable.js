import Icon from '@mdi/react';
// import { mdiClockOutline } from '@mdi/js';
// import { mdiCheckCircle } from '@mdi/js';
import { mdiDelete } from "@mdi/js";
// import { mdiFileEdit } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import Pagination from "@mui/material/Pagination";

const ApproveTable = () => {
  // const [restaurants, setRestaurants] = useState([]);
  const [FilterDataRestaurants, setFilterDataRestaurants] = useState([]);
  // const [email, setEmail] = useState("");
  const [postComment, setPostComment] = useState([]);
  // const [Refresh, setRefresh] = useState(false);
  // const [persons, setPersons] = useState([]);


  //-----------------------search------------------------//
  const [searchTermRestaurants, setSearchTermRestaurants] = useState('');


  const filterDataByNameRestaurants = (searchTermRestaurants) => {
    console.log(searchTermRestaurants)

    const filteredDataRestaurants =postComment.filter(item =>

      item.NAME.toLowerCase().includes(searchTermRestaurants.toLowerCase())
    );
    setFilterDataRestaurants(filteredDataRestaurants);
    setCurrentPageRestaurants(1)
  }

  const [currentPageRestaurants, setCurrentPageRestaurants] = useState(1);

  let totalItemsRestaurants;

  let totalPagesRestaurants;

  let slicedArrayRestaurants;

  const itemsPerPage = 3;

  totalItemsRestaurants = FilterDataRestaurants.length;

  totalPagesRestaurants = Math.ceil(totalItemsRestaurants / itemsPerPage);

  const startIndexRestaurants = (currentPageRestaurants - 1) * itemsPerPage;

  const endIndexRestaurants = startIndexRestaurants + itemsPerPage;

  slicedArrayRestaurants = FilterDataRestaurants.slice(startIndexRestaurants, endIndexRestaurants);

  const handlePageChangeRestaurants = (event, pageNumber) => {
    setCurrentPageRestaurants(pageNumber);
  };


  const allComment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allComments");
      setPostComment(response.data);
      console.log(response.data)
      setFilterDataRestaurants(response.data)
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  useEffect(() => {
    allComment();
    // allAdmins()
  }, []);
  const handleDelete = ( name, commentId,postId) => {
    
    Swal.fire({
      title: ` Do you want to remove ${name} Comment?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }
    ).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {

        Swal.fire(` ${name}Comment has been removed `, '', 'success');

        axios.put(`http://localhost:5000/deletecomment/${commentId}/${postId}`)
        .then((response) => {
            console.log(response.data);
            allComment()
        })
        .catch((error) => console.log(error.message))
        // window.location.reload();
      } else
        Swal.fire(' Cancelled', '', 'error')

    })


  }

  return (

    <>

      <div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Reported Comment
          </div>

        </div>

        {/* <form>

          <div className="relative">

            <input
              type="text"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
              value={searchTermRestaurants}
              onChange={(e) => {
                setSearchTermRestaurants(e.target.value);
                filterDataByNameRestaurants(e.target.value);
              }}
            />

          </div>
        </form> */}

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
          <table role="table" className="w-full">
            {/* <thead>
              <tr role="row">
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">NAME</p>
                </th>
              

              </tr>
            </thead> */}
            

            {
          
          postComment.map((ele) => {
            return(
            ele.map((e)=>{

                return (

                  <tbody role="rowgroup">

<div className="flex flex-col ">
              <div className="border border-gray-300 rounded-md bg-white p-3 ml-3 my-3">
                {/* <h2 className='pb-5'><span className='text-lg font-bold'>{e.user_name}</span> report on this comment :</h2> */}
                <div className='border-2 p-5 rounded-md border-red-500'>
                <div className="flex gap-3 items-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                  />
                  <h3 className="font-bold">{e.user_name}</h3>
                </div>
                <p className="text-gray-600 mt-2">{e.comment_details}</p>
                </div>
                <div className='p-5 text-red-600'>
                  Report Details : 
            {e.reports.map((report) => (
              <h3 className='text-black ml-5 pt-5' key={report._id}>{report.reportDetails}</h3>
            ))}
          </div>
                <div className="  sm:text-[14px] flex justify-end">  
                      <button
                        onClick={() => handleDelete(e.user_name,e._id,ele._id)}
                      >
                        <Icon color="red" path={mdiDelete} size={1} />
                      </button>
        </div>
              </div>
        
          
        </div>


                  </tbody>




                )


              })
          )
              }
              )

            }



          </table>

          <div className='flex w-full justify-center mt-5'>
            {(
              <Pagination
                count={totalPagesRestaurants}
                page={currentPageRestaurants}
                onChange={handlePageChangeRestaurants}
              />
            )}
          </div>
        </div>


      </div>




    </>
  )
}

export default ApproveTable