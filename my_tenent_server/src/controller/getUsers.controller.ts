const User=require('../models/user.model')

const getUsers=async (req:any,res:any)=>{
  try{
    const users=await User.find()

    if(!users){
      res.status(404).json({message:"Unable to find Users"})
    }

    res.status(200).json({users,message:"Users Fteced Successfully!"})

  }catch(error){
    res.status(500).json({message:"Server Error"})
  }

}

module.exports={
    getUsers
}