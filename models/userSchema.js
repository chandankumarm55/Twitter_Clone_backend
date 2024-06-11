import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    username: {
        type: String,
        requires: true,
        unique: true
    },
    email: {
        type: String,
        requires: true,
        unique: true
    },
    password: {
        type: String,
        requires: true
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    bookmarks: {
        type: Array,
        default: []
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);