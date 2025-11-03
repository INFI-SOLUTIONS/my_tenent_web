const express=require('express')

const mongoose=require('mongoose')

const userModel=mongoose.Schema({
     fullName: {
    type: String,
    required: [true, "Full name is required"],  
    minlength: [3, "Full name must be at least 3 characters"], 
    maxlength: [50, "Full name cannot exceed 50 characters"],  
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],  
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"], 
    minlength: [6, "Password must be at least 6 characters long"], 
  },
  role:{
    type:String,
    required:true
  }
})

module.exports=mongoose.model('user.model',userModel)