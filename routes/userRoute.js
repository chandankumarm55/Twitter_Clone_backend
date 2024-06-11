// ./routes/userRoute.js

import express from "express";
import { Register, Login, Logout, bookMark, getMyProfile, getOtherUser, follow, unfollow } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.route("/bookmarks/:id").put(isAuthenticated, bookMark)
router.route("/profile/:id").get(isAuthenticated, getMyProfile)
router.route("/otherusers/:id").get(isAuthenticated, getOtherUser)
router.route("/follow/:id").post(isAuthenticated, follow)
router.route("/unfollow/:id").post(isAuthenticated, unfollow)



export default router;