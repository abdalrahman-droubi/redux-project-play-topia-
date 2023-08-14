const express = require("express");
const router = express.Router();
const CommentController = require('../../controllers/postController/CommentController')


router.put("/addComment/:id/:userId",CommentController.addComment)
router.get("/getComment/:id",CommentController.getComment)
router.put("/deleteComment/:postid/:commentid",CommentController.deleteComment)
router.put("/addReport/:commentId",CommentController.addReport)

module.exports = router;
