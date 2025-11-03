const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
  } catch (error) {
    res.status(500).json({ message: error })
  }
}



const Login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found. Please register first." });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET as string,
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports = {
  Register,
  Login
}

