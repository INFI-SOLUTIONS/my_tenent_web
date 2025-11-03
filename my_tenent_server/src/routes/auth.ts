import express from 'express';
const AuthController=require('../controller/auth.controller')

const router=express.Router()

router.post('/signup',AuthController.Register)

module.exports = router