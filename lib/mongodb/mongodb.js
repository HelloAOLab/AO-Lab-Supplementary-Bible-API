import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
export let db;
export const connectToMongoDB = async () => {
    console.log(MONGO_URL)
    await mongoose.connect(MONGO_URL).then(() => {
        console.log("connected to mongodb");
        db = mongoose.connection.db;
    }).catch((err) => {
        console.log(err)
    })
}