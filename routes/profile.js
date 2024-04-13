const express = require("express");
const router = express.Router();
const {fetchMyPosts, fetchUserProfile} = require("../controllers/profile");
const {auth, isUser, isAdmin} = require("../middlewares/auth");

router.get("/fetchMyPosts",auth,isUser,  fetchMyPosts);
router.get("/fetchUserProfile", auth, isUser,  fetchUserProfile);

module.exports = router;