import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.Mongo_URI)
        console.log("connected with mongodb")
    }catch(error){
        console.error("Error connected in Mongo DB: ", error)
        process.exit(1)
    }
} 