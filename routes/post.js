const express = require("express");
const router = express.Router();

const {
  createPost,
  fetchPost,
  updatePost,
  deletePost,
  fetchPosts,
  fetchCategoryPosts
} = require("../controllers/post");
const { auth, isUser, isAdmin } = require("../middlewares/auth");

router.post("/createPost", auth, isUser, createPost);
router.get("/fetchPost", fetchPost);
router.get("/fetchPosts", fetchPosts);
router.get("/fetchCategoryPosts", fetchCategoryPosts);
router.put("/updatePost", auth, isUser, updatePost);
router.delete("/deletePost", auth, isUser, deletePost);

module.exports = router;
