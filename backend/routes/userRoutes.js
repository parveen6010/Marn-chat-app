const express = require('express');
const { registerUser, authUser, allUsers } = require("../userControllers/userControllers");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
module.exports = router;
