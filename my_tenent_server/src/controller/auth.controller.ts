const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { sendEmail } from "../utils/sendEmail";


const Register = async (req: any, res: any) => {
  try {
    const { fullName, email, password, role } = req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
       isVerified: false,
    })

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
    );

    const link = `http://localhost:5000/auth/verify/${token}`

    const message = `
Registratiin Verification Link:

${link}

`
    await sendEmail(user.email, "Verification Link", message)

    await user.save();
    res.status(201).json({
      message: "Registration successfull and Verification Link Sent to your mail please verify!",
      user: {
        // id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const Login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    
    if(!existingUser.isVerified){
       res.status(400).json({message:"Link Sent your mail is not Verified!"})

    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );


      res.status(200).json({
      message: "Login successful!",
      user: {
        // id: existingUser._id,
        email: existingUser.email,
        name: existingUser.fullName,
        role: existingUser.role,
        verified:existingUser.isVerified
      },
      token,
    });

 
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const ForgotPassword = async (req: any, res: any) => {
  try {
    const { email } = req.body
    const existinguser = await User.findOne({ email })

    if (!existinguser) {
      return res.status(404).json({ message: "Email is not yet Registered!" })
    }

    const token = jwt.sign(
      { id: existinguser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    )

    const resetLink = `http://localhost:5000/auth/reset-password/${token}`;

    const message = `
      You requested a password reset.
      Please click the link below to reset your password:

      ${resetLink}

      This link will expire in 15 minutes.
    `;

    await sendEmail(existinguser.email, "Password Reset Request", message);

    res.status(200).json({ message: "Reset Link sent your email please verify!" })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" })
  }
}


const ResetPassword = async (req: any, res: any) => {
  try {
    const token = req.params.token || req.query.token;
    const { newPassword } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error: any) {
    console.error("ResetPassword error:", error.message);
    res.status(400).json({ message: "Invalid or expired token", error: error.message });
  }
};

const verifyToken=async (req:any,res:any)=>{
  try {
    const token = req.params.token; 
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(200).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Account verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error or invalid/expired token" });
  }
};






module.exports = {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  verifyToken
}

