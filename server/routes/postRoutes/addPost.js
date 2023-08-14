///////////////dashbord
const express = require("express");
const router = express.Router();
const handleImage = require("../../middleware/handleImage");
const blog = require("../../controllers/postController/blog");

router.post("/addPost", handleImage.single('image'),blog.addPost);

///get post
router.get("/api/getPost", blog.getPost);


////delete
router.put("/deletePost/:id", blog.deletePost);
///approve
router.put("/approvePost/:id", blog.approvePost);

///get comment
router.get("/allComments", blog.getAllComments);
///delete comment
router.put("/deletecomment/:id/:postId", blog.deleteComment);
module.exports = router;
