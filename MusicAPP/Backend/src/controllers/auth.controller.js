const model = require("../models/auth.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function register(req, res) {
    try {
        const {username,email,password,role = "user"} = req.body;

        const userAlreadyExist = await model.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (userAlreadyExist) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await model.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({
                ID: user._id,
                role: user.role
            },process.env.JWT_SECREAT, {expiresIn: "7d"}
        );

        res.cookie("Token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
}


async function login(req, res) {
    try {

        const {email,password} = req.body;

        const user = await model.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect =await bcrypt.compare(password,user.password );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
                ID: user._id,
                role: user.role
            },process.env.JWT_SECREAT,{expiresIn: "7d"});

        res.cookie("Token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
}


async function logout(req, res) {

    res.clearCookie("Token", {
        httpOnly: true,
        sameSite: "lax"
    });

    res.status(200).json({
        message: "Logout successful"
    });
}


async function getMe(req, res) {

    try {

        const user = await model
            .findById(req.user.ID)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to get user"
        });
    }
}


module.exports = {register,login,logout,getMe};