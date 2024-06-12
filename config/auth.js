import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false
            });
        }
          console.log('token in auth js',token)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.userId;
        console.log('req user',req.user)
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "User not authenticated.",
            success: false
        });
    }
}

export default isAuthenticated;
