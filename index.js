import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import useRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors"

dotenv.config();
const app = express();

databaseConnection();

app.use(express.urlencoded({
    extended: true
}));


app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions))

app.use("/api/user", useRoute);
app.use("/api/tweet", tweetRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});