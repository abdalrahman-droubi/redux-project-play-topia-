const express = require("express");
const router = express.Router();
const PostController = require('../../controllers/postController/PostController')

router.get("/getPost",PostController.getPost)
router.get("/getOnePost/:id",PostController.getOnePost)
router.get("/getMostCommentPost",PostController.getMostCommentPost)
router.put('/deletePost/:id',PostController.deleteOnePost)

module.exports = router;
