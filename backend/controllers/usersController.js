require("dotenv").config();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const saltRounds = 12;


// ROUTE 1
const registerUser = ([body("name", "Enter a valid Name").isLength({ min: 3 }),
body("email", "Enter a valid Email address").isEmail(),
body("password").isLength({ min: 6 })],
    async (req, res) => {
        let success = false;
        try {

            // If there are any validation errors find them and return them.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({success, errors: errors.array() });
            }
            // Check weather the email exists already or not. 
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry a user with this id exist already" })
            }
            // If there are no errors then the values you entered then the user will be added in the database

            // METHOD USING WHICH YOU CAN CONVERT PASSWORD INTO HASH
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            const data = await { user: { id: user.id } }
            const authToken = jwt.sign(data, process.env.Auth_Secret)
            res.json({success: true,authToken })
        }

        catch (error) {
            res.status(500).send("Some Internal Error Occured")
            console.error(error);
        }

    }
)

// ROUTE 2
const loginUser = ([
    body("email", "Enter a valid Email address").isEmail(),
    body("password", "Password cannot be blank").exists()],
    async (req, res) => {
        let success = false;
        // If there are any validation errors find them and return them.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        // Getting the values of email and password 
        const { email, password } = req.body;
        try {
            // Check if the user with theses email is already in database or not 
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, error: "Please try to login with correct Credentials" })
            }
            // Compare the user entered credentials with the one's stored in database 
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    // provide a jwt auth tokento user entered
                    const data = { user: { id: user.id } }
                    const authToken = jwt.sign(data, process.env.Auth_Secret)
                    res.json({success:true, authToken })
                } else {
                    return res.status(400).json({success, error: "Please try to login with correct Credentials" })
                }
            });

        } catch (error) {
            res.status(500).send("Some Internal Error Occured")
            console.error(error);
        }
    }
)

// Route 3 to get the info of the logged user.
const getUser = async(req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some Internal Error Occured")
    }
}
module.exports = { registerUser, loginUser, getUser }