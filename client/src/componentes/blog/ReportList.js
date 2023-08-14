import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ReportList({ oneComment, setRefresh, Refresh }) {
  const user_id = useSelector((state) => state.userNew.data[0]?._id);
  const { id } = useParams();
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "do you want to delete your comment?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
        axios
          .put(`http://localhost:5000/deleteComment/${id}/${oneComment._id}`)
          .then((res) => {
            console.log(res);
            setRefresh(!Refresh);
          })
          .catch((error) => {
            console.log(error, "in deletcomment data reportList page");
          });
      }
    });
  };

  const handleAddReport = (reportDetails) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Are you sure you want to send this report ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Your report has been sent to the admin, we will check it ASAP",
            "success"
          );
          axios
            .put(`http://localhost:5000/addReport/${oneComment._id}`, {
              user_id,
              reportDetails,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error, "in add Post data reportList page");
            });
        }
      });
  };

  return (
    <>
      {/* component */}
      <div className="group inline-block">
        <button className="bg-white rounded-sm mx-10">
          <span className="pr-1 flex-1 text-2xl font-bold">...</span>
        </button>
        <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32">
          {oneComment.user_id._id === user_id && (
            <>
              {/* <li className="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer">
                Edit
              </li> */}
              <li
                className="rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDelete()}
              >
                Delete
              </li>
            </>
          )}

          <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
            <button className="w-full text-left flex items-center outline-none focus:outline-none">
              <span className="pr-1 flex-1">Report</span>
              <span className="mr-auto">
                <svg
                  className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </button>
            <ul className="bg-white border rounded-sm absolute top-6 right-full mt-2 ml-2 transition duration-150 ease-in-out origin-top-left w-64">
              <li
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddReport("Harmful content")}
              >
                Harmful content
              </li>
              <li
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleAddReport("Contrary to the content of the post.")
                }
              >
                Contrary to the content of the post.
              </li>
              <li
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddReport("Unwanted advertisements.")}
              >
                Unwanted advertisements.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  /* since nested groupes are not supported we have to use \n     regular css for the nested dropdowns \n  */\n  li>ul                 { transform: translatex(100%) scale(0) }\n  li:hover>ul           { transform: translatex(101%) scale(1) }\n  li > button svg       { transform: rotate(-90deg) }\n  li:hover > button svg { transform: rotate(-270deg) }\n\n  /* Below styles fake what can be achieved with the tailwind config\n     you need to add the group-hover variant to scale and define your custom\n     min width style.\n  \t See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html\n  \t for implementation with config file\n  */\n  .group:hover .group-hover\\:scale-100 { transform: scale(1) }\n  .group:hover .group-hover\\:-rotate-180 { transform: rotate(180deg) }\n  .scale-0 { transform: scale(0) }\n  .min-w-32 { min-width: 8rem }\n",
        }}
      />
    </>
  );
}

export default ReportList;
