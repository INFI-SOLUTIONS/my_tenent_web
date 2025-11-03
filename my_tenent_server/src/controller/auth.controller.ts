const User=require('../models/user.model')


const Register=async (req:any,res:any)=>{
    try{
    const {fullName,email,password,role}=req.body

    const user=new User({
        fullName,
        email,
        password,
        role
    })

    await user.save();
    res.status(200).json(user)
}catch(error){
    res.status(500).json({message:error})
}
}

module.exports = {
    Register
}

