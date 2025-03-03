const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const {username, password, email, role} = req.body;
        const checkUser = await User.findOne({$or : [{username}, {password}]});
        if (checkUser) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "This username or email is exist. Please try again."
            })
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hashedPassword,
            email,
            role
        })

        await user.save();

        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                username: username,
                email: email,
            } 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server is error: Register route." });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkUser = await User.findOne({username});
        if (!checkUser) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "This username or email is no longer exist. Please try again."
            })
        };

        const checkPass = await bcrypt.compare(password, checkUser.password);
        if (!checkPass) {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Password is wrong. Please try another password."
            })
        }

        const accessToken = jwt.sign({
            userId: checkUser._id,
            username: checkUser.username,
            role: checkUser.role
        }, process.env.JWT_KEY, {
            expiresIn: '30m'
        })

        res.status(200).json({
            status: "success",
            code: 200,
            accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server is error: Login route" });
    }
}

module.exports = { registerUser, loginUser };

