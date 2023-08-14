const Post = require("../../models/blog");

const addComment = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { comment_details, user_name } = req.body;
    const allPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            user_id: userId,
            comment_details,
            user_name,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(allPost);
    console.log(allPost);
  } catch (error) {
    res.status(500, error.message);
  }
};

const getComment = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate('comments.user_id');


    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const comments = post.comments.filter((comment) => !comment.delete);

    res.status(200).json(comments);

    res.status(200).json(comments);
    console.log(allPost);
  } catch (error) {
    res.status(500, error.message);
  }
};

const deleteComment = async (req, res) => {
  const { commentid, postid } = req.params;
  console.log(postid, commentid);
  try {
    const oneComment = await Post.updateOne(
      { _id: postid, "comments._id": commentid },
      { $set: { "comments.$.delete": true } }
    );

    // console.log(oneComment);
    res.status(200).json(oneComment);
  } catch (error) {
    res.status(500, error.message);
  }
};

const addReport = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { user_id, reportDetails } = req.body;
    const newReport = {
      user_id: user_id,
      reportDetails: reportDetails,
    };
    Post.updateOne(
      { "comments._id": commentId },
      { $push: { "comments.$.reports": newReport } }
    )
      .then((result) => {
        if (result.nModified === 0) {
          return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Report added to comment" });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.status(500, error.message);
  }
};

module.exports = {
  addComment,
  getComment,
  deleteComment,
  addReport,
};
