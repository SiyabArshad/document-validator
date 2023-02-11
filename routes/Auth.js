const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Parameter=require("../models/Parameter")
const Queries=require("../models/Queries")
const router = express.Router();
// Nodemailer transporter setup
const crypto = require("crypto-js");
// Encrypt function
const encrypt = (plainText) => {
  const cipherText = crypto.AES.encrypt(plainText, process.env.JWT_SECRET).toString();
  return cipherText;
};

// Decrypt function
const decrypt = (cipherText) => {
  const bytes = crypto.AES.decrypt(cipherText, process.env.JWT_SECRET);
  const plainText = bytes.toString(crypto.enc.Utf8);
  return plainText;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, dateOfBirth, password } = req.body;
    const check=await User.findOne({email})
    if(check)
    {
        return res.status(300).json({message:"user exist"})
    }
    // Hash password
    const hashedPassword = encrypt(password)
    // Create user
    const user = new User({
      name,
      email,
      dateOfBirth,
      password: hashedPassword
    });
    
    // Send verification email
    // const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const verificationLink = `http://localhost:3000/client/signin.html`;
    await transporter.sendMail({
      from: process.env.GMAIL,
      to: email,
      subject: 'Verify your email',
      html: `Please click this link to verify your email: <a href="${verificationLink}">Verify</a>`
    });
    const user1=await user.save();
    const parameter = new Parameter({  user: user1._id.toHexString() });
    await parameter.save();
    return res.status(201).json({ message: 'User created successfully. Verify your email to log in.' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error creating user. Please try again later.' });
  }
});

//login api
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email or password is incorrect.' });
      // Check password
      const isPasswordCorrect =decrypt(user.password)
      if (isPasswordCorrect!==password) return res.status(400).json({ message: 'Email or password is incorrect.' });
  
      // Create and sign JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      const userWithoutPassword = { ...user.toObject(), password: undefined };

      return res.json({ message: 'Login successful.', user: userWithoutPassword, token });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in. Please try again later.' });
    }
  });
  
//forgot password
router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email not found.' });
  
      // Create reset password token
      const resetPasswordToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Send reset password email
      const resetPasswordLink = `http://localhost:3000/client/Newpassword.html?token=${resetPasswordToken}`;
      const emailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Reset Password',
        html: `<p>Please follow this link to reset your password: <a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`,
      };
      await transporter.sendMail(emailOptions);
  
      return res.json({ message: 'Reset password email sent.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error sending reset password email. Please try again later.' });
    }
  });
  //NEWPASSWORD

  router.post('/new-password', async (req, res) => {
    try {
      const { password, token } = req.body;
      // Verify reset password token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) return res.status(400).json({ message: 'Invalid token.' });
  
      // Find user by reset password token
      const user = await User.findOne({
        _id: decoded.userId,
       });
      if (!user) return res.status(400).json({ message: 'Token expired or invalid.' });
      // Hash new password
      const hashedPassword = encrypt(password)
  
      // Update user password and reset password token
      user.password = hashedPassword;
      await user.save();

      return res.json({ message: 'Password updated.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating password. Please try again later.' });
    }
  });
  
//contact us

router.post("/contact-us", async (req, res) => {
  try {
    const query = new Queries({
      email: req.body.email,
      description: req.body.description
    });

    await query.save();
    res.send({ message: "Query submitted successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
