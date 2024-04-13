const express = require("express");
const router = express.Router();

const {uploadImage, updateProfileImage} = require("../controllers/upload");
const {auth, isAdmin} = require("../middlewares/auth")

router.post("/uploadImage", uploadImage);
router.post("/updateProfileImage", updateProfileImage);

module.exports = router;