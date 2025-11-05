const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const Mongo_URI=process.env.MONGO_URI

export const ConnectDB = async ()=>{
    try{
        if (!Mongo_URI) {
            throw new Error('MONGO_URI environment variable is not set')
        }
        await mongoose.connect(Mongo_URI)
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.error("Failed to connect DB:", error)
        throw error
    }
}