const express = require("express");
const router = express.Router();
const {fetchMyPosts, fetchUserProfile} = require("../controllers/profile");
const {auth, isUser, isAdmin} = require("../middlewares/auth");

router.get("/fetchMyPosts",  fetchMyPosts);
router.get("/fetchUserProfile",  fetchUserProfile);

module.exports = router;