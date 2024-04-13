const express = require("express");
const router = express.Router();

const {createCategory, fetchCategory} = require("../controllers/Category");
const {auth, isAdmin} = require("../middlewares/auth")

router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/fetchCategory", fetchCategory);

module.exports = router;