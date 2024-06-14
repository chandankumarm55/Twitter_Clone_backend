// ./routes/userRoute.js

import express from "express";
import { Register, Login, Logout, bookMark, getMyProfile, getOtherUser, follow, unfollow } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.route("/bookmarks/:id").put(bookMark)
router.route("/profile/:id").get(getMyProfile)
router.route("/otherusers/:id").get(getOtherUser)
router.route("/follow/:id").post(follow)
router.route("/unfollow/:id").post(unfollow)



export default router;