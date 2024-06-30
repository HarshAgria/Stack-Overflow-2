import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

import users from "../models/auth.js"

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const existinguser = await users.findOne({ email });
        if(existinguser){
            return res.status(404).json({message: "User already Exist."})
        }

        const hashedPassword = await bcrypt.hash(password, 12)


        // Get client's IP address
        const ipAddress = req.ip;

        // Get client's browser, OS, and device type
        const userAgent = req.useragent;
        const browser = userAgent.browser;
        const os = userAgent.os;
        const device = userAgent.isMobile ? 'Mobile' : 'Desktop';

        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
            loginHistory: {
                ip: ipAddress,
                browser,
                os,
                device
            }
        });
        



        // const newUser = await users.create({name, email, password: hashedPassword, });
        const token = jwt.sign({email: newUser.email, id: newUser._id},process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ result: newUser, token});

    } catch(err){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({email});
        if(!existinguser){
            return res.status(404).json({message: "User don't Exist."})
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        // Get client's IP address
        const ipAddress = req.ip;

        // Get client's browser, OS, and device type
        const userAgent = req.useragent;
        const browser = userAgent.browser;
        const os = userAgent.os;
        const device = userAgent.isMobile ? 'Mobile' : 'Desktop';

        // Update login history with new login details
        existinguser.loginHistory.push({
            ip: ipAddress,
            browser,
            os,
            device
        });

        await existinguser.save();


        const token = jwt.sign({email: existinguser.email, id: existinguser._id},process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ result: existinguser, token})
    } catch (error) {
        res.status(500).json("Something went wrong...")
    }
};



export const googleSignIn = async (req, res) => {
    console.log("reached");
    try {
        const { tokenId } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID, 
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            const newUser = await users.create({ name, email, picture });
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ result: newUser, token });
        } 
            
        else {

        const ipAddress = req.ip;
        // console.log(ipAddress);

        const userAgent = req.useragent;
        const browser = userAgent.browser;
        const os = userAgent.os;
        const device = userAgent.isMobile ? 'Mobile' : 'Desktop';

        existingUser.loginHistory.push({
            ip: ipAddress,
            browser,
            os,
            device
        });

        await existingUser.save();
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        console.error('Google Sign-In failed:', error);
        res.status(500).json({ message: 'Google Sign-In failed' }); // Send failure response
    }
    
    
};



// export const googleSignUp = async (req, res) => {
//     // Handle Google Sign-Up logic here
// };




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
  });
  
  export const resetPasswordRequest = async (req, res) => {
      const { email } = req.body;
      try {
          const user = await users.findOne({email});
          if (!user) {
              return res.status(404).json({ message: "User not found." });
            }
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();
        
        // console.log("hhhhhhh");

        const mailOptions = {
            // to: users.email,
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            html: `
                <b>You requested a password reset</b>
                <p>You are receiving this because you (or someone else) has requested the reset of the password for your account.</p>
                <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
                <a href="http://localhost:3000/reset-password/${token}">Click this link to reset your password</a>
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `
        };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            // console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent' });
        }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}
  };
  
  export const resetPassword = async (req, res) => {
    const { token, } = req.params; 
    const {newPassword } = req.body;
    console.log('Received reset password request with token:', token, 'and new password:', newPassword);
    try {
        const user = await users.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        console.log('Found user:', user);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        user.password = await bcrypt.hash(newPassword, 12);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong..." });
    }
  };
  