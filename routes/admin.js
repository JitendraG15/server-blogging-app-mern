const express = require("express");
const router = express.Router();
const { changeUserRole } = require("../controllers/admin");
const { auth, isAdmin } = require("../middlewares/auth");

router.put("/changeRole", auth, isAdmin, changeUserRole);

module.exports = router;
