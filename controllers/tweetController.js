import { Tweet } from "../models/tweetsSchema.js";
import { User } from "../models/userSchema.js"
export const createTweet = async(req, res) => {
    try {
        const { description } = req.body;
        const userId = req.body.id;
        if (!description) {
            return res.status(400).json({
                message: "Description is required",
                success: false
            });
        }
        const user = await User.findById(userId).select('-password')
        await Tweet.create({
            description,
            userId,
            userDetails: user
        });

        return res.status(201).json({
            message: "Tweet created",
            success: true,

        });
    } catch (error) {
        console.error(error.message);

    }
};


export const deleteTweet = async(req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const likeOrDislike = async(req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);

        if (tweet.like.includes(loggedInUserId)) {
            // If the user has already liked the tweet, dislike it
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
            return res.status(200).json({
                message: "Disliked a tweet"
            });
        } else {

            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
            return res.status(200).json({
                message: "Liked a tweet"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const getAllTweets = async(req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({ userId: id });
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId })
        }));
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error)
    }
}

export const getFollowingTweets = async(req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId })
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweet)
        })
    } catch (error) {
        console.log(error)
    }
}