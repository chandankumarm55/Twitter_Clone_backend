import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import useRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
databaseConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
<<<<<<< HEAD
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))
=======
    origin: "https://twitter-clonefrontend.netlify.app", // Ensure this matches your frontend URL
    credentials: true // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
>>>>>>> ae159eaad1b6847ab8de2f2aa811af067823e9de

app.use("/api/user", useRoute);
app.use("/api/tweet", tweetRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});
