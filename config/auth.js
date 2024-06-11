import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        const decoded = jwt.verify(token, " TRFGVBHNJKLDSHJBDSCKJ");
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            message: "Token invalid",
            success: false
        });
    }
}

export default isAuthenticated;