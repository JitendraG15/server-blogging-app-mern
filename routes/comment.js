const express = require("express");
const router = express.Router();

const {createComment, updateComment, deleteComment}  = require("../controllers/comment");
const {auth, isUser} = require("../middlewares/auth");

router.post("/createComment",  createComment);
router.put("/updateComment", auth, isUser, updateComment);
router.delete("/deleteComment", auth, isUser, deleteComment);

module.exports = router;