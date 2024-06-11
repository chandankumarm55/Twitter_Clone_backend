import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`DB connected succsfully`)
    }).catch((error) => {
        console.log(error)
    })
}
export default databaseConnection;