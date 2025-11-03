const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

const Mongo_URI=process.env.MONGO_URI

export const ConnectDB = async ()=>{
    try{
        await mongoose.connect(Mongo_URI)
        console.log("MongDB Connected Successfully")
    }
    catch{
        console.log("Failed to connect DB")
    }
}