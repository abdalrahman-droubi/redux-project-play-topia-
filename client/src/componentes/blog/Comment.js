import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReportList from "./ReportList";

const Comment = () => {
  const { id } = useParams();
  const [comment_details, setCommentDetails] = useState();
  const [postComment, setPostComment] = useState([]);
  const [Refresh, setRefresh] = useState(false);
  const user_id = useSelector((state) => state.userNew.data[0]?._id);
  const user_name = useSelector((state) => state.userNew.data[0]?.name);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getComment/${id}`)
      .then((res) => {
        setPostComment(res.data);
      })
      .catch((error) => {
        console.log(error, "in getcomment data Comment Page");
      });
  }, [Refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/addComment/${id}/${user_id}`, {
        comment_details,
        user_name,
      })
      .then((res) => {
        setCommentDetails(" ");
        setRefresh(!Refresh);
      })
      .catch((error) => {
        console.log(error, "mais error");
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-9/12  rounded-lg  p-2 my-4 mx-6">
        <h3 className="font-bold text-white pl-5">Discussion</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full px-3 my-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              required=""
              defaultValue={""}
              value={comment_details}
              onChange={(e) => setCommentDetails(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-end px-3">
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              add comment
            </button>
          </div>
        </form>
        {postComment.length !== 0 && (
          <div className="flex flex-col h-96 overflow-y-scroll">
            {postComment
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((ele) => {
                const date = new Date(ele.date);
                return (
                  <div className="border rounded-md bg-white p-3 ml-3 my-3 flex flex-row-reverse justify-between">
                    <ReportList oneComment={ele} setRefresh={setRefresh} Refresh={Refresh} />
                    <div>
                      <div className="flex gap-3 items-center">
                        <img
                          src={`http://localhost:5000/${ele.user_id.img}`}
                          className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                        />
                        <h3 className="font-bold">
                          {ele.user_name}{" "}
                          {date && (
                            <span>
                              {date.toLocaleDateString()}{" "}
                              {date.toLocaleTimeString()}
                            </span>
                          )}
                        </h3>
                      </div>
                      <p className="text-gray-600 mt-2">
                        {ele.comment_details}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
