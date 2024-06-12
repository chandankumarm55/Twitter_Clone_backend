// ./controllers/userController.js

import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const Register = async(req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: 'User Already exists',
                success: false
            });
        }
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(401).json({
                message: 'User Name Already exists',
                success: false
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 12);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'Account created Successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'No user found',
                success: false
            });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Incorrect Password',
                success: false
            });
        }

        // Create JWT token
        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Set cookie options
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000, 
        };

        // Send response with cookie
        res.status(201).cookie("token", token, cookieOptions).json({
            message: "Login successfully",
            user,
            success: true
        });

        console.log(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const Logout = (req, res) => {
    return res.cookie("token", " ", { expiresIn: new Date(Date.now()) }).json({
        message: "Logout succesflly",
        success: true
    })
}

export const bookMark = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if (user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Removed from bookmark"
            })

        } else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } })
            return res.status(200).json({
                message: "Bookmark is added"
            })
        }

    } catch (error) {
        console.log(error)
    }
}


export const getMyProfile = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })


    } catch (error) {
        console.log(error)
    }
}


export const getOtherUser = async(req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers) {
            return res.status(400).json({
                message: "No other users"
            })
        }
        return res.status(200).json({
            otherUsers,
        })

    } catch (error) {
        console.log(error)
    }
}


export const follow = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;


        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);


        if (!user.followers.includes(loggedInUserId)) {

            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });

            return res.status(200).json({
                message: `You just followed ${user.name}`,
                success: true
            });
        } else {
            return res.status(400).json({
                message: "User already being followed"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    }
};


export const unfollow = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $pull: { following: userId } })
        } else {
            return res.status(400).json({
                message: "you are not follwing"
            })
        };
        return res.status(200).json({
            message: `You unfollowed  ${user.name}`,
            success: true
        })


    } catch (error) {
        console.log(error)
    }
}
