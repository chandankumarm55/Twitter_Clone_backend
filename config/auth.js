import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        console.error(`Error during authentication: ${error.message}`, error);
        return res.status(401).json({
            message: "Token invalid",
            success: false
        });
    }
};

export default isAuthenticated;
