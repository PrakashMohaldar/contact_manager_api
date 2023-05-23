const express = require('express');
const {registerUser, loginUser, currentUser} = require('../controller/userController.js')
const validateToken = require('../middleware/validateTokenHandler.js');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser)

router.post("/current",validateToken,currentUser)

module.exports = router;