// ./routes/userRoute.js

import express, { Router } from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";

const router = express.Router();

router.route("/create").post(createTweet)
router.route("/delete/:id").delete(deleteTweet)
router.route("/like/:id").put(likeOrDislike)
router.route("/alltweets/:id").get(getAllTweets)
router.route("/followingtweets/:id").get(getFollowingTweets)

export default router;