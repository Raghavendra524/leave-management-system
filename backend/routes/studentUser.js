const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controller/StudentUserController");
// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
