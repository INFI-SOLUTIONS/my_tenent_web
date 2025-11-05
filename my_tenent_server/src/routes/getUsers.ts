import express from 'express';
const getUsersController=require('../controller/getUsers.controller')

const router=express.Router()

router.get('/getAllUsers',getUsersController.getUsers)

module.exports=router