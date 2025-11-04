import express from 'express';
const AuthController=require('../controller/auth.controller')

const router=express.Router()

router.post('/signup',AuthController.Register)

    
router.post('/signin',AuthController.Login)

router.post('/forgot-password',AuthController.ForgotPassword)
router.post('/reset-password/:token',AuthController.ResetPassword)


module.exports = router