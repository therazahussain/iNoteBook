const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/usersController.js')
const fetchUser = require('../middleware/authMiddleware');

// Route 1 --> To create the user if does not exist.
router.post("/signup", registerUser);
// Route 2 --> To login with the help of the user 
router.post("/login", loginUser);
// Route 3 --> to get the details of the user.
router.post("/getuser",fetchUser,getUser)



module.exports = router