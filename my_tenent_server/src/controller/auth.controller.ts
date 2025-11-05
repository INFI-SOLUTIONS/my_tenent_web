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
      role
    })

    await user.save();
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({ 
      message: "Registration failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}



const Login = async (req: any, res: any) => {
  try {
    // Validate request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res.status(500).json({ 
        message: "Server configuration error. Please contact administrator." 
      });
    }

    // Find user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found. Please register first." });
    }

    // Check if user has a password (in case of data inconsistency)
    if (!existingUser.password) {
      console.error("User found but password field is missing");
      return res.status(500).json({ 
        message: "Account error. Please contact support." 
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.fullName,
        role: existingUser.role
      },
      token,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Provide more specific error messages
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        error: error.message 
      });
    }
    
    if (error.name === 'MongoError' || error.name === 'MongooseError') {
      return res.status(500).json({ 
        message: "Database error. Please try again later.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    res.status(500).json({ 
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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

    const baseUrl = process.env.BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5000');
    const resetLink = `${baseUrl}/auth/reset-password/${token}`;

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



module.exports = {
  Register,
  Login,
  ForgotPassword,
  ResetPassword
}

