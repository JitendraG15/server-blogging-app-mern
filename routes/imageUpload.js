const express = require("express");
const router = express.Router();

const {uploadImage, updateProfileImage} = require("../controllers/upload");
const {auth, isAdmin} = require("../middlewares/auth")

router.post("/uploadImage",auth, uploadImage);
router.post("/updateProfileImage",auth, updateProfileImage);

module.exports = router;