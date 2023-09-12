const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerData = require("../models/registerModel");
require("dotenv").config(); // Load environment variables from a .env file

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

async function Register(req, res) {
  const { username, email, password, first_name, second_name } = req.body;
  const photoPath = req.file ? req.file.filename : ''; 


  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await registerData.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "This email is already used" });
    } else if (password.length > 10) {
      return res
        .status(400)
        .json({ password: "Password length is must be lessthan 10" });
    }

    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await registerData.create({
      username: username,
      email: email,
      password: hashedPassword,
      first_name: first_name,
      second_name: second_name,
      image:photoPath 
    });

    if (newUser) {
      const new_user = await newUser.save()
      console.log(new_user,"new")
      res.status(200).json({ data: new_user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await registerData.findOne({ email });
    console.log(user, "user");

    if (!user) {
      return res.status(401).json({ error: "Invalidss email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, password, user.password, "pass");

    if (passwordMatch) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res
        .status(200)
        .json({
          acess: accessToken,
          refresh: refreshToken,
          username: user.username,
          email: user.email,
        });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  Register,
  login,
};
